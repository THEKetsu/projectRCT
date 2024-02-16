import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import Player from "../classes/Player";
import Ballon from "../classes/Ballon";
import {useDispatch} from "react-redux";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {setPositionList} from "../redux/actions/positionLogicActions";

// @ts-ignore
export default function Home ({navigation}) {

    const dispatch = useAppDispatch()
    const positionLogic = useAppSelector((state) => state.positionLogic)

    function testClass () {
        const player1: Player = Player.createPlayer([0, 0], "0B", [], [], 1);
        const ballon1: Ballon = Ballon.createBallon([0,0],[],"");

        const positionList: [number, Player[], Ballon[]][] = [[
            0,
            [player1],
            [ballon1]
        ]]

        const strPL: string = JSON.stringify(positionList)

        console.log(strPL)
    }

    useEffect(() => {
        testClass()
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate("Strategy")} title={"GO TO STRATEGY"}/>
        </View>
    )
}
