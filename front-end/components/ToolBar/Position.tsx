import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';
import {useAppSelector} from "../../hooks/reduxHooks";
import {RootState} from "../../redux/store";

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

interface PositionProps {
    sendDataToB: React.Dispatch<React.SetStateAction<number>>;
    handleClickZoom: () => void;
    handleClickAdd: () => void;
    handleCLickBallMode: () => void;
  }

export default function Position({
    sendDataToB,
    handleClickZoom,
    handleClickAdd,
    handleCLickBallMode
  }: PositionProps) {
    const [numberOfPosition, setNumberOfPosition] = useState<number[]>([1, 2]);
    const toolbar = useAppSelector((state: RootState) => state.toolbar)

    useEffect(() => {

        let different = true;
        numberOfPosition.map((i) => {
            if (toolbar.positionList.some((item : [number, Player[], Ballon[]]) => item[0] === i)) {
                different = false;
            }
        })
        if (toolbar.positionList[0][0] != 0 && different) {
            setNumberOfPosition(toolbar.positionList.map((item : [number, Player[], Ballon[]]) => item[0]));
        }
    }, [toolbar.positionList[0][0]]);

    const handlePress = (item: number) => {
        sendDataToB(item);

        if (toolbar.positionList[0][0] != 0) {
            console.log("Position reçu", toolbar.positionList)
        }
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", position: "absolute", alignSelf: "flex-start", top: 0, left: 0}}>
                {numberOfPosition.map((item, index) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={index}
                        onPress={() => handlePress(item)}
                        style={styles.buttonPos}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity onPress={handleClickZoom} style={styles.buttonBase}>
                <Text>Mode ZOOM</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClickAdd} style={styles.buttonBase}>
                <Text>Add Player</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleCLickBallMode} style={styles.buttonBase}>
                <Text>Mode Ballon</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: dimHeight / 4,
        width: dimWidth,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
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
        height: 30,
        width: 100,
        backgroundColor: "#959595",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
    }

})