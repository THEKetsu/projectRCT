import React, { useState } from 'react';
import { View, TouchableOpacity,Image,Text} from 'react-native';
import styles from './styles';

import burger_menu from '../../assets/BurgerMenu.png';
import play_button from '../../assets/PlayButton.png';
import reload from '../../assets/Reload.png';

const TopWidget = ({ onPlayButtonPress,  selectedItem  }: { onPlayButtonPress: (info: string) => void, selectedItem: string | null  }) => {
    const handlePress = (info : String) => {
        // Faire quelque chose avec l'information remontée
        onPlayButtonPress(info);
      };

    return (
        <View style={styles.topWidget}>
                <View style={styles.topWidgetElementLeft}>
                    <TouchableOpacity  style={styles.topWidgetButton} onPress={() => handlePress('Info du bouton 1')} >
                        <Image source={burger_menu} />
                    </TouchableOpacity >
                    <Text style={styles.topWidgetText}>{selectedItem || "Selectionner un scenario"}</Text>
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
    );
};
export default TopWidget;
