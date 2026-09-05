# ai-smart-interview-platform
AI-powered interview practice platform for resume-based preparation, voice interviews, performance evaluation, and credit-based interview access.
Overview

InterviewIQ.AI is a full-stack web application designed to help candidates practice technical and job interviews in an interactive environment.

The platform combines a React frontend with an Express backend, MongoDB persistence, Firebase authentication, AI-powered interview functionality through OpenRouter, resume processing, browser speech capabilities, and Razorpay-based credit purchases.

A typical session allows a user to:

Sign in.

Upload a resume.

Have the resume analyzed to generate interview context.

Start an AI-driven interview.

Answer questions using the browser microphone.

Receive AI-generated feedback.

Complete the interview and view a performance report.

Review interview history.

Purchase additional interview credits when required.

Problem It Solves

Traditional interview preparation often relies on static question lists and does not provide an interview experience that adapts to a candidate's background.

InterviewIQ.AI addresses this by using the candidate's resume as part of the interview setup and providing an interactive interview flow with:

Resume-based preparation

AI-generated interview questions

Voice interaction through the browser

Per-question time limits

AI-generated answer feedback

Post-interview performance reporting

Interview history

Credit-based access and payments

Key Features

Authentication

Firebase-based sign-in flow.

Backend authentication state is maintained using a JWT-based mechanism.

Authenticated API requests use credentials/cookies where required.

Resume Analysis

Users can upload a PDF resume.

The backend accepts the resume through a multipart/form-data endpoint.

Resume information is processed as part of the interview-generation workflow.

AI-Powered Interviews

Interview content is generated through an OpenRouter API integration.

The backend currently uses the openai/gpt-4o-mini model through OpenRouter.

Interview questions and answer feedback are generated dynamically.

Voice Interview Experience

Uses the browser's Web Speech API where supported.

Speech recognition captures spoken answers.

Speech synthesis is used for AI/interview voice prompts and feedback.

The interview interface includes an AI interviewer video presentation.

Timed Questions

Each question has a time limit.

When the timer expires, the current answer can be submitted automatically.

Interview Reports

Completed interviews produce a performance report.

The frontend visualizes report information using charts and progress components.

Reports can be used to review interview performance.

Interview History

Previous interview results can be viewed through the interview-history interface.

Credit-Based Access

The application includes credit-based plans:

Plan

Price

Credits

Free

₹0

100

Starter Pack

₹100

150

Pro Pack

₹500

650

Payment processing is integrated with Razorpay.

Pricing values are based on the current frontend implementation and may be changed in the application.

Screenshots / Demo

No repository screenshots were available to verify as README-ready project assets.

If you want to showcase the application on GitHub, add screenshots under a directory such as:

docs/
└── screenshots/
    ├── dashboard.png
    ├── resume-analysis.png
    ├── interview.png
    ├── report.png
    └── pricing.png

Then reference them with normal relative Markdown paths, for example:

![Interview dashboard](docs/screenshots/dashboard.png)

Live Demo

Add the production frontend URL here once you want it published:

Live Demo: <YOUR_FRONTEND_DEPLOYMENT_URL>

Tech Stack

Frontend

Technology

Purpose

React

UI development

Vite

Frontend build and development tooling

React Router

Client-side routing

Tailwind CSS

Styling

Redux Toolkit

Application state management

Axios

HTTP communication with the backend

Framer Motion

UI animations

React Icons

Interface icons

Recharts

Report data visualization

React Circular Progressbar

Progress visualization

jsPDF

Client-side PDF generation

Firebase

Authentication

Backend

Technology

Purpose

Node.js

JavaScript runtime

Express.js

REST API server

Mongoose

MongoDB object modeling

MongoDB

Application database

Multer

Resume file uploads

Axios

External API communication

CORS

Cross-origin API access

JWT

Backend authentication/session mechanism

dotenv

Environment configuration

External Services

Service

Purpose

Firebase

User authentication

OpenRouter

AI model API

Razorpay

Payment/order processing

MongoDB

Persistent application data

Render

Production hosting

System Architecture

The application follows a client-server architecture in which the React frontend communicates with the Express API. The backend handles authentication-aware requests, resume processing, AI communication, interview persistence, and payment operations.

flowchart LR
    U[User] --> FE[React + Vite Frontend]

    FE --> FA[Firebase Authentication]
    FE --> API[Express REST API]

    API --> DB[(MongoDB)]
    API --> AI[OpenRouter AI API]
    API --> PAY[Razorpay]
    API --> FILE[Multer / Resume Upload]

    AI --> API
    PAY --> API
    FILE --> API

    API --> FE
    FE --> REPORT[Interview Report & History]

