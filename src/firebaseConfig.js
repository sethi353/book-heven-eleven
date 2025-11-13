// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA7LQFo72ZNjMCIHFlYg4W6w2cY29CZUbA",
  authDomain: "dragon-news-with-router-7ec8e.firebaseapp.com",
  projectId: "dragon-news-with-router-7ec8e",
  storageBucket: "dragon-news-with-router-7ec8e.firebasestorage.app",
  messagingSenderId: "1071442782901",
  appId: "1:1071442782901:web:874537c2d1e38c7fe3acfc"
};
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();
