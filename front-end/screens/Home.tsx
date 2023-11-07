import {View, Text, Button} from 'react-native';
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {useEffect, useState} from "react";
import {addUser} from "../redux/actions/testUserActions";

export default function Home () {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>SALUT</Text>
        </View>
    )
}