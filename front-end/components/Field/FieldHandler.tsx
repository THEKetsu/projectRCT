import {StatusBar} from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import {
    StyleSheet, Text, View, Dimensions, PanResponder, Pressable, TouchableOpacity,
    TextStyle, StyleProp, TouchableWithoutFeedback, Image
} from 'react-native';

import {Video} from 'expo-av';

import ViewShot from 'react-native-view-shot';
import ImageSequence from 'react-native-image-sequence';
import {Field} from './Field';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Position from '../ToolBar/Position';
import Player from '../../classes/Player';
import Ballon from '../../classes/Ballon';

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

export default function FieldHandler() {
    const [buttonZoom, setButtonZoom] = useState(true);
    const [buttonADDPlayer, setButtonValueAdd] = useState(false);
    const [buttonBallMode, setballMode] = useState(false);
    const [dataFromA, setDataFromA] = useState(0);

    const handleClickZoom = () => {
        setButtonValueAdd(false);
        setButtonZoom(true);
        setballMode(false);
    };

    const handleClickAdd = () => {
        setButtonZoom(false);
        setButtonValueAdd(true);
        setballMode(false);
    };

    const handleClickBallMode = () => {
        setButtonZoom(false);
        setButtonValueAdd(false);
        setballMode(true);
        
    };

    return (
        <View style={styles.container}>
            <GestureHandlerRootView style={{flex: 1}}>
                <Field
                    buttonValue={buttonZoom}
                    buttonADDPlayer={buttonADDPlayer}
                    buttonBallMode={buttonBallMode}
                    sendDataToA={dataFromA}
                />
                <Position
                    sendDataToB={setDataFromA}
                    handleClickZoom={handleClickZoom}
                    handleClickAdd={handleClickAdd}
                    handleCLickBallMode={handleClickBallMode}
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
        top: dimHeight * 0,
        left: dimWidth * 0.1,
        marginTop: 20,
    }
});