import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, PanResponder, Pressable, TouchableOpacity,
   TextStyle, StyleProp, TouchableWithoutFeedback, Image } from 'react-native';

import { Video } from 'expo-av';
import { MyComponent } from './Test';

import ViewShot from 'react-native-view-shot';
import ImageSequence from 'react-native-image-sequence';

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

export default function Momo() {
  const videoRef = useRef<Video>(null);
  const viewShotRef = useRef<ViewShot>(null); // Initialize viewShotRef
  const [isVideoVisible, setVideoVisible] = useState(false);


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

  return (
    <ViewShot
        ref={viewShotRef}
        options={{ format: 'png', quality: 0.9 }}
        style={styles.viewShot}
      > 
    <View style={styles.container}>
      {!isVideoVisible && <MyComponent />}
      <StatusBar backgroundColor="auto" />

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

      
        {/* {isVideoVisible && (
          <Video
            ref={videoRef}
            source={require('./assets/ussr.mp4')}
            style={styles.video}
            useNativeControls
          />
        )} */}
      

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