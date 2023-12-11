import React from "react";
import {View, Text, Button} from 'react-native';
import MenuPosition from '../components/MenuPosition/MenuPosition';
import SVGField from '../components/utils/SVGField';

export default function Home () {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>SALUT</Text>
            <SVGField height={300} width={300} />
            <MenuPosition />
        </View>
    )
}