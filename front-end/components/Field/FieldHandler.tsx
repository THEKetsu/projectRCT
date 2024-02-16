import {StatusBar} from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import {
    StyleSheet, View, Dimensions
} from 'react-native';
import {Field} from './Field';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Position from '../ToolBar/Position';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

export default function FieldHandler() {
    //On ne peut pas donner de liste vide pour init alors on le remplit de valeur inutile, qui ne seront même pas utilisé :/
    let stupidPlayer = Player.createPlayer([0, 0], "0B", [], [], 1);
    let stupidBallon = Ballon.createBallon([0,0],[],"");

    const [buttonZoom, setButtonZoom] = useState(true);
    const [buttonADDPlayer, setButtonValueAdd] = useState(false);
    const [buttonBallMode, setballMode] = useState(false);
    const [buttonDrawMode, setdrawMode] = useState(false);
    const [dataFromA, setDataFromA] = useState(0);
    const [dataForPosition, setDataForPosition] = useState(0);
    const [dataForSave, setDataForSave] = useState<[number, Player[], Ballon[]][]>([[0, [stupidPlayer],[stupidBallon]]]);
    const [dataForReturn, setDataForReturn] = useState<[number, Player[], Ballon[]][]>([[0, [stupidPlayer],[stupidBallon]]]);

    const handleClickZoom = () => {
        if (buttonZoom) {
            setButtonValueAdd(false);
            setButtonZoom(false);
            setballMode(false);
        } else {
            setButtonValueAdd(false);
            setButtonZoom(true);
            setballMode(false);
        }
    };
    const handleClickDraw = () => {
        if (buttonDrawMode) {
            setButtonValueAdd(false);
            setButtonZoom(false);
            setballMode(false);
            setdrawMode(false);
        } else {
            setButtonValueAdd(false);
            setButtonZoom(false);
            setballMode(false);
            setdrawMode(true);
        }
    };

    const handleClickAdd = () => {
        if (buttonADDPlayer) {
            setButtonZoom(false);
            setButtonValueAdd(false);
            setballMode(false);
        } else {
            setButtonZoom(false);
            setButtonValueAdd(true);
            setballMode(false);
        }
    };

    const handleClickBallMode = () => {
        if (buttonBallMode) {
            setButtonZoom(false);
            setButtonValueAdd(false);
            setballMode(false);
        } else {
            setButtonZoom(false);
            setButtonValueAdd(false);
            setballMode(true);
        }
    };

    return (
        <View style={styles.container}>
            <GestureHandlerRootView style={{flex: 1}}>
                <Field
                    buttonValue={buttonZoom}
                    buttonADDPlayer={buttonADDPlayer}
                    buttonBallMode={buttonBallMode}
                    buttonDrawMode={buttonDrawMode}
                    sendDataToA={dataFromA}
                    sendNewsToPosition={setDataForPosition}
                    sendSaveOfPosition={setDataForSave}
                    receiveSavedPosition={dataForReturn}
                />
                <Position
                    sendDataToB={setDataFromA}
                    receivedData={dataForPosition}
                    receivedPosition={dataForSave}
                    sendSavedData={setDataForReturn}
                    handleClickZoom={handleClickZoom}
                    handleClickAdd={handleClickAdd}
                    handleCLickBallMode={handleClickBallMode}
                    handleClickDrawMode={handleClickDraw}
                />
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5FB07B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        position: 'absolute',
        top: dimHeight * 0.88,
        left: dimWidth * 0.45,
        marginTop: 20,
    },
    button2: {
        position: 'absolute',
        top: 0,
        left: dimWidth * 0.1,
        marginTop: 20,
    }
});