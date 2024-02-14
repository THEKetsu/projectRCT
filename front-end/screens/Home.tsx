import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import Player from "../classes/Player";
import Ballon from "../classes/Ballon";

// @ts-ignore
export default function Home ({navigation}) {

    function testClass() {
        const player1: Player = Player.createPlayer([0, 0], "0B", [], [], 1)
        const ballon1: Ballon = Ballon.createBallon([0,0],[],"")

        let strPlayer: string = JSON.stringify(player1)
        let jsonPlayer  = Player.from(JSON.parse(strPlayer))

        console.log(jsonPlayer)

        jsonPlayer.idChange("5R")

        console.log(jsonPlayer)
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