Project Structure

ai-smart-interview-platform/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── Videos/
│   │   ├── components/
│   │   │   ├── Step1SetUp.jsx
│   │   │   ├── Step2Interview.jsx
│   │   │   ├── Step3Report.jsx
│   │   │   └── Timer.jsx
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   ├── InterviewHistory.jsx
│   │   │   ├── InterviewPage.jsx
│   │   │   ├── InterviewReport.jsx
│   │   │   └── Pricing.jsx
│   │   └── redux/
│   │       ├── store.js
│   │       └── userSlice.js
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   │   ├── interview.controller.js
│   │   └── payment.controller.js
│   ├── middlewares/
│   │   └── isAuth.js
│   ├── models/
│   │   ├── interview.model.js
│   │   ├── payment.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── interview.route.js
│   │   ├── payment.route.js
│   │   └── user.routes.js
│   ├── services/
│   │   └── razorpay.service.js
│   ├── public/
│   │   └── .gitkeep
│   ├── package.json
│   └── index.js
│
├── .gitignore
└── README.md

The tree intentionally omits generated/dependency directories such as node_modules, build output, and Git metadata.

Getting Started

The project is organized as two independently runnable applications:

client — React/Vite frontend

server — Node.js/Express backend

Both applications need to be configured before running the complete system locally.

Prerequisites

Install the following before starting:

Node.js

npm

MongoDB database

Firebase project with authentication configured

OpenRouter API key

Razorpay account/keys if testing payments

You should also have Git installed to clone the repository.

Installation

1. Clone the Repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ai-smart-interview-platform

2. Install Frontend Dependencies

cd client
npm install

3. Install Backend Dependencies

Open another terminal or return to the project root:

cd server
npm install

4. Configure Environment Variables

Create the required environment files described in the Environment Variables section.

Do not commit .env files to Git.

Environment Variables

The repository uses separate environment configuration for the frontend and backend.

Frontend

Create:

client/.env

Add:

VITE_FIREBASE_APIKEY=
VITE_RAZORPAY_TEST_KEY_ID=

Variable

Purpose

VITE_FIREBASE_APIKEY

Firebase configuration used by the frontend authentication setup

VITE_RAZORPAY_TEST_KEY_ID

Razorpay test key ID used to initialize the checkout flow

Only public/client-safe configuration should be exposed through Vite variables. Never place a private API secret in a VITE_* variable.

Backend

Create:

server/.env

Add:

PORT=
MONGODB_URL=
JWTSECRET=
OPENROUTER_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

Variable

Purpose

PORT

Port used by the Express server

MONGODB_URL

MongoDB connection string

JWTSECRET

Secret used for JWT authentication/session handling

OPENROUTER_API_KEY

Authentication key for OpenRouter AI API requests

RAZORPAY_KEY_ID

Server-side Razorpay key ID used for payment operations

RAZORPAY_KEY_SECRET

Private Razorpay secret used for secure server-side payment operations

Never commit the values of these variables to GitHub. In particular, JWTSECRET, OPENROUTER_API_KEY, RAZORPAY_KEY_SECRET, and database credentials must remain private.

Running the Application

Start the Backend

From the server directory:

npm start

The backend is configured to use port 8000 unless overridden by the PORT environment variable.

Start the Frontend

From the client directory:

npm run dev

Vite serves the frontend development application on its normal development port.

Build the Frontend

From the client directory:

npm run build

The production frontend bundle is generated in the Vite build output directory.

Preview the Frontend Build

From the client directory:

npm run preview

API Overview

The backend exposes REST endpoints under the /api namespace.

The following endpoints are part of the current application flow.

Method

Endpoint

Description

Authentication

GET

/api/user/current-user

Retrieves the current authenticated user

Required

POST

/api/interview/resume

Uploads/processes a resume for interview preparation

Required

POST

/api/interview/submit-answer

Submits an interview answer and obtains AI feedback

Required

POST

/api/interview/finish

Finishes an interview and returns the completed result/report

Required

POST

/api/payment/order

Creates a Razorpay payment order for a selected plan

Required

POST

/api/payment/verify

Verifies a completed Razorpay payment and updates the user state

Required

Resume Upload

The resume endpoint expects a multipart upload using the field name:

resume

The frontend sends the resume to:

POST /api/interview/resume

Interview Answer Submission

The interview client submits information including:

interviewId
questionIndex
answer
timeTaken

The backend processes the answer and returns feedback generated through the AI integration.

Finish Interview

The frontend sends the current interview ID to:

