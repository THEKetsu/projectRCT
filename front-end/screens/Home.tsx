import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../components/drawer/styles';
import TopWidget from '../components/drawer/TopWidget';
import DrawerLeft from '../components/drawer/DrawerLeft';


export default function Home() {
    console.log('******************************TEST*********************************');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handlePressPlayButton = (info: any) => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const handleItemSelected = (selectedItem: string | null) => {
    setSelectedItem(selectedItem);
  };

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
