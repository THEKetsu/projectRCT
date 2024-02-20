import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions,ScrollView, Animated, Image, Fragment} from 'react-native';
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
      duration: 100, // Durée de l'animation en millisecondes
      useNativeDriver: false, // Utilisation du moteur natif pour l'animation
    }).start(); // Lancement de l'animation

    // Inversion de l'état 'collapsed' pour refléter le nouvel état de la barre
    setCollapsed(!collapsed);
  };

  // Création d'une interpolation pour ajuster la hauteur de la barre
  const barHeight = animation.interpolate({
    inputRange: [0, 1], // Plage des valeurs à interpréter
    outputRange: [0, (dimHeight *28) / 100], // Hauteur initiale et finale de la barre
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
    const handleCreateNewPosition = () => {
        const newPosition = numberOfPosition.length + 1;
        setNumberOfPosition(prevPositions => [...prevPositions, newPosition]);
    };

    return (
        <View style={[styles.bottomBarContainer, !collapsed ? styles.bottomBarContainer_false_collapsed : styles.bottomBarContainer_true_collapsed]}>
            <View style={[styles.retract_and_position, !collapsed ? styles.retract_and_position_false_collapsed : styles.retract_and_position_true_collapsed]}>
            
            {/* bouton pour retracter la bottom bar */}
            <TouchableOpacity onPress={toggleBar} style={styles.retractable}>
    
            { collapsed && (<MaterialIcons style={styles.chevronIcon}
                name={"keyboard-arrow-down"}
                size={(dimWidth *2) / 100}
                color={"black"}
            /> )}
            { !collapsed && (<MaterialIcons style={styles.chevronIcon}
                name={"keyboard-arrow-up"}
                size={(dimWidth *2) / 100}
                color={"black"}
            /> )}

        </TouchableOpacity>
        {/* scrollbar des positions */}
        <View style={styles.poseContainer}>
            {/* <View> */}
            <View style={styles.positionContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
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
                </ScrollView>
            </View>
            </View>
            </View>
        <Animated.View style={[styles.container, { height: barHeight }]}>

            <View style={styles.buttonContainer}>

            <TouchableOpacity onPress={handleClickAdd} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                {/* Mode ZOOM */}
                <Ionicons
                                    name={"shirt-sharp"}
                                    size={(dimWidth *4) / 100}
                                    color={"black"}
                                />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClickZoom} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                {/* Add Player */}
                <FontAwesome
                                    name={"arrows"}
                                    size={(dimWidth *4) / 100}
                                    color={"black"}
                                />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleCLickBallMode} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                {/* Mode Ballon */}
                <MaterialIcons
                                    name={"sports-rugby"}
                                    size={(dimWidth *4) / 100}
                                    color={"black"}
                                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClickDrawMode} style={[styles.buttonBase, !collapsed && {display: 'none'}]}>
                {/* Mode crayon */}
                <FontAwesome
                                    name={"pencil"}
                                    size={(dimWidth *4) / 100}
                                    color={"black"}
                                />
            </TouchableOpacity>
            </View>
        </Animated.View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    bottomBarContainer: {
        flex: 1,
        flexDirection: "column"
    },
    bottomBarContainer_false_collapsed:{
        flexGrow: 0, // Empêche l'expansion du conteneur
        alignSelf: 'flex-start',
        

    },
    bottomBarContainer_true_collapsed:{

    },
    container: {
        height: dimHeight / 4,
        width: dimWidth,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    retract_and_position:{
        

    },
    retract_and_position_false_collapsed:{
        position: 'absolute',
        bottom: 0
    },
    retract_and_position_true_collapsed:{


    },
    poseContainer: {
        flex: 1,
        flexDirection: 'column',
       
       
    },
    positionContainer: {
        height: (dimHeight *5) / 100,
        width: windowWidth,
        backgroundColor: '#D9D9D9',
        // justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
        // borderRadius: 15,
        position: 'relative',
        
        // top: '-45%',
    },
    buttonBase: {
        height: (dimHeight *5) / 100,
        width: (dimWidth *5) / 100,
        backgroundColor: 'transparent',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        
    },
    buttonContainer: {
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%"
    },
    retractable: {
        position: "absolute",
        // top: "-10%",
        top: -((dimHeight *3) / 100),
        backgroundColor: "#D9D9D9",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginLeft: "45%",
        width: (dimWidth *10) / 100,
        height: (dimHeight *10) / 100,
        justifyContent:"center",
        alignItems:"center",
        // zIndex: 5,
        borderTopWidth: 1, // Épaisseur de la bordure du haut
        borderTopColor: 'black', // Couleur de la bordure du haut

    },
    chevronIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"

    
    },
    buttonPos: {
        height: (dimHeight *5) / 100,
        width: (dimWidth *5) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderTopRightRadius: 10,
        borderRightWidth: 2,
        borderColor: 'lightgrey',
        backgroundColor: 'white', // Bouton de position en blanc
    },
    plusSign: {
        height: (dimHeight *5) / 100,
        width: (dimWidth *5) / 100,
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
    
});
