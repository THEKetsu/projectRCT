import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Strategy from "./screens/Strategy";
import React from "react";

const Stack = createNativeStackNavigator()

export default function App() : React.JSX.Element {
  return (
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator initialRouteName={"Home"}>
            <Stack.Screen name={"Home"} component={Home} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name={"Strategy"} component={Strategy} options={{headerShown: false, gestureEnabled: false}}/>

          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
  );
}