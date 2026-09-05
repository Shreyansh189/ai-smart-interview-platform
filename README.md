# Interview.AI – AI Smart Interview Platform

An AI-powered interview preparation platform that simulates real interview experiences using AI-generated questions, voice interaction, resume analysis, performance evaluation, and interview history.

The platform allows users to upload their resume, practice AI-driven interviews, receive detailed performance feedback, and track their interview progress over time.

---

## 🚀 Features

### 🔐 Authentication
- Firebase-based user authentication
- Secure user sessions
- User profile management

### 📄 Resume Analysis
- Upload resume in PDF format
- Extract resume content automatically
- Analyze skills, projects, and experience using AI
- Generate interview questions based on the candidate's profile

### 🤖 AI-Powered Interviews
- AI-generated technical and HR interview questions
- Personalized interview based on resume and selected role
- Multiple interview questions with time limits
- AI interviewer introduction and interaction

### 🎙️ Voice Interview
- Speech-to-text for candidate responses
- AI voice interaction using browser speech synthesis
- Male and female AI interviewer options
- Microphone control during the interview

### 📊 Performance Report
- Interview performance evaluation
- Question-wise feedback
- Overall score
- Skill/performance analysis
- Detailed AI-generated feedback

### 📈 Interview History
- Store previous interview results
- View previous interview reports
- Track interview performance over time

### 💳 Credit & Payment System
- Credit-based interview system
- Multiple pricing plans
- Razorpay payment integration
- Automatic credit updates after successful payment

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Framer Motion / Motion
- React Icons
- Recharts
- React Circular Progressbar
- jsPDF

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Axios

### AI & Services

- OpenRouter API
- GPT-4o-mini
- Firebase Authentication
- Razorpay

### Deployment

- Render
- GitHub

---

## 🧠 How It Works

```text
User
 │
 ▼
Login / Signup
 │
 ▼
Upload Resume
 │
 ▼
Resume Text Extraction
 │
 ▼
AI Resume Analysis
 │
 ▼
Generate Interview Questions
 │
 ▼
AI Voice Interview
 │
 ▼
Evaluate Answers
 │
 ▼
Generate Performance Report
 │
 ▼
Save Interview History

#Folder Structure
ai-smart-interview-platform/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── public/
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md


⚙️ Installation
1. Clone the repository
git clone https://github.com/Shreyansh189/ai-smart-interview-platform.git
cd ai-smart-interview-platform
💻 Frontend Setup

Navigate to the client directory:

cd client

Install dependencies:

npm install

Create a .env file inside the client folder:

VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_TEST_KEY_ID=your_razorpay_test_key

Start the frontend:

npm run dev
🖥️ Backend Setup

Open another terminal and navigate to:

cd server

Install dependencies:

npm install

Create a .env file inside the server folder:

PORT=8000

MONGODB_URL=your_mongodb_connection_string

JWTSECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

Start the backend:

npm run dev

The backend will run on:

http://localhost:8000
🔑 Environment Variables
Client
Variable	Description
VITE_FIREBASE_APIKEY	Firebase API key
VITE_RAZORPAY_TEST_KEY_ID	Razorpay test Key ID
Server
Variable	Description
PORT	Backend server port
MONGODB_URL	MongoDB connection string
JWTSECRET	JWT authentication secret
OPENROUTER_API_KEY	OpenRouter API key
RAZORPAY_KEY_ID	Razorpay Key ID
RAZORPAY_KEY_SECRET	Razorpay secret

Never commit .env files or secret credentials to GitHub.

🔌 API Overview
User
GET /api/user/current-user

Retrieves the currently authenticated user.

Interview
POST /api/interview/resume

Uploads and analyzes a candidate resume.

Payment
POST /api/payment/order

Creates a Razorpay payment order.

POST /api/payment/verify

Verifies the payment and updates user credits.

💳 Pricing

The platform currently provides the following credit plans:

Plan	Price	Credits
Free	₹0	100
Starter Pack	₹100	150
Pro Pack	₹500	650
🌐 Deployment

The application is deployed using Render.

Frontend

The React/Vite frontend is deployed as a Render Static Site.

Backend

The Node.js/Express backend is deployed as a Render Web Service.

Database

MongoDB is used for persistent application data.

Environment variables are configured separately in the deployment platform and are not committed to the repository.

🔒 Security
Environment variables are excluded using .gitignore
API secrets are stored on the backend
Razorpay secret key is never exposed to the frontend
Authentication is handled using Firebase/JWT-based authentication
Uploaded files are excluded from Git tracking
🔮 Future Improvements
Real-time AI conversational interviews
More advanced resume parsing
Additional interview categories
Coding interview support
Improved speech recognition
Advanced performance analytics
Leaderboards and benchmarking
Interview difficulty customization
More AI interviewer personalities
👨‍💻 Author

Shreyansh Ghanekar

B.Tech Computer Science & Engineering
