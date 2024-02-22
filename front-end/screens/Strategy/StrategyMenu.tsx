import React from 'react';
import {ImageBackground, Image, TouchableOpacity, View, StyleSheet, TextInput, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function StrategyMenu () {
  const [loaded] = useFonts({
    oswald: require('../../assets/font/Oswald-Medium.ttf'),
    roboto: require('../../assets/font/Roboto-Medium.ttf'),
  });
  const navigation = useNavigation();
  const email = localStorage.getItem("email")
  if (!loaded) {
    return null;
  }
  
  const screenWidth = Dimensions.get('window').width;
  const starSize = screenWidth * 0.02; // Adjust this factor according to your preference
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ImageBackground  source={require('../../assets/login.png')} 
            style={{width: "100%", height: "100%"}}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Stratégie<Text style={styles.redText}>RCT</Text></Text>
              </View>
              <View style={styles.starContainer}>
                <Image source={require('../../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
                <Image source={require('../../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
                <Image source={require('../../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('CreateStrategy')} style={styles.button} activeOpacity={0.7}>
                  <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Créer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('LoadStrategy')} style={[styles.button, styles.button2]} activeOpacity={0.7}>
                  <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Charger</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("test")} style={[styles.button, styles.button3]} activeOpacity={0.7}>
                  <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Paramètres</Text>
              </TouchableOpacity>
              <View style={styles.textView}>
                <Text style={styles.text}>{email}</Text>
              </View>
            </ImageBackground>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 48,
    color: '#D9D9D9',
    fontWeight: 'bold', // Texte en gras
    fontFamily: "oswald",
  },
  redText: {
    color: '#A8171B',
    fontWeight: 'bold', // Texte en gras
    fontFamily: "oswald",
  },
  overlay: {
    position: 'absolute',
    top: '25%',
    left: 0, // Center horizontally
    right: 0, // Center horizontally
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay2: {
    top: '40%',
    left: 0, // Center horizontally
    right: 0, // Center horizontally
  },
  overlay3: {
    top: '55%',
    left: 0, // Center horizontally
    right: 0, // Center horizontally
  },
  input: {
    width: "15%",
    height: "5.5%",
    paddingHorizontal: 10,
    fontSize: 26, // Taille de la police du texte
    fontFamily: "roboto",
    color: '#fff',
    borderBottomWidth: 1, // Épaisseur de la barre horizontale
    borderBottomColor: '#fff', // Couleur de la barre horizontale
  },
  button: {
    // Remove left and top properties
    width: "15%",
    height: "5.5%",
    marginTop: 20,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // Center horizontally
    alignSelf: 'center',
    // Adjust top position to properly center vertically
    top: '25%', // Adjust according to your layout
    shadowColor: '#fff',
    shadowOffset: {
      width: 4,  // Déplacement vers la gauche
      height: 4,  // Déplacement vers le bas
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    
  },
  button2: {
    top: '40%',
  },
  button3: {
    top: '55%',
  },
  buttonText: {
    color: '#373737', // Couleur du texte du bouton
    fontSize: 28, // Taille de la police du texte du bouton
    fontWeight: 'bold', // Texte en gras
    textAlign: "center",
    fontFamily: "roboto",
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starImage: {
    marginHorizontal: 5,
  },
  leftButton: {
    position: 'absolute',
    top: 40, // Décaler vers le bas
    left: 30, // Décaler vers la droite
    zIndex: 999, // Assure que le bouton est au-dessus de tout autre contenu
  },
  buttonActive: {
    backgroundColor: '#fff', // Change button color to white when both fields are valid
  },
  text: {
    borderRadius: 5,
    fontSize: 16,
    position: 'absolute',
    fontWeight: 'bold',
    color: "#fff"
  },
  textView: {
    position: 'absolute',
    bottom: 0, // Aligner le bas du composant avec le bas de l'écran
    left: 0, // Aligner le composant sur le bord gauche de l'écran
    marginBottom: 50, // Ajouter un espacement supplémentaire du bas de l'écran
    marginLeft: 20, // Ajouter un espacement supplémentaire du bord gauche de l'écran
  }  
});