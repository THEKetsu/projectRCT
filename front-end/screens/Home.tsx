import {View, Text, Button, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home () {

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={()=> navigation.navigate('Strategy')}>GO TO STRAT</Pressable>
        </View>
    )
}