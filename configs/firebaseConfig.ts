import { FirebaseApp, initializeApp, getApps } from "firebase/app";
import { Auth, initializeAuth, getAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FIRABASE_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_FIRABASE_APPID,
  measurementId: process.env.EXPO_PUBLIC_FIRABASE_MEASUREMENTID,
};

// Explicitly type app and auth
let app: FirebaseApp;
let auth: Auth;
let database: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  database = getFirestore(app);
} else {
  app = getApps()[0];
  auth = getAuth(app);
  database = getFirestore(app);
}

export { app, auth, database };
