import React from 'react';
import { useFonts } from 'expo-font';
import {ImageBackground, Image, TouchableOpacity, View, StyleSheet, TextInput, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login () {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const navigation = useNavigation();
  const [loaded] = useFonts({
    oswald: require('../../assets/font/Oswald-Medium.ttf'),
    roboto: require('../../assets/font/Roboto-Medium.ttf'),
  });
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false); // New state to track email validity
  const [isPasswordValid, setIsPasswordValid] = React.useState(false); // New state to track password validity


  const login = () => {
    console.log("Test register")

    if (!isEmailValid) {
      console.error("Invalid email address")
      return
    }

    if (!isPasswordValid) {
      console.error("The password must have a minimum length of 6 characters")
      return
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigation.navigate("Success")
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

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
            <Text style={styles.titleText}>Conn<Text style={styles.redText}>exion</Text></Text>
          </View>
          <TouchableOpacity style={styles.leftButton} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/left_arrow.png')} style={styles.leftButtonImage} />
          </TouchableOpacity>
          <View style={styles.starContainer}>
            <Image source={require('../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
            <Image source={require('../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
            <Image source={require('../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
          </View>
          <View style={styles.overlay}>
              <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)" // Couleur du placeholder avec opacité
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    setEmail(text);
                    setIsEmailValid(regex.test(text)); // Update email validity
                  }}
              />
            </View>
            <View style={[styles.overlay, styles.overlay2]}>
              <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)" // Couleur du placeholder avec opacité
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    setPassword(text);
                    setIsPasswordValid(text.length >= 6); // Update password validity
                  }}
              />
          </View>
          <TouchableOpacity style={[styles.button, (isEmailValid && isPasswordValid) ? styles.buttonActive : null]} activeOpacity={0.7} onPress={() => login()} disabled={!isEmailValid || !isPasswordValid}>
              <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Se Connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
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
    top: '30%',
    left: 0, // Center horizontally
    right: 0, // Center horizontally
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay2: {
    top: '45%',
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
    top: '60%', // Adjust according to your layout
    
  },
  buttonText: {
    color: '#373737', // Couleur du texte du bouton
    fontSize: 28, // Taille de la police du texte du bouton
    fontWeight: 'bold', // Texte en gras
    textAlign: "center",
    fontFamily: "roboto",
  },
  forgotPasswordButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: '70%',
  },
  forgotPasswordText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 18,
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
  leftButtonImage: {
      width: 40,
      height: 40,
  },
  buttonActive: {
    backgroundColor: '#fff', // Change button color to white when both fields are valid
  },
});
