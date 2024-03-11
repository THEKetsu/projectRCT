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
  const [errorText, setErrorText] = React.useState('');
  const [errorOccurred, setErrorOccurred] = React.useState(false);


  const login = () => {

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
        console.log("USER CREDENTIAL ",userCredential);
        console.log("USER PASSWORD",password);
        const email = userCredential.user.email;
        console.log(email)
        if (email != null){
          localStorage.setItem("email", email);
        }
        navigation.navigate("StrategyMenu")
      })
      .catch((error) => {
        console.log(error);
        setErrorOccurred(true);
        setErrorText("Erreur de connexion. Vérifiez votre e-mail et votre mot de passe.");
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
  const backButtonSize = screenWidth * 0.03;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground  source={require('../../assets/login.png')} 
        style={{width: "100%", height: "100%"}}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Conn<Text style={styles.redText}>exion</Text></Text>
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
              style={[styles.input, errorOccurred && styles.errorInput]} // Appliquer le style d'erreur si une erreur est survenue
              placeholder="E-mail"
              placeholderTextColor={errorOccurred ? '#FF0000' : 'rgba(255, 255, 255, 0.5)'} // Changer la couleur du placeholder en rouge si une erreur est survenue
              underlineColorAndroid={errorOccurred ? '#FF0000' : 'transparent'} // Changer la couleur du contour en rouge si une erreur est survenue
              onChangeText={(text) => {
                  setEmail(text);
                  setIsEmailValid(regex.test(text));
              }}
            />
          </View>
          <View style={[styles.overlay, styles.overlay2]}>
            <TextInput
                style={[styles.input, errorOccurred && styles.errorInput]}
                placeholder="Mot de passe"
                placeholderTextColor={errorOccurred ? '#FF0000' : 'rgba(255, 255, 255, 0.5)'} // Changer la couleur du placeholder en rouge si une erreur est survenue
                underlineColorAndroid={errorOccurred ? '#FF0000' : 'transparent'} // Changer la couleur du contour en rouge si une erreur est survenue
                secureTextEntry={true}
                onChangeText={(text) => {
                  setPassword(text);
                  setIsPasswordValid(text.length >= 6); // Update password validity
                }}
            />
          </View>
          <View style={[styles.overlay, styles.overlay2, styles.overlay3]}>
            {errorOccurred && ( // Afficher le texte d'erreur si une erreur est survenue
              <Text style={styles.errorText}>Email ou Mot de passe incorrect</Text>
            )}
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
    width: "15%",
    height: "5.5%",
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: '70%',
  },
  forgotPasswordText: {
    color: '#fff',
    textDecorationLine: 'underline',
    textAlign: "center",
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
  buttonActive: {
    backgroundColor: '#fff', // Change button color to white when both fields are valid
  },
  errorInput: {
    borderBottomColor: '#FF0000', // Changer la couleur du contour en rouge en cas d'erreur
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    fontFamily: "roboto",
    marginBottom: 10, // Espacement en bas pour éviter la superposition avec le bouton
    top: '50%',
    left: 0, // Center horizontally
    right: 0, // Center horizontally
    justifyContent: 'center',
    alignItems: 'center',
  },

});