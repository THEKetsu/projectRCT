import React, {Dispatch, useState} from "react";
import {Pressable, Text, TextInput, View, TouchableOpacity} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {
    deleteBallon,
    deletePlayer,
    linkToPlayer,
    replacePlayerID,
    selectPlayer,
    setInputPlayerId,
    toggleAutoLink,
} from "../../redux/actions/optionActions";
import {Option, Position, Toolbar} from "../../utils/interfaces";
import styles from "./styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Options({animate, setIsOpen}) {

    const toggleBar = () => {
        setIsOpen((prevState: any) => !prevState);
    };
    const [selectedTeam, setSelectedTeam] = useState<string>("B");
    const [changeId, setChangeId] = useState<string>("");

    const dispatch: Dispatch<any> = useAppDispatch();
    const toolbar: Toolbar = useAppSelector((state) => state.toolbar);
    const position: Position = useAppSelector((state) => state.position);
    const option: Option = useAppSelector((state) => state.option);

    let reminderText = "Se déplacer";

    if (toolbar.ballMode) {
        reminderText = "Ballon mode activé";
    } else if (toolbar.playerMode) {
        reminderText = "Gestion des joueurs";
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
                                        onPress={() => setSelectedTeam('blue')}
                                        style={[
                                            styles.buttonLeft,
                                            selectedTeam === 'B' && styles.selectedButton,
                                        ]}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setSelectedTeam('red')}
                                        style={[
                                            styles.buttonRight,
                                            selectedTeam === 'R' && styles.selectedButton,
                                        ]}
                                    />
                                </View>
                                <Text style={styles.titleTeam}>Poste</Text>
                                <TextInput
                                    placeholder="Enter Player ID [B/R][Number] ex: B6"
                                    value={option.inputPlayerId}
                                    onChangeText={(text) => AddPlayer(text)}
                                    style={styles.input}
                                />
                            </View>
                        )}

                    {toolbar.playerMode && (option.selectedPlayer != '') && (option.selectedPlayer[option.selectedPlayer.length - 1] != 'P')
                        && (
                            <>
                                <TextInput
                                    placeholder="Enter Player ID [B/R][Number] ex: B6"
                                    value={option.inputPlayerId}
                                    onChangeText={(text) => dispatch(setInputPlayerId(text))}

                                />
                                <TextInput
                                    placeholder={option.selectedPlayer.slice(1)}
                                    onChangeText={text => setChangeId(text)}
                                    onSubmitEditing={() => replacePlayerID(`${option.selectedPlayer[0]}${changeId}`, dispatch, position, option)}
                                    style={styles.input}
                                />

                                <Pressable
                                    onPress={() => deletePlayer(dispatch, position, option)}
                                >
                                    <Text>
                                        POUBELLE
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => replacePlayerID(`B${option.selectedPlayer.substring(1)}`, dispatch, position, option)}
                                >
                                    <Text>
                                        BLUE
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => replacePlayerID(`R${option.selectedPlayer.substring(1)}`, dispatch, position, option)}
                                >
                                    <Text>
                                        RED
                                    </Text>
                                </Pressable>
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
                                <TouchableOpacity
                                    onPress={() => linkToPlayer(true, dispatch, position, option)}
                                    style={styles.linkButton}>
                                    <Text>
                                        Link
                                    </Text>
                                </TouchableOpacity>

                                <Text>
                                    {JSON.parse(option.closestPlayer)[0]}
                                </Text>

                                <Pressable
                                    onPress={() => dispatch(toggleAutoLink())}
                                >
                                    <Text>
                                        AutoLink Mode
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => deleteBallon(dispatch, position)}
                                >
                                    <Text>
                                        POUBELLE
                                    </Text>
                                </Pressable>
                            </>
                        )}
                </View>
            </View>
        </View>
    );
}
