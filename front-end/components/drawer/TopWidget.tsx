import React, { useState } from 'react';
import { View, TouchableOpacity,Image,Text} from 'react-native';
import styles from './styles';

import burger_menu from '../../assets/BurgerMenu.png';
import play_button from '../../assets/PlayButton.png';
import reload from '../../assets/Reload.png';

const TopWidget = ({ onPlayButtonPress }: { onPlayButtonPress: (info: string) => void }) => {
    const handlePress = (info : String) => {
        console.log('Information remontée depuis TopWidget :', info);
        // Faire quelque chose avec l'information remontée
        onPlayButtonPress(info);
      };

    return (
        <View style={styles.topWidget}>
            <View style={styles.topWidgetElement}>
                <View style={styles.topWidgetElementLeft}>
                    <TouchableOpacity  style={styles.topWidgetButton} onPress={() => handlePress('Info du bouton 1')} >
                        <Image source={burger_menu} />
                    </TouchableOpacity >
                    <Text style={styles.topWidgetText}>Touche à 22 mètres</Text>
                </View>
                <View style={styles.topWidgetElementRight}>
                    <TouchableOpacity style={styles.topWidgetButton}>
                        <Image source={play_button} style={styles.topWidgetImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topWidgetButton}>
                        <Image source={reload}  style={styles.topWidgetImage}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default TopWidget;
