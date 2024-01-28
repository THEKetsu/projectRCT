import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, PanResponder, Pressable, TouchableOpacity,
   TextStyle, StyleProp, TouchableWithoutFeedback, Image } from 'react-native';

import { Video } from 'expo-av';

import ViewShot from 'react-native-view-shot';
import ImageSequence from 'react-native-image-sequence';
import { ZoomableSVG } from './ZoomSVG';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ComponentPosition from '../ToolBar/Position';
import Player from '../../classes/Player';

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

export default function FieldHandler() {
  const videoRef = useRef<Video>(null);
  const viewShotRef = useRef<ViewShot>(null); // Initialize viewShotRef
  const [isVideoVisible, setVideoVisible] = useState(false);
  //Pour le button zoom lien avec ZoomButton.tsx
  let [buttonZoom, setButtonValue] = useState(false);
  let [buttonADDPlayer, setButtonValueADD] = useState(false);


  const [dataFromA, setDataFromA] = useState(0);
  const [dataForPosition, setDataForPosition] = useState(0);
  let stupidPlayer = Player.createPlayer([0,0],"0B",[],[],1,"false");
  const [dataForSave, setDataForSave] = useState<[number, Player[]][]>([[0,[stupidPlayer]]]);
  const [dataForReturn, setDataForReturn] = useState<[number, Player[]][]>([[0,[stupidPlayer]]]);




  const captureScreen = async () => {
    try {
      // @ts-ignore
      const result = await viewShotRef.current.capture();
      console.log('Capture successful', result);
      // Handle captured data (result)

    } catch (error) {
      console.error('Capture failed', error);
    }
  };

  const handleDataFromA = (data : number) => {
    // Do something with the data received from ComponentA
    setDataFromA(data);
  };

  const handleSaveForZoomSVG= (data : [number, Player[]][]) => {

    setDataForReturn(data);
  };

  const handleDataForPosition = (data : number) => {
    // Do something with the data received from ComponentA
    setDataForPosition(data);
  };

  const handleDataForSavingPosition = (data : [number, Player[]][]) => {
    // Do something with the data received from ComponentA
    setDataForSave(data);
  };

  const handleDataFromB = (data : string) => {
    // Do something with the data received from ComponentB
    return(data);
  };

  const playVideo = async () => {
    setVideoVisible(true);

    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  };

  const endVideo = async () => {
    setVideoVisible(false);

    if (videoRef.current) {
      await videoRef.current.stopAsync();
    }
  };

  const handleClickZoom = () => {
    console.log("CLICK");
    setButtonValueADD(false);
    setButtonValue(true);
  };

  const handleClickADD = () => {
    setButtonValue(false);
    setButtonValueADD(true);
  };

  return (
    <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 0.9 }}
        style={styles.viewShot}
      > 
    <View style={styles.container}>
      {!isVideoVisible && 
       <GestureHandlerRootView style={{ flex: 1 }}>
        <ZoomableSVG buttonValue={buttonZoom} buttonADDPlayer={buttonADDPlayer} sendDataToA={dataFromA} 
        sendNewsToPosition={handleDataForPosition} sendSaveOfPosition={handleDataForSavingPosition} receiveSavedPosition={dataForReturn}/>
        <ComponentPosition sendDataToB={handleDataFromA}  receivedData={dataForPosition} receivedPosition={dataForSave}
        sendSavedData={handleSaveForZoomSVG} />
        </GestureHandlerRootView>}
      <StatusBar backgroundColor="auto" />

      <Pressable onPress={handleClickZoom}>
      <Text>Mode ZOOM</Text>
      </Pressable>

      <Pressable onPress={handleClickADD}>
      <Text>ADD Player</Text>
      </Pressable>


      
      {!isVideoVisible && (
        <Pressable
          onPress={playVideo}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'red' : 'rgb(165, 15, 25)',
              padding: 10,
              borderRadius: 5,
            },
            styles.button,
          ]}
        >
          <Text style={{ color: 'white' }}>Play Video</Text>
        </Pressable>
      )}

      

      {isVideoVisible && (
        <Pressable
          onPress={endVideo}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'red' : 'rgb(165, 15, 25)',
              padding: 10,
              borderRadius: 5,
            },
            styles.button,
          ]}
        >
          <Text style={{ color: 'white' }}>End Video</Text>
        </Pressable>
      )}

      <Pressable
        onPress={captureScreen}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'red' : 'rgb(165, 15, 25)',
            padding: 10,
            borderRadius: 5,
            position: 'absolute',
            top: 20,
          },
          styles.button2,
        ]}
      >
        <Text style={{ color: 'white' }}>Capture Screen</Text>
      </Pressable> 
    </View>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    top: dimHeight * 0.88,
    left: dimWidth * 0.45,
    marginTop: 20,
  },
  button2: {
    position: 'absolute',
    top: dimHeight * 0,
    left: dimWidth * 0.1,
    marginTop: 20,
  },
  video: {
    position: 'absolute',
    top: dimHeight * 0.1,
    left: dimWidth * 0.25,
    bottom: 0,
    right: 0,
  },
  viewShot: {
    position: 'absolute',
    top: dimHeight * 0.2,
    left: dimWidth * 0.25,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});