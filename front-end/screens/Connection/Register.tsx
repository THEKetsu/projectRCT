import React from 'react';
import { useFonts } from 'expo-font';
import {ImageBackground, Image, TouchableOpacity, View, StyleSheet, TextInput, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register () {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const navigation = useNavigation();
  const [loaded] = useFonts({
      oswald: require('../../assets/font/Oswald-Medium.ttf'),
      roboto: require('../../assets/font/Roboto-Medium.ttf'),
  });
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeated, checkPassword] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  const register = () => {
    console.log("Test register")

    if (!isEmailValid) {
      console.error("Invalid email address")
      return
    }

    if (!isPasswordValid || password !== passwordRepeated) {
      console.error("Passwords do not match or are not valid")
      return
    }
    if (password == passwordRepeated){
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          navigation.navigate("Login")
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else{
      console.error("Not the same password")
      return
    }
  };

  if (!loaded) {
    return null;
  }
  
  const screenWidth = Dimensions.get('window').width;
  const starSize = screenWidth * 0.02; // Adjust this factor according to your preference
  const backButtonSize = screenWidth * 0.03;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground  source={require('../../assets/login.png')} 
        style={{width: "100%", height: "100%"}}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Inscri<Text style={styles.redText}>ption</Text></Text>
          </View>
          <TouchableOpacity style={[styles.leftButton, { width: backButtonSize, height: backButtonSize }]} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/left_arrow.png')} style={{ width: backButtonSize, height: backButtonSize }} />
          </TouchableOpacity>
          <View style={styles.starContainer}>
            <Image source={require('../../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
            <Image source={require('../../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
            <Image source={require('../../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
          </View>
          <View style={styles.overlay}>
              <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  underlineColorAndroid="transparent"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setIsEmailValid(regex.test(text));
                  }}
              />
            </View>
            <View style={[styles.overlay, styles.overlay2]}>
              <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setIsPasswordValid(text.length >= 6);
                  }}
              />
          </View>
          <View style={[styles.overlay, styles.overlay3]}>
              <TextInput
                  style={styles.input}
                  placeholder="Répéter le mot de passe"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  value={passwordRepeated}
                  onChangeText={(text) => checkPassword(text)}
              />
          </View>
          <TouchableOpacity style={[styles.button, (isEmailValid && isPasswordValid && password === passwordRepeated) ? styles.buttonActive : null]}
                  activeOpacity={0.7}
                  onPress={() => register()}
                  disabled={!isEmailValid || !isPasswordValid || password !== passwordRepeated}>
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
});