import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../components/drawer/styles';
import TopWidget from '../components/drawer/TopWidget';
import DrawerLeft from '../components/drawer/DrawerLeft';


export default function Home() {
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
  return (
    <View style={styles.container}>
      {isDrawerOpen && <DrawerLeft onClose={handleCloseDrawer} isOpen={isDrawerOpen} onItemSelected={handleItemSelected} />}
      {!isDrawerOpen && <TopWidget onPlayButtonPress={handlePressPlayButton}  selectedItem={selectedItem}/>}
      <View style={styles.home}>
        <Text></Text>
      </View>
    </View>
  );
}
