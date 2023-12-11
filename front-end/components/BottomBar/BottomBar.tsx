import { React, useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text, Image, Touchable } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import { styles } from './bottomBarStyle.js'
import chevronBas from '../../assets/vers-le-bas.png'
import chevronHaut from '../../assets/chevron-haut.png'
import fleche from '../../assets/fleches.png'
import gomme from '../../assets/la-gomme.png'
import crayon from '../../assets/crayon.png'
import maillot from '../../assets/maillot-de-foot.png'
import ballon from '../../assets/ballon-de-rugby.png'
const AnimatedBottomBar = () => {
  // Déclaration des états 'collapsed' et 'animation' via useState de React Hooks
  const [collapsed, setCollapsed] = useState(false); // État pour suivre l'état de la barre (repliée ou non)
  const [animation] = useState(new Animated.Value(0)); // Utilisation d'Animated pour gérer l'animation

  // Fonction pour déclencher l'animation de rétrécissement ou de déploiement de la barre
  const toggleBar = () => {
    // Détermination de la valeur cible pour l'animation en fonction de l'état actuel
    const toValue = collapsed ? 0 : 1; // 1 représente la valeur déployée (non rétrécie)
    
    // Configuration de l'animation utilisant Animated.timing
    Animated.timing(animation, {
      toValue, // La valeur cible déterminée ci-dessus
      duration: 300, // Durée de l'animation en millisecondes
      useNativeDriver: false, // Utilisation du moteur natif pour l'animation
    }).start(); // Lancement de l'animation

    // Inversion de l'état 'collapsed' pour refléter le nouvel état de la barre
    setCollapsed(!collapsed);
  };

  // Création d'une interpolation pour ajuster la hauteur de la barre
  const barHeight = animation.interpolate({
    inputRange: [0, 1], // Plage des valeurs à interpréter
    outputRange: [20, 100], // Hauteur initiale et finale de la barre
  });

  // Rendu du composant
  return (
    <View style={styles.container}>

      {/* Barre inférieure animée */}
      <Animated.View style={[styles.bar, { height: barHeight }]}>
        {/* Bouton pour déclencher l'animation */}
      
      <TouchableOpacity onPress={toggleBar} style={styles.button}>
      { collapsed && (<Image
        style={styles.displayBottomImage}
        source={chevronBas}
      /> )}
       { !collapsed && (<Image
        style={styles.displayBottomImage}
        source={chevronHaut}
      /> )}
      </TouchableOpacity>
        { collapsed && (<Image
        style={styles.arrowImage}
        source={fleche}
      /> )}
      { collapsed && (<Image
        style={styles.eraserImage}
        source={gomme}
      />)}
      { collapsed && (<Image
        style={styles.penImage}
        source={crayon}
      /> )}
      { collapsed && (<Image
        style={styles.maillotImage}
        source={maillot}
      />)}
      { collapsed && (<Image
        style={styles.ballImage}
        source={ballon}
      />)} 
      </Animated.View>
      
      
    </View>
  );
};



// Exportation du composant AnimatedBottomBar
export default AnimatedBottomBar;
