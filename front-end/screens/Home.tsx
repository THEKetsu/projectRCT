import {View, Button} from 'react-native';
import {useEffect} from "react";
import Player from '../classes/Player';
import Ballon from '../classes/Ballon';
import React from 'react';

// @ts-ignore
export default function Home ({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate("Strategy")} title={"GO TO STRATEGY"}/>
        </View>
    )
}
