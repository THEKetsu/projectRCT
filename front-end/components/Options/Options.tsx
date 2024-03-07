import React, { Dispatch, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View, TouchableOpacity, Image, Picker } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
    deleteBallon,
    deletePlayer,
    linkToPlayer,
    modifySpeed,
    replacePlayerID,
    selectPlayer,
    setInputPlayerId,
    toggleAutoLink,
} from "../../redux/actions/optionActions";
import {Option, Position, Toolbar} from "../../utils/interfaces";
import styles from "./styles";
import link from "../../assets/link.png";
import trash from "../../assets/trash.png";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Options({animate, setIsOpen}) {

    const toggleBar = () => {
        setIsOpen((prevState: any) => !prevState);
    };
    const [selectedTeam, setSelectedTeam] = useState<string>("B");
    const [changeId, setChangeId] = useState<string>("");

    const dispatch: Dispatch<any> = useAppDispatch();
    const [isAutoLinkModeHighlighted, setIsAutoLinkModeHighlighted] = useState(false);
    const [isLinkButtonClicked, setIsLinkButtonClicked] = useState(false);
    const toolbar: Toolbar = useAppSelector((state) => state.toolbar);
    const position: Position = useAppSelector((state) => state.position);
    const option: Option = useAppSelector((state) => state.option);
    const [selectedValue, setSelectedValue] = useState(1)

    let reminderText = "Se déplacer";
    
    if (toolbar.ballMode) {
        reminderText = "Gestion du ballon";
    } else if (toolbar.playerMode) {
        reminderText = "Gestion des joueurs";
    } else if(toolbar.drawMode) {
        reminderText = "Mode Dessin"
    } 
    const AddPlayer = (text: string) => {
        const regex = /^[1-9](?:[0-9])?$/;

        if (text.length === 2 && regex.test(text.substring(1))) {
            dispatch(setInputPlayerId(text));
        } else {
            alert("Please enter a valid player ID");
        }
        dispatch(selectPlayer(`${selectedTeam}${text}`));
        dispatch(setInputPlayerId(""));
    }

    const handleValueChange = (itemValue: number) => {
        setSelectedValue(itemValue);
        modifySpeed(dispatch, position, option,itemValue);
      };
    

    return (
        <View style={styles.optioncontainer}>
            <View style={styles.widgetPage}>
                <TouchableOpacity style={styles.containerRight} onPress={toggleBar}>
                    <MaterialIcons name="chevron-right" style={styles.icon}/>
                </TouchableOpacity>

                <View style={styles.widgetElement}>
                    <View style={styles.textPlacement}>
                        <Text style={styles.reminderText}>{reminderText}</Text>
                    </View>

                    {toolbar.playerMode && ((option.selectedPlayer == '') || (option.selectedPlayer[option.selectedPlayer.length - 1] == 'P'))
                        && (
                            <View style={styles.playerList}>
                                <Text style={styles.titleTeam}>Equipe</Text>
                                <View style={styles.teamButton}>
                                    <TouchableOpacity
                                        onPress={() => setSelectedTeam('B')}
                                        style={[
                                            styles.buttonLeft,
                                            selectedTeam === 'B' && styles.selectedButton,
                                        ]}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setSelectedTeam('R')}
                                        style={[
                                            styles.buttonRight,
                                            selectedTeam === 'R' && styles.selectedButton,
                                        ]}
                                    />
                                </View>
                                <Text style={styles.titleTeam}>Poste</Text>
                                <TextInput
                                    placeholder="Entrez le numéro du joueur"
                                    value={option.inputPlayerId.substring(1)}
                                    onChangeText={(text) => dispatch(setInputPlayerId(selectedTeam+text))}
                                    style={styles.input}
                                />
                            </View>
                        )}

                    {toolbar.playerMode && (option.selectedPlayer != '') && (option.selectedPlayer[option.selectedPlayer.length - 1] != 'P')
                        && (
                            <>
                                {/* <TextInput
                                    placeholder="Enter Player ID [B/R][Number] ex: B6"
                                    value={option.inputPlayerId}
                                    onChangeText={(text) => dispatch(setInputPlayerId(text))}

                                /> */}
                                <View style={styles.playerList}>
                                <View style={styles.teamButton}>
                                <Pressable
                                    onPress={() => replacePlayerID(`B${option.selectedPlayer.substring(1)}`, dispatch, position, option)}
                                    style={[
                                        styles.buttonLeft,
                                        option.selectedPlayer[0] === 'B' && styles.selectedButton,
                                    ]}
                                />
                                

                                <Pressable
                                    onPress={() => replacePlayerID(`R${option.selectedPlayer.substring(1)}`, dispatch, position, option)}
                                    style={[
                                        styles.buttonRight,
                                        option.selectedPlayer[0] === 'R' && styles.selectedButton,
                                    ]}
                                />
        
                                </View>

                                <TextInput
                                    placeholder={option.selectedPlayer.slice(1)}
                                    onChangeText={text => setChangeId(text)}
                                    onSubmitEditing={() => replacePlayerID(`${option.selectedPlayer[0]}${changeId}`, dispatch, position, option)}
                                    style={styles.input}
                                />

                                <Text style={styles.titleTeam}>Vitesse du Joueur</Text>
                                <Picker
                                        selectedValue={selectedValue}
                                        onValueChange={handleValueChange}
                                    >
                                        
                                        <Picker.Item label="1" value={1} />
                                        <Picker.Item label="2" value={2} />
                                        <Picker.Item label="3" value={3} />
                                </Picker>
                                
                                

                                <Pressable
                                    onPress={() => deletePlayer(dispatch, position, option)}
                                >
                                    <Image source={trash} style={styles.linkImageButton}/>
                                </Pressable>
                                </View>

                                
                            </>
                        )
                    }

                    {toolbar.ballMode && (JSON.parse(position.positionList)[position.positionIndex][2].length === 0) && (
                        <View style={styles.missingBall}>
                            <Text style={styles.textStyle}>
                                Posez le ballon sur le terrain
                            </Text>
                        </View>
                    )}

                    {toolbar.ballMode && (JSON.parse(position.positionList)[position.positionIndex][2].length > 0)
                        && (
                            <>
                    <View style={styles.elementW}>
                            <Text >
                                Lier avec un joueur
                            </Text>
                                    <TouchableOpacity onPress={() => { linkToPlayer(true, dispatch, position, option);setIsLinkButtonClicked(true);}}
                                    style={[styles.linkButton, isLinkButtonClicked && styles.clickedButton]}>
                                    <Image source={link} style={styles.linkImageButton}/>
                                </TouchableOpacity>

                                <Text style={styles.closestPlayer}>
                                    Joueur le plus proche :{JSON.parse(option.closestPlayer)[0]}
                                </Text>

                        {/* <TouchableOpacity
                            onPress={() => dispatch(toggleAutoLink())}
                            style={styles.AutoLink}>
                            <Text style={[styles.textSty, isAutoLinkModeHighlighted && styles.highlightedText]} onPress={() => {
                            dispatch(toggleAutoLink());
                            setIsAutoLinkModeHighlighted(!isAutoLinkModeHighlighted);}}>
                                AutoLink Mode
                            </Text>
                        </TouchableOpacity> */}
                        <Pressable
                            onPress={() => deleteBallon(dispatch, position)}
                            style={styles.deleteS}>
                            <Image source={trash} style={styles.linkImageButton}/>
                        </Pressable>
                        </View>
                    </>
                )}    
            </View>
            </View>
        </View>
    );
}
