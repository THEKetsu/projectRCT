import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Image} from 'react-native';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
    handleClickDrawMode: () => void;
  }

  
export default function Position({
    sendDataToB,
    receivedData,
    receivedPosition,
    sendSavedData,
    handleClickZoom,
    handleClickAdd,
    handleCLickBallMode,
    handleClickDrawMode
  }: PositionProps) {
    const [numberOfPosition, setNumberOfPosition] = useState<number[]>([1, 2]);
    const [collapsed, setCollapsed] = useState(false); // État pour suivre l'état de la barre (repliée ou non)
  const [animation] = useState(new Animated.Value(0)); // Utilisation d'Animated pour gérer l'animation
  const toggleBar = () => {
    // Détermination de la valeur cible pour l'animation en fonction de l'état actuel
    const toValue = collapsed ? 0 : 1; // 1 représente la valeur déployée (non rétrécie)
    
    // Configuration de l'animation utilisant Animated.timing
    Animated.timing(animation, {
      toValue, // La valeur cible déterminée ci-dessus
      duration: 300, // Durée de l'animation en millisecondes
      useNativeDriver: false, // Utilisation du moteur natif pour l'animation
    }).start(); // Lancement de l'animation

    // Inversion de l'état 'collapsed' pour refléter le nouvel état de la barre
    setCollapsed(!collapsed);
  };

  // Création d'une interpolation pour ajuster la hauteur de la barre
  const barHeight = animation.interpolate({
    inputRange: [0, 1], // Plage des valeurs à interpréter
    outputRange: ['2.5%', '25%'], // Hauteur initiale et finale de la barre
  });
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
        <Animated.View style={[styles.container, { height: barHeight }]}>
            <TouchableOpacity onPress={toggleBar} style={styles.retractable}>
    
            { collapsed && (<MaterialIcons style={styles.chevronIcon}
                name={"keyboard-arrow-down"}
                size={200}
                color={"black"}
            /> )}
            { !collapsed && (<MaterialIcons style={styles.chevronIcon}
                name={"keyboard-arrow-up"}
                size={200}
                color={"black"}
            /> )}

            </TouchableOpacity>
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
            <View style={styles.buttonContainer}>

            <TouchableOpacity onPress={handleClickAdd} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                {/* Mode ZOOM */}
                <Ionicons
                                    name={"shirt-sharp"}
                                    size={200}
                                    color={"black"}
                                />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClickZoom} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                {/* Add Player */}
                <FontAwesome
                                    name={"arrows"}
                                    size={200}
                                    color={"black"}
                                />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleCLickBallMode} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                {/* Mode Ballon */}
                <MaterialIcons
                                    name={"sports-rugby"}
                                    size={200}
                                    color={"black"}
                                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClickDrawMode} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                {/* Mode crayon */}
                <FontAwesome
                                    name={"pencil"}
                                    size={200}
                                    color={"black"}
                                />
            </TouchableOpacity>
            </View>
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
        overflow:"hidden"
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
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%"
    },
    retractable: {
        position: "absolute",
        top:"-10%",
        backgroundColor: "red",
        borderRadius: 25,
        width: "10%",
        justifyContent:"center",
        alignItems:"center",
        zIndex: 5

    },
    chevronIcon: {
    
    }

})