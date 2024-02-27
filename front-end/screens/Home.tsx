import {View, Button,StyleSheet, ImageBackground, Dimensions,Text,Image, TouchableOpacity,FlatList, TextInput} from 'react-native';
import {useEffect, useState} from "react";
import Player from '../classes/Player';
import Ballon from '../classes/Ballon';
import React from 'react';
import { useFonts } from 'expo-font';
import { browserPopupRedirectResolver } from 'firebase/auth';
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;
const starSize = dimWidth * 0.02; // Adjust this factor according to your preference
const backButtonSize = dimWidth * 0.02;
const fieldSize = dimWidth * 0.05;

const DATA = [
    { id: '1', text: 'strat 1' },
    { id: '2', text: 'strat 2' },
    { id: '3', text: 'strat 3' },
    { id: '4', text: 'strat 4' },
    { id: '5', text: 'strat 5' },
    { id: '6', text: 'strat 6' },
    { id: '7', text: 'strat 7' },
    // Ajoutez autant d'images que nécessaire...
  ];
  // @ts-ignore
  const renderItem = ({ item }) => (
    <View style={styles.stratContainer} >
      <Image source={require('../assets/Field_Stack.png')} style={styles.fieldImage} />
      <Text style={styles.cellText}>{item.text}</Text>
      <Feather 
        name={"trash"}
        size={20}
        color={"red"}
      />
      <Octicons 
        name={"pencil"}
        size={20}
        color={"grey"}
      />
    </View>
    
  );


// @ts-ignore
export default function Home ({ navigation }) {
    const [stratName,NameStrat] = useState('');
    const [loaded] = useFonts({
        oswald: require('../assets/font/Oswald-Medium.ttf'),
        roboto: require('../assets/font/Roboto-Medium.ttf'),
      });
    if (!loaded) {
        return null;
      }
    
    return (
        <View style={styles.homeContainer}>
            <ImageBackground source={require('../assets/home_background.png')} resizeMode="cover" style={styles.image}>
            <View style={styles.title}>
            <Text style={styles.titleText}>Charger une Stra<Text style={styles.redText}>tégie</Text></Text>
            </View>
            <TouchableOpacity style={[styles.leftButton, { width: backButtonSize, height: backButtonSize }]} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/left_arrow.png')} style={{ width: backButtonSize, height: backButtonSize }} />
          </TouchableOpacity>
                <View style={styles.starContainer}>
                    <Image source={require('../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
                    <Image source={require('../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
                    <Image source={require('../assets/star.png')} style={[styles.starImage, { width: starSize, height: starSize }]} />
                </View>
                <View style={styles.searchContainer}>
                <Entypo
                    name={"magnifying-glass"}
                    size={20}
                    color={"white"}
                />    
                <TextInput
                  style={styles.input}
                  placeholder="search"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)" // Couleur du placeholder avec opacité
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    NameStrat(text);
                  }}
              />
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                    style={styles.listflat}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
                <Button onPress={() => navigation.navigate("Strategy")} title={"GO TO STRATEGY"}/>
            </ImageBackground>
            
        </View>
    ) 
}
const styles = StyleSheet.create({
    homeContainer:{
        flex: 1,
        backgroundColor:'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        heigth: '100%'
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
      title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      leftButton: {
        position: 'absolute',
        top: 40, // Décaler vers le bas
        left: 30, // Décaler vers la droite
        zIndex: 999, // Assure que le bouton est au-dessus de tout autre contenu
      },
      listContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        height:'90%',
        marginLeft:'5%'

      },
      stratContainer:{
        backgroundColor:'white',
        aspectRatio: 1,
        width: '30%',
        margin: 10,
        borderRadius:10
    
        
        
      },
      fieldImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width: '90%',
        height: '90%',
        marginLeft:'5%',
        resizeMode: 'contain',

      },
      cellText:{
        color:'black',
        textAlign: 'center',
        zIndex:9,
        fontFamily: "oswald",
        marginBottom: '5%',
        fontSize: 25
        
      },
      listflat:{
        width: '100%',
        height: '100%'
      },
      searchContainer:{
        width: '10%',
        height: '10%',
        marginLeft: '45%',
        marginTop:'2%'

      },
      input: {
        width: "100%",
        height: "60%",
        paddingHorizontal: 10,
        fontSize: 26, // Taille de la police du texte
        fontFamily: "roboto",
        color: '#fff',
        borderBottomWidth: 1, // Épaisseur de la barre horizontale
        borderBottomColor: '#fff', // Couleur de la barre horizontale
      },
      
});
