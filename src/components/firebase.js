import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfwYart0xpjaRciSN-HHJQ5J8Rf9FyfoE",
  authDomain: "keywordmagic-e6c90.firebaseapp.com",
  projectId: "keywordmagic-e6c90",
  storageBucket: "keywordmagic-e6c90.appspot.com",
  messagingSenderId: "514291725558",
  appId: "1:514291725558:web:6cd9ee47086cc9e895a8d7",
  measurementId: "G-JBB0C5R36H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore(app);
export {db};
