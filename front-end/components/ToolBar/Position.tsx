import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

interface PositionProps {
    sendDataToB: React.Dispatch<React.SetStateAction<number>>;
    receivedData: number;
    receivedPosition: [number, Player[], Ballon[]][];
    sendSavedData: React.Dispatch<React.SetStateAction<[number, Player[], Ballon[]][]>>;
    handleClickZoom: () => void;
    handleClickAdd: () => void;
    handleCLickBallMode: () => void;
  }

export default function Position({
    sendDataToB,
    receivedData,
    receivedPosition,
    sendSavedData,
    handleClickZoom,
    handleClickAdd,
    handleCLickBallMode
  }: PositionProps) {
    const [numberOfPosition, setNumberOfPosition] = useState<number[]>([1, 2]);

    useEffect(() => {
        console.log(receivedData);

        let different = true;
        numberOfPosition.map((i) => {
            if (i == receivedData) {
                different = false;
            }
        })
        if (receivedData != 0 && different) {
            setNumberOfPosition(prevPositions => [...prevPositions, receivedData]);
        }
    }, [receivedData]);

    const handlePress = (item: number) => {
        sendDataToB(item);

        if (receivedPosition[0][0] != 0) {
            console.log("Position reçu", receivedPosition)
            sendSavedData(receivedPosition);
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