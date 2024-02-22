import React, {useState} from 'react';
import { View, TouchableOpacity,Image,Text} from 'react-native';
import styles from './styles';
import burger_menu from '../../assets/BurgerMenu.png';
import play_button from '../../assets/PlayButton.png';
import reload from '../../assets/Reload.png';
import { returnPublicInstance } from '../../classes/ReturnPublicManager';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';
import {setPositionList} from "../../redux/actions/positionActions";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {Position} from "../../utils/interfaces";
import { ReturnPublic } from '../../classes/ReturnPublic';
import { triggerRefresh } from '../../redux/actions/optionActions';
/**
 * Renders the TopWidget component.
 *
 * @param {Function} onPlayButtonPress - Function to handle play button press
 * @param {string | null} selectedItem - The selected item or null
 * @return {JSX.Element} JSX element representing the TopWidget component
 */
const TopWidget = ({ onPlayButtonPress,  selectedItem  }: { onPlayButtonPress: (info: string) => void, selectedItem: string | null  }): JSX.Element => {
;

    const position: Position = useAppSelector((state) => state.position)
    const dispatch = useAppDispatch()
    const [dynamicPositionList, setDynamicPositionList] = useState<[number, Player[], Ballon[]][]>([]);

    const handlePress = (info : string) => {
        // Faire quelque chose avec l'information remontée
        onPlayButtonPress(info);
      };

      const handleReturnPress = (eraseAction:any[]) => {
        // Your logic for handling the press goes here
    
            console.log(">>>",eraseAction)
            switch (eraseAction[0]) {
                //Creation de joueur (id saved)
                case 'c':
                  
                  console.log("Case c",dynamicPositionList[position.positionIndex]);
                  deletePlayer(eraseAction[1])

                  break;

                //Deletion d'un joueur (joueur saved)
                case 'd':

                    restorePlayer(eraseAction[1]);
                
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

      const retrieveReduxPosition = () => {
        let eraseAction : any[];
        if(returnPublicInstance.returnActionList.length > 0){

            eraseAction = returnPublicInstance.returnActionList[returnPublicInstance.returnActionList.length - 1];

            setDynamicPositionList(
                JSON
                .parse(position.positionList)
                .map((item: any) => [item[0],item[1].map(Player.from),item[2].map(Ballon.from)])
                );

                if(dynamicPositionList.length>0){
                    handleReturnPress(eraseAction);
                }
        }
        
    }

      const deletePlayer = (currentID: string) => {
        let indexID = dynamicPositionList[position.positionIndex][1].findIndex((joueur) => joueur.id === currentID);
        if (indexID != -1) {
            const newPositionList = [...dynamicPositionList];
            newPositionList[position.positionIndex][1].splice(indexID, 1);
            setDynamicPositionList(newPositionList);

        }
        returnPublicInstance.returnActionList.splice((returnPublicInstance.returnActionList.length - 1),1);
        dispatch(setPositionList(JSON.stringify(dynamicPositionList)))
    };

    const restorePlayer = (myPlayer: Player) => {
        
        setDynamicPositionList((prevPos) => {
            const newPositionList = [...prevPos];

            if (newPositionList[position.positionIndex]) {
                newPositionList[position.positionIndex][1] = [...newPositionList[position.positionIndex][1], myPlayer];
            }


            return newPositionList;
        });

        if(dynamicPositionList){
            returnPublicInstance.returnActionList.splice((returnPublicInstance.returnActionList.length - 1),1);
     
            dispatch(setPositionList(JSON.stringify(dynamicPositionList)))
        }
       
    };
    const launchAnimate = () => {
        returnPublicInstance.indexAnimation = returnPublicInstance.indexAnimation + 1;
        dispatch(triggerRefresh());
        console.log("Change indexAnimation : ",returnPublicInstance.indexAnimation);
    }


    return (
        <View style={styles.topWidget}>
                <View style={styles.topWidgetElementLeft}>
                    <TouchableOpacity  style={styles.topWidgetButton} onPress={() => handlePress('Info du bouton 1')} >
                        <Image source={burger_menu} style={styles.PlayButton} />
                    </TouchableOpacity >
                    <Text style={styles.topWidgetText}>{selectedItem || "Selectionner un scenario"}</Text>
                </View>
                <View style={styles.topWidgetElementRight}>
                    <TouchableOpacity style={styles.topWidgetButton} onPress={launchAnimate} >
                        <Image source={play_button} style={styles.PlayButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.topWidgetButton}
                    onPress={retrieveReduxPosition}>
                        <Image source={reload} style={styles.PlayButton}/>
                    </TouchableOpacity>
                </View>
        </View>
    );
};
export default TopWidget;
