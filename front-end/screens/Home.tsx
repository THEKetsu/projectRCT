import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../components/drawer/styles';
import TopWidget from '../components/drawer/TopWidget';
import DrawerLeft from '../components/drawer/DrawerLeft';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { query, set } from 'firebase/database';


export default function Home() {
    console.log('******************************TEST*********************************');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handlePressPlayButton = (info: any) => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Configuration Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBVvf6fMTS4V32uV-h-pqWxrU20PG7Tgz0",
    authDomain: "projet-rct-45d43.firebaseapp.com",
    databaseURL: "https://projet-rct-45d43-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projet-rct-45d43",
    storageBucket: "projet-rct-45d43.appspot.com",
    messagingSenderId: "410477988070",
    appId: "1:410477988070:web:0b5fe2be2a948f10c15327",
    measurementId: "G-D1FYQHSFHK",
  };
    // Initialisation de Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }   
    const val = firebase.firestore().collection('Stratégie');
    const info = [];
    const data = val.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const {title,picture} = doc.data();
            console.log(doc.get('picture'));
            info.push({
                id: doc.id,
                title : title, 
                picture : picture 
            }
        );
            
        });
    });
    console.log(info.picture);
  return (
    <View style={styles.container}>
      {isDrawerOpen && <DrawerLeft onClose={handleCloseDrawer} isOpen={isDrawerOpen} />}
      {!isDrawerOpen && <TopWidget onPlayButtonPress={handlePressPlayButton} />}
      <View style={styles.home}>
        <Text></Text>
      </View>
    </View>
  );
}
