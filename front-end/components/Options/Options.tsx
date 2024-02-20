import React, {useState} from "react";
import {Pressable, Text, TextInput, useWindowDimensions, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {
    selectPlayer,
    setInputPlayerId,
    setPlayerPaths,
    toggleAutoLink,
    triggerRefresh
} from "../../redux/actions/optionActions";
import Player from "../../classes/Player";
import Ballon from "../../classes/Ballon";
import {isValidString} from "../../utils/functions";
import {setPositionList} from "../../redux/actions/positionActions";
import {Option, PlayerPath, Position, Toolbar} from "../../utils/interfaces";


// @ts-ignore
export default function Options({animate, linkToPlayer}) {

    const [changeId, setChangeId] = useState<string>("")

    const dispatch = useAppDispatch()

    const toolbar: Toolbar = useAppSelector((state) => state.toolbar)
    const position: Position = useAppSelector((state) => state.position)
    const option: Option = useAppSelector((state) => state.option)

    const replacePlayerID = (text: string): void => {
        if (isValidString(text)) {
            const buffPositionList = JSON.parse(position.positionList)
            let indexID: number = buffPositionList[position.positionIndex][1].findIndex((joueur: Player): boolean => joueur.id === option.selectedPlayer);

            if (indexID != -1) {
                if (buffPositionList[position.positionIndex][2].length > 0) {
                    if (buffPositionList[position.positionIndex][2][0].idJoueur === buffPositionList[position.positionIndex][1][indexID].id) {
                        buffPositionList[position.positionIndex][2][0].idJoueur = text
                        dispatch(setPositionList(JSON.stringify(buffPositionList)))
                    }
                }
                let indexPath = JSON.parse(option.playerPaths).findIndex((p: PlayerPath): boolean => p.id === buffPositionList[position.positionIndex][1][indexID].id + 'P');

                if (indexPath != -1) {
                    dispatch(setPlayerPaths(
                        JSON.stringify(
                            JSON.parse(option.playerPaths).splice(indexPath, 1)
                        )
                    ))
                }
                buffPositionList[position.positionIndex][1][indexID].idJoueur = text

                dispatch(setPositionList(
                    JSON.stringify(
                        buffPositionList
                    )
                ))
                dispatch(selectPlayer(text))
                dispatch(triggerRefresh());
            }
        }
    }

    const deletePlayer = () => {
        let indexID: number = JSON.parse(position.positionList)[position.positionIndex][1].findIndex((joueur: Player): boolean => joueur.id === option.selectedPlayer);

        if (indexID != -1) {
            let newPositionList: [number, Player[], Ballon[]][] = [...JSON.parse(position.positionList)];
            let indexPathID: number = JSON.parse(option.playerPaths).findIndex((p: PlayerPath): boolean => p.id === option.selectedPlayer + 'P');

            newPositionList[position.positionIndex][1].splice(indexID, 1);

            dispatch(setPositionList(JSON.stringify(newPositionList)))

            dispatch(selectPlayer(""))

            if (indexPathID != -1) {
                const newPlayerPath: PlayerPath[] = [...JSON.parse(option.playerPaths)];

                newPlayerPath.splice(indexPathID, 1);
                
                dispatch(setPlayerPaths(JSON.stringify(newPlayerPath)))
            }
            dispatch(triggerRefresh());
        }
    }

    const deleteBallon = () => {
        const newPositionList = [...JSON.parse(position.positionList)];
        newPositionList[position.positionIndex][2].splice(0, 1);

        dispatch(setPositionList(JSON.stringify(newPositionList)))
        dispatch(triggerRefresh());
    }

    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "#D9D9D9",
                height: "100%",
                width: useWindowDimensions().width / 4,
                justifyContent: "center",
                alignItems: "center",
                padding: 10
            }}
        >
            <Pressable
                onPress={() => animate()}
                style={({pressed}: { pressed: any }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(65, 105, 225)',
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 10
                    },
                ]}
            >
                <Text>
                    Animate
                </Text>
            </Pressable>

            {toolbar.playerMode && ((option.selectedPlayer == '') || (option.selectedPlayer[option.selectedPlayer.length - 1] == 'P'))
                && (
                    <TextInput
                        placeholder="Enter Player ID [B/R][Number] ex: B6"
                        value={option.inputPlayerId}
                        onChangeText={(text) => dispatch(setInputPlayerId(text))}
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            marginBottom: 10,
                            paddingLeft: 10,
                        }}
                    />
                )}

            {toolbar.playerMode && (option.selectedPlayer != '') && (option.selectedPlayer[option.selectedPlayer.length - 1] != 'P')
                && (
                    <>
                        <TextInput
                            placeholder="Enter Player ID [B/R][Number] ex: B6"
                            value={option.inputPlayerId}
                            onChangeText={(text) => dispatch(setInputPlayerId(text))}
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                                paddingLeft: 10,
                            }}
                        />

                        <TextInput
                            placeholder={option.selectedPlayer.slice(1)}
                            onChangeText={text => setChangeId(text)}
                            onSubmitEditing={() => replacePlayerID(`${option.selectedPlayer[0]}${changeId}`)}
                            style={{
                                height: 40,
                                borderColor: 'gray',
                                borderWidth: 1,
                                marginBottom: 10,
                                paddingLeft: 10,
                            }}
                        />

                        <Pressable
                            onPress={() => deletePlayer()}
                            style={({pressed}: { pressed: any }) => [
                                {
                                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(65, 105, 225)',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10
                                },
                            ]}
                        >
                            <Text>
                                POUBELLE
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => replacePlayerID(`B${option.selectedPlayer.substring(1)}`)}
                            style={({pressed}: { pressed: any }) => [
                                {
                                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(65, 105, 225)',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10
                                },
                            ]}
                        >
                            <Text>
                                BLUE
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => replacePlayerID(`R${option.selectedPlayer.substring(1)}`)}
                            style={({pressed}: { pressed: any }) => [
                                {
                                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(65, 105, 225)',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10
                                },
                            ]}
                        >
                            <Text>
                                RED
                            </Text>
                        </Pressable>
                    </>
                )
            }

            {toolbar.ballMode && (JSON.parse(position.positionList)[position.positionIndex][2].length == 0)
                && (
                    <>
                        <Text>
                            Posez le ballon sur le terrain
                        </Text>

                        <Pressable
                            onPress={() => linkToPlayer(true)}
                            style={({pressed}: { pressed: any }) => [
                                {
                                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(65, 105, 225)',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10
                                },
                            ]}
                        >
                            <Text>
                                Link
                            </Text>
                        </Pressable>

                        <Text>
                            {JSON.parse(option.closestPlayer)[0]}
                        </Text>

                        <Pressable
                            onPress={() => dispatch(toggleAutoLink())}
                            style={({pressed}: { pressed: any }) => [
                                {
                                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(65, 105, 225)',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10
                                },
                            ]}
                        >
                            <Text>
                                AutoLink Mode
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => deleteBallon()}
                            style={({pressed}: { pressed: any }) => [
                                {
                                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'rgb(65, 105, 225)',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10
                                },
                            ]}
                        >
                            <Text>
                                POUBELLE
                            </Text>
                        </Pressable>
                    </>
                )}
        </View>
    )
}