import React from "react";
import {View, Text, Button} from 'react-native';
import MenuPosition from '../components/MenuPosition/MenuPosition';


export default function Home () {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>SALUT</Text>
            <MenuPosition />
        </View>
    )
}