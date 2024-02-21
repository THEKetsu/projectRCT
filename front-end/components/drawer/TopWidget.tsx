import React, { useState } from 'react';
import { View, TouchableOpacity,Image,Text} from 'react-native';
import styles from './styles';

import burger_menu from '../../assets/BurgerMenu.png';
import play_button from '../../assets/PlayButton.png';
import reload from '../../assets/Reload.png';
import { returnPublicInstance } from '../../classes/ReturnPublicManager';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';
import { PositionLogic } from '../../redux/slices/positionLogicSlice';
import { useAppSelector } from '../../hooks/reduxHooks';








/**
 * Renders the TopWidget component.
 *
 * @param {Function} onPlayButtonPress - Function to handle play button press
 * @param {string | null} selectedItem - The selected item or null
 * @return {JSX.Element} JSX element representing the TopWidget component
 */
const TopWidget = ({ onPlayButtonPress,  selectedItem  }: { onPlayButtonPress: (info: string) => void, selectedItem: string | null  }) => {
;

    const positionLogic: PositionLogic = useAppSelector((state) => state.positionLogic)

    const [dynamicPositionList, setDynamicPositionList] = useState<[number, Player[], Ballon[]][]>([]);

    const handlePress = (info : String) => {
        // Faire quelque chose avec l'information remontée
        onPlayButtonPress(info);
      };

      const handleReturnPress = () => {
        // Your logic for handling the press goes here
        console.log(returnPublicInstance.returnActionList);
        let eraseAction : any[];
        if(returnPublicInstance.returnActionList.length > 0){

            eraseAction = returnPublicInstance.returnActionList[returnPublicInstance.returnActionList.length - 1];
          
            //Prendredu redux,

            setDynamicPositionList(
                JSON
                .parse(positionLogic.positionList)
                .map((item: any) => [item[0],item[1].map(Player.from),item[2].map(Ballon.from)])
                );


            switch (eraseAction[0]) {
                //Creation de joueur (id saved)
                case 'c':
                  
                  console.log("Case c",dynamicPositionList);

                  break;
                
                //Position de joueur modifié (ancienne position save)
                case 'p':
                  console.log('Case "p"');
                  break;
              
                // Add more cases as needed
              
                default:
                  // Handle the default case if none of the above matches
                  console.log('Default case');
              }
        }


      };

    return (
        <View style={styles.topWidget}>
                <View style={styles.topWidgetElementLeft}>
                    <TouchableOpacity  style={styles.topWidgetButton} onPress={() => handlePress('Info du bouton 1')} >
                        <Image source={burger_menu} style={styles.PlayButton} />
                    </TouchableOpacity >
                    <Text style={styles.topWidgetText}>{selectedItem || "Selectionner un scenario"}</Text>
                </View>
                <View style={styles.topWidgetElementRight}>
                    <TouchableOpacity style={styles.topWidgetButton}>
                        <Image source={play_button} style={styles.PlayButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.topWidgetButton}
                    onPress={handleReturnPress}>
                        <Image source={reload}  style={styles.PlayButton}/>
                    </TouchableOpacity>
                </View>
        </View>
    );
};
export default TopWidget;
