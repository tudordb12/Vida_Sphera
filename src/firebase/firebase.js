// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2VUduo4w98i-iJCRU7oVrTZk2_LnL2vY",
  authDomain: "vida-sphera.firebaseapp.com",
  projectId: "vida-sphera",
  storageBucket: "vida-sphera.appspot.com",
  messagingSenderId: "736895389669",
  appId: "1:736895389669:web:8a7603b546d0bbb287290c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth};