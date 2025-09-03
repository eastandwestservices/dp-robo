// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARdaQzMI3H2LeXnQwMbbOiGjTpmBdl2T4",
  authDomain: "robo-39c20.firebaseapp.com",
  projectId: "robo-39c20",
  storageBucket: "robo-39c20.firebasestorage.app",
  messagingSenderId: "1072887376081",
  appId: "1:1072887376081:web:f5d1cb6908dd70be49fdf0",
  measurementId: "G-LR59CLPYY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore to use in your project
export const auth = getAuth(app);
export const db = getFirestore(app);
