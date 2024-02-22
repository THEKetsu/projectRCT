import { $CombinedState } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import field from '../assets/rct_field.png';

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
export const db = getFirestore(app);

const retrieveStrategies = async () => {
  try {
      const strategies: any[] = [];
      const querySnapshot = await getDocs(collection(db, 'Strategy'));
      querySnapshot.forEach(doc => {
          strategies.push(doc.data());
      });

      console.log('Retrieved strategies: ', strategies);
      return strategies;
  } catch (error) {
      console.error('Error retrieving strategies: ', error);
      return [];
  }
};

const getNextId = async () => {
  try {
    const strategies = await retrieveStrategies();
    let maxId = 0;
    strategies.forEach((strategy) => {
      if (strategy.id > maxId) {
        maxId = strategy.id;
      }
    });
    return maxId + 1;
  } catch (error) {
    console.error('Error getting next ID: ', error);
    return null; // Retourner null en cas d'erreur
  }
};

const addStrategyToDB = async (name: string) => {
  try {
    const nextId = await getNextId(); // Appel asynchrone à getNextId
    if (nextId !== null) {
      const newItem = {
        id: nextId,
        name: name,
        image: field,
        timestamp: Date.now(),
        data: []
      };
      const docRef = await addDoc(collection(db, 'Strategy'), newItem);
      console.log('Document written with ID: ', docRef.id);
    } else {
      console.error('Failed to get next ID');
    }
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};


export { getNextId, addStrategyToDB, retrieveStrategies};





