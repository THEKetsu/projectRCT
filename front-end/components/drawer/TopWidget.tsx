import React, {Dispatch, useEffect, useRef, useState} from 'react';
import { View, TouchableOpacity,Image,Text} from 'react-native';
import styles from './styles';

import burger_menu from '../../assets/BurgerMenu.png';
import play_button from '../../assets/PlayButton.png';
import reload from '../../assets/Reload.png';
import { returnPublicInstance } from '../../classes/ReturnPublicManager';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';
import {setPositionIndex, setPositionList} from "../../redux/actions/positionActions";
import {FreeDraw, Option, PlayerPath, Position, ShirtDigit, Toolbar} from '../../utils/interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

/**
 * Renders the TopWidget component.
 *
 * @param {Function} onPlayButtonPress - Function to handle play button press
 * @param {string | null} selectedItem - The selected item or null
 * @return {JSX.Element} JSX element representing the TopWidget component
 */
const TopWidget = ({ onPlayButtonPress,  selectedItem  }: { onPlayButtonPress: (info: string) => void, selectedItem: string | null  }) => {
;

        const positionLogic: Position = useAppSelector((state) => state.position)
        const toolbarLogic: Toolbar = useAppSelector((state) => state.toolbar)
        const dispatch = useAppDispatch()
        const [dynamicPositionList, setDynamicPositionList] = useState<[number, Player[], Ballon[]][]>([]);
        const [foundI, setfoundI] = useState(-1);
        const [restoreDone,setRestoreDone] = useState(false);
        const [waitingForReset,setwaitingForReset] = useState(false);

        useEffect(() => {
            if(dynamicPositionList.length > 0){
                dispatch(setPositionList(JSON.stringify(dynamicPositionList)));
            }
            if(waitingForReset && foundI != -1){
                setwaitingForReset(false);
                handleReturnPress(returnPublicInstance.returnActionList[foundI][1][returnPublicInstance.returnActionList[foundI][1].length - 1],foundI)
            }
            
        }, [dynamicPositionList]);

        useEffect(() => {
            if(foundI != -1 && restoreDone){
                returnPublicInstance.returnActionList[foundI][1].splice((returnPublicInstance.returnActionList[foundI][1].length - 1),1);
                setRestoreDone(false);
                dispatch(setPositionList(JSON.stringify(dynamicPositionList)));
                
            }
            
        }, [restoreDone]);


    const handlePress = (info : String) => {
        // Faire quelque chose avec l'information remontée
        onPlayButtonPress(info);
      };

      const handleReturnPress = (eraseAction:any[], foundIndex:number) => {
        // Your logic for handling the press goes here
        
            if(eraseAction !== undefined){
                switch (eraseAction[0]) {
                    //Creation de joueur (id saved)
                    case 'c':
                      
                      deletePlayer(eraseAction[1])
    
                      break;
    
                    //Deletion d'un joueur (joueur saved)
                    case 'd':
    
                        restorePlayer(eraseAction[1]);
                    
                    //Position de joueur modifié (ancienne position save)
                    case 'b+':
                        deleteBallon();
                      break;

                    case 'b-':
                        restoreBallon(eraseAction[1]);
                  
                    // Add more cases as needed
                  
                    default:
                      // Handle the default case if none of the above matches
                      console.log('Default case');
                  }
            }
            
        }



      const retrieveReduxPosition = () => {
        let eraseAction : any[];
        if(returnPublicInstance.returnActionList.length > 0){


            const foundIndex = returnPublicInstance.returnActionList.findIndex(
                (number) => number[0] === positionLogic.positionIndex
              );

            setfoundI(foundIndex);

            

            
            if(returnPublicInstance.returnActionList.length > 0 && foundIndex != -1){
                
                console.log("###",returnPublicInstance.returnActionList);
                
                eraseAction = returnPublicInstance.returnActionList[foundIndex][1][returnPublicInstance.returnActionList[foundIndex][1].length - 1];
                console.log("#||",eraseAction);

                setDynamicPositionList(
                    JSON
                    .parse(positionLogic.positionList)
                    .map((item: any) => [item[0],item[1].map(Player.from),item[2].map(Ballon.from)])
                    );

                    if(dynamicPositionList.length>0){
                        handleReturnPress(eraseAction,foundIndex);
                    }
            }
            

        };
        
    }

      
      const deletePlayer = (currentID: string) => {
        let indexID = dynamicPositionList[positionLogic.positionIndex][1].findIndex((joueur) => joueur.id === currentID);

        if (indexID != -1) {
            const newPositionList = [...dynamicPositionList];
            newPositionList[positionLogic.positionIndex][1].splice(indexID, 1);
            setDynamicPositionList(newPositionList);

            setRestoreDone(true);
            

        }else{
            setwaitingForReset(true);
        }
    };

    const deleteBallon = () => {
        if(dynamicPositionList[positionLogic.positionIndex][2].length > 0){
            const newPositionList = [...dynamicPositionList];
            newPositionList[positionLogic.positionIndex][2].splice(0, 1);
            setDynamicPositionList(newPositionList);

            if(dynamicPositionList === newPositionList){
                setRestoreDone(true);
                //returnPublicInstance.returnActionList[foundI][1].splice((returnPublicInstance.returnActionList[foundI][1].length - 1),1);
            }else{
                setwaitingForReset(true);
            }
        }
        else{
            returnPublicInstance.returnActionList[foundI][1].splice((returnPublicInstance.returnActionList[foundI][1].length - 1),1);
        }
        
    }

    const restorePlayer = (myPlayer: Player) => {
        
        let restoredPlayer = Player.createPlayer(myPlayer.position,myPlayer.id,myPlayer.myArray,myPlayer.svg_player,myPlayer.speed);
        const newPositionList : [number, Player[], Ballon[]][] = dynamicPositionList;
        setDynamicPositionList((prevPos) => {
            

            let i = newPositionList[positionLogic.positionIndex][1].findIndex((j) => j.id === restoredPlayer.id)
            if (newPositionList[positionLogic.positionIndex] && i == -1) {
                newPositionList[positionLogic.positionIndex][1].push(restoredPlayer);
            }


            return newPositionList;
        });


        if(dynamicPositionList === newPositionList){
            
            setRestoreDone(true);
        }
        else{
            
            setwaitingForReset(true);
        }
       
    }

    const restoreBallon = (myBallon: Ballon) => {
        console.log("Bad ballon ?",myBallon);
        let restoredBallon = Ballon.createBallon(myBallon.position,myBallon.svg_ballon,myBallon.idJoueur);
        const newPositionList : [number, Player[], Ballon[]][] = dynamicPositionList;
        setDynamicPositionList((prevPos) => {
            
            //Si il n'y avais pas de ballon (le ballon peut être présent dû à la vitesse de rafraichissement)
            if (newPositionList[positionLogic.positionIndex][2].length < 1 ) {
                newPositionList[positionLogic.positionIndex][2] = [restoredBallon];
            }else{
                newPositionList[positionLogic.positionIndex][2][0] = restoredBallon;
            }

            

            return newPositionList;
        });

        if(dynamicPositionList === newPositionList){
            console.log("--Retour du ballon",dynamicPositionList);
            setRestoreDone(true);
            
        }else{
            setwaitingForReset(true);
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
                    onPress={retrieveReduxPosition}>
                        <Image source={reload}  style={styles.PlayButton}/>
                    </TouchableOpacity>
                </View>
        </View>
    );
};
export default TopWidget;
