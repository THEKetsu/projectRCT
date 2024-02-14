import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import Register from "./screens/Connection/Register";
import Login from "./screens/Connection/Login";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Success from "./screens/Connection/Success";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen name={"Home"} component={Home} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name={"Register"} component={Register} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name={"Login"} component={Login} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name={"Success"} component={Success} options={{headerShown: false, gestureEnabled: false}}/>
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
  );
}