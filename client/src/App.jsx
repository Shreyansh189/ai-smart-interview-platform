import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { linkWithCredential } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewReport from './pages/InterviewReport' 
import InterviewHistory from "./pages/InterviewHistory";
import Pricing from './pages/Pricing'


export const ServerUrl="https://ai-smart-interview-platform-zjwu.onrender.com"

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
const getUser=async()=>{
  try {
    const result=await axios.get(ServerUrl + "/api/user/current-user",
      {withCredentials:true})
      dispatch(setUserData(result.data))
  } catch (error) {
    console.log(error.response?.data || error.message);
    dispatch(setUserData(null));
}
}
getUser()
  },[dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage />} />
      <Route path='/history' element={<InterviewHistory/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/report/:id' element={<InterviewReport/>}/>
      

    </Routes>
  )
}

export default App
