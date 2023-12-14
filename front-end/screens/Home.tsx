import {View, Text, Button} from 'react-native';
import { MyComponent } from '../components/Test';
import Momo from '../components/Momo';

export default function Home () {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>SALUT</Text>
            <Momo/>
            
        </View>
    )
}