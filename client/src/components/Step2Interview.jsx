import React, { useState, useRef, useEffect } from 'react'
import maleVideo from "../assets/Videos/male-ai.mp4"
import femaleVideo from "../assets/Videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData
  const [isIntroPhase, setIsIntroPhase] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isAIPlaying, setIsAIPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [interimText, setInterimText] = useState("")
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60)
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [voiceGender, setVoiceGender] = useState("female")
  const [subtitle, setSubtitle] = useState("")
  const [micSupported, setMicSupported] = useState(true)

  const recognitionRef = useRef(null)
  const videoRef = useRef(null)
  const isMicOnRef = useRef(isMicOn)
  const isAIPlayingRef = useRef(isAIPlaying)
  const currentQuestion = questions[currentIndex]

  useEffect(() => { isMicOnRef.current = isMicOn }, [isMicOn])
  useEffect(() => { isAIPlayingRef.current = isAIPlaying }, [isAIPlaying])

  // ---------- LOAD AI VOICES ----------
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (!voices.length) return
      const female = voices.find(v => /zira|samantha|female/i.test(v.name))
      if (female) return setSelectedVoice(female), setVoiceGender("female")
      const male = voices.find(v => /david|mark|male/i.test(v.name))
      if (male) return setSelectedVoice(male), setVoiceGender("male")
      setSelectedVoice(voices[0])
      setVoiceGender("female")
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo

  // ---------- SPEECH TO TEXT ----------
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.")
      setMicSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => {
      console.log("MICROPHONE STARTED")
    }

    // Only commit FINAL results to the answer. Interim (in-progress) results
    // are shown as a live preview only — this is what was causing the
    // repeated/cascading text bug, since interim results fire many times
    // per phrase and were previously all being appended to `answer`.
    recognition.onresult = (event) => {
      let finalTranscript = ""
      let interim = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interim += result[0].transcript
        }
      }

      if (finalTranscript.trim()) {
        const text = finalTranscript.trim()
        setAnswer(prev => (prev ? `${prev} ${text}` : text))
      }

      setInterimText(interim)
    }

    recognition.onerror = (event) => {
      console.error("Mic error:", event.error)
      if (event.error === "not-allowed") {
        console.error("Microphone permission denied.")
      }
    }

    // Chrome auto-stops recognition after a period of silence even with
    // continuous=true. Restart it automatically if the mic is still
    // supposed to be on and the AI isn't currently speaking.
    recognition.onend = () => {
      console.log("MICROPHONE STOPPED")
      if (isMicOnRef.current && !isAIPlayingRef.current) {
        try {
          recognition.start()
        } catch {
          // already running — safe to ignore
        }
      }
    }

    recognitionRef.current = recognition

    return () => {
      try {
        recognition.stop()
        recognition.abort()
      } catch { }
      recognitionRef.current = null
    }
  }, [])

  const startMic = () => {
    if (!recognitionRef.current || isAIPlaying) return
    try {
      recognitionRef.current.start()
    } catch {
      // already started — safe to ignore
    }
  }

  const stopMic = () => {
    try {
      recognitionRef.current?.stop()
    } catch { }
  }

  const toggleMic = () => {
    if (isMicOn) {
      stopMic()
      setIsMicOn(false)
      setInterimText("")
    } else {
      setIsMicOn(true)
      setTimeout(startMic, 100)
    }
  }

  // ---------- AI SPEECH ----------
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) return resolve()

      window.speechSynthesis.cancel()
      const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ")
      const utterance = new SpeechSynthesisUtterance(humanText)
      utterance.voice = selectedVoice
      utterance.rate = 0.92
      utterance.pitch = 1.05
      utterance.volume = 1

      utterance.onstart = () => {
        setIsAIPlaying(true)
        stopMic()
        videoRef.current?.play()
      }

      utterance.onend = () => {
        videoRef.current?.pause()
        if (videoRef.current) videoRef.current.currentTime = 0
        setIsAIPlaying(false)
        if (isMicOnRef.current) setTimeout(startMic, 300)
        setTimeout(() => {
          setSubtitle("")
          resolve()
        }, 300)
      }

      utterance.onerror = () => {
        setIsAIPlaying(false)
        if (isMicOnRef.current) startMic()
        resolve()
      }

      setSubtitle(text)
      window.speechSynthesis.speak(utterance)
    })
  }

  // ---------- INTRO + QUESTIONS ----------
  useEffect(() => {
    if (!selectedVoice) return

    const runInterview = async () => {
      if (isIntroPhase) {
        await speakText(`Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`)
        await speakText("I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.")
        setIsIntroPhase(false)
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800))
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.")
        }
        await speakText(currentQuestion.question)
        // no manual startMic here — speakText's onend already restarts it
      }
    }
    runInterview()
  }, [selectedVoice, isIntroPhase, currentIndex])

  // ---------- TIMER ----------
  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isIntroPhase, currentIndex])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) setTimeLeft(currentQuestion.timeLimit || 60)
  }, [currentIndex])

  // Clear the live interim preview whenever the question changes
  useEffect(() => {
    setInterimText("")
  }, [currentIndex])

  // ---------- SUBMIT / NEXT / FINISH ----------
  const submitAnswer = async () => {
    if (isSubmitting) return
    stopMic()
    setInterimText("")
    setIsSubmitting(true)
    try {
      const { data } = await axios.post(
        `${ServerUrl}/api/interview/submit-answer`,
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true }
      )
      setFeedback(data.feedback)
      await speakText(data.feedback)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = async () => {
    setAnswer("")
    setFeedback("")
    setInterimText("")

    if (currentIndex + 1 >= questions.length) {
      finishInterview()
      return
    }

    await speakText("Alright, let's move to the next question.")
    setCurrentIndex(currentIndex + 1)
    // no manual startMic here — next question's speakText will restart it
  }

  const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const { data } = await axios.post(
        `${ServerUrl}/api/interview/finish`,
        { interviewId },
        { withCredentials: true }
      )
      onFinish(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!isIntroPhase && currentQuestion && timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft])

  // ---------- CLEANUP ----------
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  // ---------- UI ----------
  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>

        {/* VIDEO SECTION */}
        <div className='w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>
          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'>
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {subtitle && (
            <div className='w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm'>
              <p className='text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed'>
                {subtitle}
              </p>
            </div>
          )}

          {!micSupported && (
            <div className='w-full max-w-md bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600 text-center'>
              Voice input isn't supported in this browser. Please use Chrome or Edge, or type your answer.
            </div>
          )}

          <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-500'>Interview Status</span>
              {isAIPlaying && (
                <span className='text-sm font-semibold text-emerald-600'>AI Speaking</span>
              )}
            </div>

            <div className="h-px bg-gray-200" />

            <div className='flex justify-center'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="h-px bg-gray-200" />

            <div className='grid grid-cols-2 gap-6 text-center'>
              <div>
                <span className='text-2xl font-bold text-emerald-600 block'>{currentIndex + 1}</span>
                <span className='text-xs text-gray-400'>Current Question</span>
              </div>
              <div>
                <span className='text-2xl font-bold text-emerald-600 block'>{questions.length}</span>
                <span className='text-xs text-gray-400'>Total Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>
          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
            AI Smart Interview
          </h2>

          {!isIntroPhase && (
            <div className='relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm'>
              <p className='text-xs sm:text-sm text-gray-400 mb-2'>
                Question {currentIndex + 1} of {questions.length}
              </p>
              <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed'>
                {currentQuestion?.question}
              </div>
            </div>
          )}

          <textarea
            placeholder="Type your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800"
          />

          {/* Live interim speech preview — not yet committed to the answer */}
          {interimText && (
            <p className='text-xs sm:text-sm text-gray-400 italic mt-2'>
              {interimText}
            </p>
          )}

          {!feedback ? (
            <div className='flex items-center gap-4 mt-6'>
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white shadow-lg ${isMicOn ? "bg-black" : "bg-gray-500"
                  }`}
              >
                {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500'
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm'
            >
              <p className='text-emerald-700 font-medium mb-4'>{feedback}</p>
              <button
                onClick={handleNext}
                className='w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1'
              >
                Next Question <BsArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2Interview
