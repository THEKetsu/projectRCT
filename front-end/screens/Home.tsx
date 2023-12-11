import React from "react";
import {View, Text, Button} from 'react-native';
import AnimatedBottomBar from '../components/BottomBar/BottomBar';
import SVGField from '../components/utils/SVGField';

export default function Home () {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SVGField height={300} width={300} />
            <AnimatedBottomBar></AnimatedBottomBar>
        </View>
    )
}