import {View, Button} from 'react-native';
import {useEffect} from "react";
import Player from '../classes/Player';
import Ballon from '../classes/Ballon';

// @ts-ignore
export default function Home ({ navigation }) {
    
    function test () {
        const player1: Player = Player.createPlayer([0, 0], "0B", [], [], 1)
        const ballon1: Ballon  = Ballon.createBallon([0,0],[],"")

        const positionList = [[
            0,
            [player1],
            [ballon1]
        ]]

        console.log(positionList)
    }

    useEffect(() => {
        //test()
        //console.log(Player)
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate("Strategy")} title={"GO TO STRATEGY"}/>
        </View>
    )
}
