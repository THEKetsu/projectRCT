import {View, Text, Button, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import styles from '../components/drawer/styles';
import TopWidget from '../components/drawer/TopWidget';
import DrawerLeft from '../components/drawer/DrawerLeft';

export default function Home () {
    const handlePressPlayButton = (info : any) => {
        console.log('Information remontée depuis TopWidget :', info);
        // Faire quelque chose avec l'information remontée
      };
    return (
        <View  style={styles.container}>
            <DrawerLeft isOpen={true} onClose={() => {}} />
            <TopWidget  onPlayButtonPress={handlePressPlayButton} />

            <View style={styles.home}>
                <Text>Hello</Text>
            </View>
        </View>
    )
}


