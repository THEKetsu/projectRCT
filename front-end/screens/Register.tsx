import React from 'react';
import { useFonts } from 'expo-font';
import {ImageBackground, Image, TouchableOpacity, View, StyleSheet, TextInput, Text} from 'react-native';

export default function Register () {
      const [loaded] = useFonts({
        oswald: require('../assets/font/Oswald-Medium.ttf'),
        roboto: require('../assets/font/Roboto-Medium.ttf'),
    });
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
                <Text style={styles.titleText}>Inscri<Text style={styles.redText}>ption</Text></Text>
              </View>
              <View style={styles.starContainer}>
                <Image source={require('../assets/star.png')} style={styles.starImage} />
                <Image source={require('../assets/star.png')} style={styles.starImage} />
                <Image source={require('../assets/star.png')} style={styles.starImage} />
              </View>
              <View style={styles.overlay}>
                  <TextInput
                      style={styles.input}
                      placeholder="E-mail"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)" // Couleur du placeholder avec opacité
                      underlineColorAndroid="transparent"
                  />
                </View>
                <View style={[styles.overlay, styles.overlay2]}>
                  <TextInput
                      style={styles.input}
                      placeholder="Mot de passe"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)" // Couleur du placeholder avec opacité
                      underlineColorAndroid="transparent"
                      secureTextEntry={true}
                  />
              </View>
              <View style={[styles.overlay, styles.overlay3]}>
                  <TextInput
                      style={styles.input}
                      placeholder="Répéter le mot de passe"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)" // Couleur du placeholder avec opacité
                      underlineColorAndroid="transparent"
                      secureTextEntry={true}
                  />
              </View>
              <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                  <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>S'inscrire</Text>
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
    width: 250, // Largeur du TextInput
    height: 60, // Hauteur du TextInput
    paddingHorizontal: 10,
    fontSize: 26, // Taille de la police du texte
    fontFamily: "roboto",
    color: '#fff',
    borderBottomWidth: 1, // Épaisseur de la barre horizontale
    borderBottomColor: '#fff', // Couleur de la barre horizontale
  },
  button: {
    // Remove left and top properties
    width: 250,
    height: 60,
    marginTop: 20,
    backgroundColor: '#959595',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // Center horizontally
    alignSelf: 'center',
    // Adjust top position to properly center vertically
    top: '70%', // Adjust according to your layout
    
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