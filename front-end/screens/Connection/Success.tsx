import React from 'react';
import { useFonts } from 'expo-font';
import {ImageBackground, StyleSheet, View,} from 'react-native';

export default function Success () {
    const [loaded] = useFonts({
      oswald: require('../../assets/font/Oswald-Medium.ttf'),
      roboto: require('../../assets/font/Roboto-Medium.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground  source={require('../../assets/login.png')} 
            style={{width: "100%", height: "100%"}}>

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
  }
});