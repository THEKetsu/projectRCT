import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions, Animated} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setPositionIndex, setPositionList} from "../../redux/actions/positionLogicActions";
import {
    selectBallMode,
    selectDrawMode,
    selectPlayerMode,
    selectZoomMode
} from "../../redux/actions/toolbarLogicActions";

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

export default function Position() {
    const [numberOfPosition, setNumberOfPosition] = useState<number[]>([0, 1]);
    const [collapsed, setCollapsed] = useState(false); // État pour suivre l'état de la barre (repliée ou non)
    const [animation] = useState(new Animated.Value(0)); // Utilisation d'Animated pour gérer l'animation

    const dispatch = useAppDispatch()
    const positionLogic = useAppSelector((state) => state.positionLogic)
    
    const toggleBar = () => {
        const toValue = collapsed ? 0 : 1;

        Animated.timing(animation, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();

        setCollapsed(!collapsed);
    };

    const barHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['2.5%', '25%'],
    });

    useEffect(() => {
        let different = true;

        numberOfPosition.map((i) => {
            if (i == positionLogic.positionIndex) {
                different = false;
            }
        })

        if (positionLogic.positionIndex != 0 && different) {
            setNumberOfPosition(prevPositions => [...prevPositions, positionLogic.positionIndex]);
        }
    }, [positionLogic.positionIndex]);

    const handlePress = (item: number) => {
        dispatch(setPositionIndex(item))

        if (positionLogic.positionList != "[]" && JSON.parse(positionLogic.positionList)[0][0] != 0) {
            dispatch(setPositionList(positionLogic.positionList))
        }
    };

    return (
        <Animated.View style={[styles.container, {height: barHeight}]}>
            <TouchableOpacity onPress={toggleBar} style={styles.retractable}>
                {collapsed && (
                    <MaterialIcons
                        style={styles.chevronIcon}
                        name={"keyboard-arrow-down"}
                        size={'200%'}
                        color={"black"}
                    />
                )}
                {!collapsed && (
                    <MaterialIcons
                        style={styles.chevronIcon}
                        name={"keyboard-arrow-up"}
                        size={'200%'}
                        color={"black"}
                    />
                )}
            </TouchableOpacity>

            <Animated.View
                style={{flexDirection: "row", position: "absolute", alignSelf: "flex-start", top: 0, left: 0}}>
                {numberOfPosition.map((item, index) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={index}
                        onPress={() => handlePress(item)}
                        style={styles.buttonPos}
                    >
                        <Text>{item + 1}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>

            <Animated.View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => dispatch(selectPlayerMode())}
                    style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                >
                    <Ionicons
                        name={"shirt-sharp"}
                        size={'200%'}
                        color={"black"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => dispatch(selectZoomMode())}
                    style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                >
                    <FontAwesome
                        name={"arrows"}
                        size={'200%'}
                        color={"black"}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => dispatch(selectBallMode())}
                    style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                >
                    {/* Mode Ballon */}
                    <MaterialIcons
                        name={"sports-rugby"}
                        size={'200%'}
                        color={"black"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => dispatch(selectDrawMode())}
                    style={[styles.buttonBase, !collapsed && {display: 'none'}]}
                >
                    {/* Mode crayon */}
                    <FontAwesome
                        name={"pencil"}
                        size={'200%'}
                        color={"black"}
                    />
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: dimHeight / 4,
        width: dimWidth,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden"
    },
    buttonPos: {
        height: 20,
        width: 100,
        backgroundColor: "green",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonBase: {
        height: 60,
        width: 60,
        backgroundColor: 'transparent',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%"
    },
    retractable: {
        position: "absolute",
        top: "-5%",
        backgroundColor: "#D9D9D9",
        borderRadius: 25,
        width: "10%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1

    },
    chevronIcon: {}

})