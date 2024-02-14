import React from 'react';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import {ImageBackground, Image, TouchableOpacity, View, StyleSheet, Text} from 'react-native';

export default function Home () {
      const [loaded] = useFonts({
        oswald: require('../assets/font/Oswald-Medium.ttf'),
        roboto: require('../assets/font/Roboto-Medium.ttf'),
    });
    const navigation = useNavigation();
    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    if (!loaded) {
      return null;
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ImageBackground  source={require('../assets/login.png')} 
            style={{width: "100%", height: "100%"}}>
              <View style={styles.title}>
                <Text style={styles.titleText}>Stratégie<Text style={styles.redText}>RCT</Text></Text>
              </View>
              <View style={styles.starContainer}>
                <Image source={require('../assets/star.png')} style={styles.starImage} />
                <Image source={require('../assets/star.png')} style={styles.starImage} />
                <Image source={require('../assets/star.png')} style={styles.starImage} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button} activeOpacity={0.7}>
                  <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Inscription</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.button, styles.button2]} activeOpacity={0.7}>
                  <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Connexion</Text>
              </TouchableOpacity>
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
    top: '30%', // Adjust according to your layout
     // Ajout d'ombres
    shadowColor: '#fff',
    shadowOffset: {
      width: 4,  // Déplacement vers la gauche
      height: 4,  // Déplacement vers le bas
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    
  },
  button2: {
    top: '45%',
  },
  buttonText: {
    color: '#373737', // Couleur du texte du bouton
    fontSize: 28, // Taille de la police du texte du bouton
    fontWeight: 'bold', // Texte en gras
    textAlign: "center",
    fontFamily: "roboto",
  },
  starContainer: {
    flexDirection: 'row', // Alignement horizontal des images d'étoiles
    marginTop: 10, // Marge en haut des étoiles
    justifyContent: 'center',
    alignItems: 'center',
  },
  starImage: {
    width: 30, // Largeur de l'image d'étoile
    height: 30, // Hauteur de l'image d'étoile
    marginHorizontal: 5, // Marge horizontale entre les étoiles
  },
});