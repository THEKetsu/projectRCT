import firebase from 'firebase/app';
import 'firebase/database';

// Initialisez Firebase avec votre configuration
const firebaseConfig = {
    //apiKey: "VOTRE_API_KEY",
    //authDomain: "VOTRE_AUTH_DOMAIN",
    databaseURL: "https://console.firebase.google.com/u/0/project/projet-rct-45d43/firestore/data/~2FStratégie~2FhtayiuRBkOT7sICokPrx",
    projectId: "projet-rct-45d43",
    storageBucket: "gs://projet-rct-45d43.appspot.com",
  };

  firebase.initializeApp(firebaseConfig);

// Accédez à la base de données Firebase
const database = firebase.database();



// Fonction pour tester la connexion à la base de données
const testConnection = async () => {
  try {
    // Essayez de récupérer des données factices dans la base de données pour tester la connexion
    const snapshot = await firebase.database().ref('test').once('value');
    const data = snapshot.val();
    console.log('Connexion à la base de données Firebase réussie ! Données récupérées :', data);
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données Firebase :', error);
  }
};

// Appelez la fonction pour tester la connexion
testConnection();
export default database;