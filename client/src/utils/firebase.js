
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,  //here we imported api key from env file
  authDomain: "interviewiq-b6050.firebaseapp.com",
  projectId: "interviewiq-b6050",
  storageBucket: "interviewiq-b6050.firebasestorage.app",
  messagingSenderId: "114564672102",
  appId: "1:114564672102:web:fa3231b28797dc8a4a5ba7"
};


const app = initializeApp(firebaseConfig);

const auth =getAuth(app);
const provider = new GoogleAuthProvider()

export{auth,provider}