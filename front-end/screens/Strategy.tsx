import { StyleSheet, View, Pressable, Image } from 'react-native';
//@ts-ignore
import React, { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import { Field } from '../components/Field/Field';
import Position from '../components/ToolBar/Position';
import * as FileSystem from 'expo-file-system';

export default function Strategy() {
  const viewShotRef = useRef<ViewShot>(null);
  let capturedCount = 0;
  const [base64Icon, setBase] = useState('');

//   const captureScreen = async () => {
//     try {
//       //@ts-ignore
//       const result = await viewShotRef.current.capture();
//       console.log('Capture successful', result, capturedCount);
//       capturedCount = capturedCount + 1;
//       setBase(result);

//       if (capturedCount < 3) {
//         setTimeout(captureScreen, 1000);
//       }

//       // Save the captured image to a file
//     //   saveImageToFile(result);
//     } catch (error) {
//       console.error('Capture failed', error);
//     }
//   };

//   const saveImageToFile = async (base64Image: string) => {
//     try {
//       const path = FileSystem.documentDirectory + 'myImage.png';

//       await FileSystem.writeAsStringAsync(path, base64Image, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       console.log('Image saved successfully at:', path);
//     } catch (error) {
//       console.error('Failed to save image:', error);
//     }
//   };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
          <Field />
        </ViewShot>

        <Position />
        {/* <Image style={{ width: 50, height: 50 }} source={{ uri: base64Icon }} /> */}
      </GestureHandlerRootView>

      {/* <Pressable
        onPress={captureScreen}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'red' : 'rgb(165, 15, 25)',
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
