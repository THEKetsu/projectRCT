import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAc8UgoHigGat2zCsY8-CmwyJ6el_ZlZ8E",
  authDomain: "projectrct-bbf39.firebaseapp.com",
  projectId: "projectrct-bbf39",
  storageBucket: "projectrct-bbf39.appspot.com",
  messagingSenderId: "458150639217",
  appId: "1:458150639217:web:0e5d63d50b4411f2fa0dd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth }