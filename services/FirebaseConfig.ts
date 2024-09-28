// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FIRABASE_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_FIRABASE_APPID,
  measurementId: process.env.EXPO_PUBLIC_FIRABASE_MEASUREMENTID
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)