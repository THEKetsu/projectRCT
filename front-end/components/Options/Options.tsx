import React from "react";
import {Pressable, Text, TextInput, useWindowDimensions, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {Toolbar} from "../../redux/slices/toolbarSlice";
import {Option} from "../../redux/slices/optionSlice";
import {Position} from "../../redux/slices/positionSlice";


export default function Options() {

    const dispatch = useAppDispatch()
    
    const toolbar: Toolbar = useAppSelector((state) => state.toolbar)
    const position: Position = useAppSelector((state) => state.position)
    const option: Option = useAppSelector((state) => state.option)

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

            {toolbar.playerMode && (option.selectedPlayer != '') && (option.selectedPlayer[option.selectedPlayer.length - 1] != 'P')
                && (
                    <>
                        <TextInput
                            placeholder="Enter Player ID [B/R][Number] ex: B6"
                            value={playerId}
                            onChangeText={text => setPlayerId(text)}
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
                            onChangeText={text => setchangeID(text)}
                            onSubmitEditing={() => replacePlayerID(`${option.selectedPlayer[0]}${changeID}`)}
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
                            {closestPlayer[0]}
                        </Text>

                        <Pressable
                            onPress={() => autoLinkOnOff()}
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