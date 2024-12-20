import { FirebaseApp, initializeApp, getApps, getApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Auth, getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENTID,
};

let app: FirebaseApp;
let auth: Auth;
let database: Firestore;

try {
  // Check if Firebase app is already initialized
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    database = getFirestore(app);  // Ensure that Firestore is initialized here
    console.log("Firebase initialized successfully.");
  } else {
    // If already initialized, retrieve the existing app
    app = getApp();
    auth = getAuth(app);
    database = getFirestore(app);  // Make sure we retrieve Firestore properly
    console.log("Firebase already initialized, using existing app.");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Export the initialized Firebase instances
export { app, auth, database };