POST /api/interview/finish

The returned interview result is then passed to the report interface.

Authentication Flow

The application uses Firebase on the frontend and JWT-based authentication on the backend.

The high-level flow is:

sequenceDiagram
    participant User
    participant Client
    participant Firebase
    participant Server
    participant MongoDB

    User->>Client: Sign in
    Client->>Firebase: Authenticate user
    Firebase-->>Client: Authenticated user
    Client->>Server: Authenticated API request
    Server->>Server: Validate authentication
    Server->>MongoDB: Read/update user data
    MongoDB-->>Server: User data
    Server-->>Client: API response

Protected requests are sent with credentials where required.

Interview Flow

The interview interface is implemented as a three-step flow:

flowchart LR
    A[Step 1: Interview Setup] --> B[Step 2: AI Interview]
    B --> C[Step 3: Performance Report]

Step 1 — Interview Setup

The user provides the information required to start an interview and can upload a resume.

Step 2 — Interview

The interview interface:

Displays the AI interviewer.

Presents interview questions.

Uses a timer for each question.

Supports microphone input through browser speech recognition.

Uses speech synthesis for spoken prompts/feedback.

Sends answers to the backend.

Receives AI-generated feedback.

Advances through the interview questions.

Step 3 — Report

After the interview is completed, the backend returns the interview result and the frontend displays the performance report.

Database

MongoDB is used as the application's primary database, with Mongoose providing schema modeling.

The backend contains models for the major persisted entities used by the application, including:

Users

Interviews

Payments

The user model also stores the credit balance used by the application's credit-based interview system.

AI Integration

AI functionality is implemented on the backend through OpenRouter.

The current implementation uses:

openai/gpt-4o-mini

The backend sends relevant interview/resume information to the AI service and uses the returned content as part of the interview workflow and answer-feedback process.

Keeping AI communication on the backend prevents the OpenRouter private API key from being exposed to the browser.

Payment Integration

The application integrates Razorpay for purchasing interview credits.

The flow is:

sequenceDiagram
    participant User
    participant Client
    participant Server
    participant Razorpay
    participant MongoDB

    User->>Client: Select credit plan
    Client->>Server: Create payment order
    Server->>Razorpay: Create order
    Razorpay-->>Server: Order details
    Server-->>Client: Order details
    Client->>Razorpay: Open checkout
    User->>Razorpay: Complete payment
    Razorpay-->>Client: Payment response
    Client->>Server: Verify payment
    Server->>Razorpay: Validate payment
    Server->>MongoDB: Update credits/payment record
    Server-->>Client: Updated user state

The frontend uses the Razorpay test key for the checkout integration, while the private Razorpay secret remains on the backend.

Deployment

The project is structured so that the frontend and backend can be deployed independently.

Frontend

Deploy the client directory as a static site.

Typical production configuration:

Root Directory: client
Build Command: npm run build
Publish Directory: dist

Backend

Deploy the server directory as a Node.js web service.

Typical start command:

npm start

The backend uses the PORT environment variable provided by the hosting platform.

MongoDB

The production backend requires access to a MongoDB database through:

MONGODB_URL=

Environment Configuration

Production secrets should be configured through the hosting provider's environment-variable management system rather than committed to the repository.

File Upload Consideration

Resume uploads currently use server-side filesystem storage through Multer.

For production environments, persistent external storage should be considered if uploaded resume files need to survive service restarts or redeployments.

Future Improvements

Potential improvements based on the current architecture include:

Add persistent cloud object storage for uploaded resumes.

Improve resume parsing and structured extraction.

Add stronger server-side validation for uploaded files.

Add automated API documentation such as OpenAPI/Swagger.

Add automated testing for frontend and backend flows.

Improve error handling and user-facing error states.

Add rate limiting and additional API security controls.

Optimize large frontend bundles through code splitting and lazy loading.

Add more detailed interview analytics and historical performance trends.

Add additional interview categories and difficulty levels.

Contributing

Contributions are welcome.

A typical contribution workflow is:

Fork the repository.

Create a feature branch.

git checkout -b feature/your-feature

Make your changes.

Test the application locally.

Commit your changes.

git add .
git commit -m "Add your feature"

Push the branch.

git push origin feature/your-feature

Open a pull request.

Please keep changes focused and avoid committing environment files, credentials, generated build output, or dependency directories.

License

No explicit license file was verified for the project.

If you want others to legally reuse, modify, or distribute this project, add an appropriate LICENSE file and update this section accordingly.

Author

Shreyansh Ghanekar

Live: https://interview-ai-wv9j.onrender.com

