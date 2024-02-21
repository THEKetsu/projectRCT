import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView} from 'react-native';
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
    const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

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
        setSelectedPosition(item);
        sendDataToB(item);

        if (receivedPosition[0][0] != 0) {
            console.log("Position reçu", receivedPosition)
            sendSavedData(receivedPosition);
        }
    };

    const handleCreateNewPosition = () => {
        const newPosition = Math.max(...numberOfPosition) + 1;
        setNumberOfPosition(prevPositions => [...prevPositions, newPosition]);
    };

    const handleDeletePosition = () => {
        if (selectedPosition !== null) {
            setNumberOfPosition(prevPositions => prevPositions.filter(position => position !== selectedPosition));
            setSelectedPosition(null); // Reset selected position
        }
    };

    return (
<View style={styles.container}>
    <View style={styles.positionContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: "row"}}>
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
                    {/* New "Plus" button */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleCreateNewPosition}
                        style={styles.plusSign}
                    >
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                {/* Unique "Delete" button */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleDeletePosition}
                    style={styles.deleteSign}
                >
                    <Text style={{color: 'white'}}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>

            <View style={styles.buttonBaseContainer}>
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
        </View>
    );
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    positionContainer: {
        height: windowHeight / 4,
        width: windowWidth,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        position: 'relative',
        top: '-45%',
    },
    buttonPos: {
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderTopRightRadius: 10,
        borderRightWidth: 2,
        borderColor: 'lightgrey',
        backgroundColor: 'white', // Bouton de position en blanc
    },


    deleteSign: {
        height: 30,
        width: 100,
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
        height: 30,
        width: 100,
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
    buttonBase: {
        color: 'white', // Texte blanc pour le bouton de base
    }
});