import {View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home ({navigation}) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.navigate("Strategy")} title={"GO TO STRATEGY"}/>
        </View>
    )
}
