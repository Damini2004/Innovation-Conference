// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIR2DnldfINHfNfayPLAFAcpYA76oypsk",
  authDomain: "innovation-conference.firebaseapp.com",
  projectId: "innovation-conference",
  storageBucket: "innovation-conference.firebasestorage.app",
  messagingSenderId: "138936852972",
  appId: "1:138936852972:web:efe695e3562443062fe0c9",
  measurementId: "G-72LM52DNE4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
