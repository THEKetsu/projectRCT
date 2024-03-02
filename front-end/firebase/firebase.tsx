import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection, deleteDoc, doc, getDocs, DocumentData, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore";
import field from '../assets/rct_field.png';
import { onSnapshot} from 'firebase/firestore';

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

export const auth: Auth = getAuth(app);
export const db = getFirestore(app);


// Fonction pour ajouter une stratégie avec des scénarios
const addStrategyToDB = async (name: string, scenarios: any[]) => {
  try {
    const nextId = await getNextId();
    if (nextId !== null) {
      const newItem = {
        id: nextId,
        name: name,
        image: field,
        timestamp: Date.now(),
        scenarios: scenarios // Ajouter les scénarios à la stratégie
      };
      const docRef = await addDoc(collection(db, 'Strategy'), newItem);
      //console.log('Document written with ID: ', docRef.id);
    } else {
      console.error('Failed to get next ID');
    }
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

// Fonction pour récupérer les stratégies avec leurs scénarios
const retrieveStrategies = async () => {
  try {
    const strategies: DocumentData[] = [];
    const querySnapshot = await getDocs(collection(db, 'Strategy'));
    querySnapshot.forEach(doc => {
      strategies.push(doc.data());
    });

    //console.log('Retrieved strategies: ', strategies);
    return strategies;
  } catch (error) {
    console.error('Error retrieving strategies: ', error);
    return [];
  }
};

// Fonction pour supprimer une stratégie et ses scénarios
const deleteStrategy = async (id: any) => {
  try {
    if (id !== null) {
      const querySnapshot = await getDocs(collection(db, 'Strategy'));

      let firestoreId: string | null = null;
      querySnapshot.forEach(doc => {
          if (doc.data().id === id) {
              firestoreId = doc.id;
          }
      });

      // Vérifier si l'ID Firestore a été trouvé
      if (!firestoreId) {
          console.error('Firestore ID not found for selected item');
          return;
      }

      // Supprimer la stratégie
      await deleteDoc(doc(db, 'Strategy', firestoreId));
      
      //console.log('Strategy deleted successfully');
    } else {
      console.error('Strategy with ID ', id, ' not found');
    }
  } catch (error) {
    console.error('Error deleting strategy: ', error);
  }
}

const getNextId = async () => {
  try {
    const strategies = await retrieveStrategies();
    let maxId = 0;
    strategies.forEach((strategy: any) => {
      if (strategy.id > maxId) {
        maxId = strategy.id;
      }
    });
    return maxId + 1;
  } catch (error) {
    console.error('Error getting next ID: ', error);
    return null;
  }
};




// Abonnement aux modifications de la collection "Strategies"
const subscribeToStrategies = (callback: (strategies: any[]) => void) => {
  return onSnapshot(collection(db, 'Strategies'), (snapshot) => {
    const strategies: any[] = [];
    snapshot.forEach(doc => {
      strategies.push({ id: doc.id, ...doc.data() });
    });
    callback(strategies);
  });
};

const loadStrategyFromDB = async (id: any) => {
  try {
    if (id !== null) {
      const querySnapshot = await getDocs(collection(db, 'Strategy'));
      let firestoreId: string | null = null;
      querySnapshot.forEach(doc => {
          if (doc.data().id === id) {
              firestoreId = doc.id;
          }
      });

      // Vérifier si l'ID Firestore a été trouvé
      if (!firestoreId) {
          console.error('Firestore ID not found for selected item');
          return;
      }
      
      const docRef = doc(db, 'Strategy', firestoreId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        //console.log('Document data:', docSnap.data());
        return docSnap.data();
      } else {
        console.error('No such document!');
        return null;
      }
    } else {
      console.error('Strategy with ID ', id, ' not found');
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
}
export { subscribeToStrategies };
export { getNextId, addStrategyToDB, retrieveStrategies, deleteStrategy, loadStrategyFromDB };
