import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions, Animated, View, ScrollView} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setPositionIndex, setPositionList} from "../../redux/actions/positionActions";
import {
    selectBallMode,
    selectDrawMode,
    selectPlayerMode,
    selectZoomMode
} from "../../redux/actions/toolbarActions";
import {triggerRefresh} from "../../redux/actions/optionActions";
import {Position, Toolbar} from "../../utils/interfaces";
import {parsePositionList} from "../../utils/functions";

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

export default function ToolBar() {
    const [positionIndexList, setPositionIndexList] = useState<number[]>([0, 1]);
    const [collapsed, setCollapsed] = useState(false)
    const [animation] = useState(new Animated.Value(0))
    const [selectedPosition, setSelectedPosition] = useState<number>(0)

    const dispatch = useAppDispatch()
    const position: Position = useAppSelector((state) => state.position)
    const toolbar: Toolbar = useAppSelector((state) => state.toolbar)

    const toggleBar = (): void => {
        const toValue: 0 | 1 = collapsed ? 0 : 1;

        Animated.timing(animation, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setCollapsed(!collapsed);
    };

    const barHeight = animation.interpolate({
        inputRange: [0, 1], // Plage des valeurs à interpréter
        outputRange: [0, (dimHeight * 27.9) / 100], // Hauteur initiale et finale de la barre 28 valeur de base
    });

    useEffect((): void => {
        setSelectedPosition(position.positionIndex)
        if (position.positionIndex != 0 && !positionIndexList.some((item) => item === position.positionIndex)) {
            setPositionIndexList((prevPositions: number[]) => [...prevPositions, position.positionIndex]);
        }
    }, [position.positionIndex])

    const handlePress = (item: number) => {
        setSelectedPosition(item)
        dispatch(setPositionIndex(item))

        console.log("handlePress", item)
    }

    const handleCreateNewPosition = () => {
        let buffPL = parsePositionList(position.positionList)

        buffPL.push([positionIndexList.length + 1, buffPL[positionIndexList.length-1][1], buffPL[positionIndexList.length-1][2]])

        dispatch(setPositionList(JSON.stringify(buffPL)))

        setPositionIndexList([...positionIndexList, positionIndexList.length])

        setSelectedPosition(positionIndexList.length)

        dispatch(setPositionIndex(positionIndexList.length))

        console.log("handleCreateNewPosition", positionIndexList.length)
    }

    const handleDeletePosition = () => {
        if (selectedPosition > 0) {
            setPositionIndexList((prevPositions) => {
                return prevPositions.filter((position) => position !== selectedPosition)
            })
            let buffPL = parsePositionList(position.positionList)
            buffPL.splice(selectedPosition, 1)
            setSelectedPosition(position.positionIndex - 1)
            dispatch(setPositionIndex(position.positionIndex - 1))
            dispatch(setPositionList(JSON.stringify(buffPL)))
        } else {
            dispatch(setPositionList(JSON.stringify([[1, [], []]])))
            triggerRefresh()
        }

        console.log("handleDeletePosition", position.positionIndex)
    }

    return (
        <View
            style={[styles.bottomBarContainer, !collapsed ? styles.bottomBarContainer_false_collapsed : styles.bottomBarContainer_true_collapsed]}>
            <View
                style={[styles.retract_and_position, !collapsed ? styles.retract_and_position_false_collapsed : styles.retract_and_position_true_collapsed]}>
                <TouchableOpacity onPress={toggleBar} style={styles.retractable}>
                    {collapsed && (
                        <MaterialIcons
                            style={styles.chevronIcon}
                            name={"keyboard-arrow-down"}
                            size={(dimWidth * 2) / 100}
                            color={"black"}
                        />
                    )}
                    {!collapsed && (
                        <MaterialIcons
                            style={styles.chevronIcon}
                            name={"keyboard-arrow-up"}
                            size={(dimWidth * 2) / 100}
                            color={"black"}
                        />
                    )}
                </TouchableOpacity>
                <View style={styles.poseContainer}>
                    <View style={styles.positionContainer}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                            <View style={{flexDirection: "row"}}>
                                {positionIndexList.map((item, index) => (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        key={index}
                                        onPress={() => handlePress(item)}
                                        style={[styles.buttonPos, index === selectedPosition ? {
                                            borderWidth: 2,
                                            borderColor: 'red'
                                        } : null]}
                                    >
                                        <Text>{item+1}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={handleCreateNewPosition}
                                    style={styles.plusSign}
                                >
                                    <Text>+</Text>
                                </TouchableOpacity>

                                {selectedPosition === positionIndexList.length - 1 && (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={handleDeletePosition}
                                        style={styles.deleteSign}
                                    >
                                        <Text style={{color: 'white'}}>🗑️</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>

            <Animated.View style={[styles.container, {height: barHeight}]}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => dispatch(selectPlayerMode())}
                        style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                    >
                        <Ionicons
                            name={"shirt-sharp"}
                            size={(dimWidth * 4) / 100}
                            color={toolbar.playerMode ? "red" : "black"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => dispatch(selectZoomMode())}
                        style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                    >
                        <FontAwesome
                            name={"arrows"}
                            size={(dimWidth * 4) / 100}
                            color={toolbar.zoomMode ? "red" : "black"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => dispatch(selectBallMode())}
                        style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                    >
                        <MaterialIcons
                            name={"sports-rugby"}
                            size={(dimWidth * 4) / 100}
                            color={toolbar.ballMode ? "orange" : "black"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(selectDrawMode())
                            dispatch(triggerRefresh())
                        }}
                        style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                    >
                        <FontAwesome
                            name={"pencil"}
                            size={(dimWidth * 4) / 100}
                            color={toolbar.drawMode ? "red" : "black"}
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    bottomBarContainer: {
        flex: 1,
        flexDirection: "column"
    },
    bottomBarContainer_false_collapsed: {
        flexGrow: 0,
        alignSelf: 'flex-start',
    },
    bottomBarContainer_true_collapsed: {},
    container: {
        height: dimHeight / 4,
        width: dimWidth,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    retract_and_position: {},
    retract_and_position_false_collapsed: {
        position: 'absolute',
        bottom: 0
    },
    retract_and_position_true_collapsed: {},
    poseContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    positionContainer: {
        height: (dimHeight * 5) / 100,
        width: windowWidth,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        position: 'relative',
    },
    buttonBase: {
        height: (dimHeight * 5) / 100,
        width: (dimWidth * 5) / 100,
        backgroundColor: 'transparent',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%"
    },
    retractable: {
        position: "absolute",
        // top: "-10%",
        top: -((dimHeight * 3) / 100),
        backgroundColor: "#D9D9D9",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginLeft: "45%",
        width: (dimWidth * 10) / 100,
        height: (dimHeight * 7.5) / 100,
        justifyContent: "center",
        alignItems: "center",
        // zIndex: 5,
        borderTopWidth: 1, // Épaisseur de la bordure du haut
        borderTopColor: 'black', // Couleur de la bordure du haut

    },
    chevronIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"


    },
    buttonPos: {
        height: (dimHeight * 5) / 100,
        width: (dimWidth * 5) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderTopRightRadius: 10,
        borderRightWidth: 2,
        borderColor: 'lightgrey',
        backgroundColor: 'white', // Bouton de position en blanc
    },
    deleteSign: {
        height: (dimHeight * 5) / 100,
        width: (dimWidth * 5) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderTopRightRadius: 10,
        borderRightWidth: 2,
        borderColor: 'lightgrey',
        color: 'red', // Couleur grise pour le bouton "plus"
        backgroundColor: '#A60000',
    },
    plusSign: {
        height: (dimHeight * 5) / 100,
        width: (dimWidth * 5) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderTopRightRadius: 10,
        borderRightWidth: 2,
        borderColor: 'lightgrey',
        color: 'lightgrey', // Couleur grise pour le bouton "plus"
        backgroundColor: 'lightgrey',
    },
    buttonBaseContainer: {
        backgroundColor: 'lightgrey', // Fond gris pour le bouton de base
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activebutton: {
        width: (dimHeight * 10) / 100, // Largeur du bouton
        height: (dimWidth * 5) / 100, // Hauteur du bouton
        borderRadius: 50, // Moitié de la largeur/hauteur pour obtenir une forme de cercle
        backgroundColor: 'white', // Couleur de fond du bouton
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});