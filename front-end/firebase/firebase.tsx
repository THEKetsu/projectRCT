import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVvf6fMTS4V32uV-h-pqWxrU20PG7Tgz0",
  authDomain: "projet-rct-45d43.firebaseapp.com",
  databaseURL: "https://projet-rct-45d43-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projet-rct-45d43",
  storageBucket: "projet-rct-45d43.appspot.com",
  messagingSenderId: "410477988070",
  appId: "1:410477988070:web:0b5fe2be2a948f10c15327",
  measurementId: "G-D1FYQHSFHK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)