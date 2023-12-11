import {View, Text, Button} from 'react-native';
import AnimatedBottomBar from '../components/BottomBar/BottomBar';

export default function Home () {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AnimatedBottomBar></AnimatedBottomBar>

        </View>
    )
}