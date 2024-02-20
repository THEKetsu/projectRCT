import { StyleSheet, View, Pressable, Image } from 'react-native';
//@ts-ignore
import React, { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import { Field } from '../components/Field/Field';
import TopWidget from '../components/drawer/TopWidget';
import Position from '../components/ToolBar/Position';
import DrawerLeft from '../components/drawer/DrawerLeft';

export default function Strategy() {



  console.log('******************************TEST*********************************');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  /**
   * Handle the press event on the play button.
   *
   * @param {any} info - the information related to the press event
   * @return {void} 
   */
  const handlePressPlayButton = (info: any) => {
    setIsDrawerOpen(true);
  };

  /**
   * Closes the drawer by setting the isDrawerOpen state to false.
   *
   * @param {} 
   * @return {}
   */
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  /**
   * A function that handles the selected item.
   *
   * @param {any | null} selectedItem - the selected item to be handled
   * @return {void} 
   */
  const handleItemSelected = (selectedItem: any | null) => { 
    setSelectedItem(selectedItem.name);
  };

  
  console.log('Information about the selected item: ', selectedItem);
 
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
      {isDrawerOpen && <DrawerLeft onClose={handleCloseDrawer} isOpen={isDrawerOpen} onItemSelected={handleItemSelected} />}
      {!isDrawerOpen && <TopWidget onPlayButtonPress={handlePressPlayButton}  selectedItem={selectedItem}/>}

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
    backgroundColor: '#5FB07B',
    width: '100%',
    height: '100%',
    zIndex:1
  },
});
