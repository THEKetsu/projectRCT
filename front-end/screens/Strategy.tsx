import { StyleSheet, View, Pressable, Image } from 'react-native';
//@ts-ignore
import React, { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import { Field } from '../components/Field/Field';
import Position from '../components/ToolBar/Position';

export default function Strategy() {
  const viewShotRef = useRef<ViewShot>(null);
  let capturedCount = 0;
  const [base64Icon, setBase] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const captureScreen = async () => {
    try {
      //@ts-ignore
      const result = await viewShotRef.current.capture();
      console.log('Capture successful', result, capturedCount);
      capturedCount = capturedCount + 1;
      setBase(result);

      if (capturedCount < 3) {
        setTimeout(captureScreen, 1000);
      } else {
        // Create the video here
        const images = [base64Icon]; // Use an array with your captured images (base64 strings)

      }
    } catch (error){

    }
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}> */}
          <Field />
        {/* </ViewShot> */}

        <Position />
        {/* <Image style={{ width: 50, height: 50 }} source={{ uri: base64Icon }} /> */}
      </GestureHandlerRootView>

      {/* <Pressable
        onPress={captureScreen}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'red' : 'rgb(165, 15, 25)',
            position: 'absolute',
            padding: 10,
            borderRadius: 5,
            top: 20,
          },
        ]}
      >

      </Pressable> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5FB07B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
