import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import React from "react";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"Home"}>
              <Stack.Screen name={"Home"} component={Home} options={{headerShown: false, gestureEnabled: false}}/>
              {/*<Stack.Screen name={"Strategy"} component={Strategy} options={{headerShown: false, gestureEnabled: false}}/>*/}
          </Stack.Navigator>
      </NavigationContainer>
  );
}