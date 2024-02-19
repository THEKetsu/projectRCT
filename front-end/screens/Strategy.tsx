import {StyleSheet, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Field} from "../components/Field/Field";
import ToolBar from "../components/ToolBar/ToolBar";

export default function Strategy() {
    return (
        <View style={styles.container}>
            <GestureHandlerRootView style={{flex: 1}}>
                <Field/>
                <ToolBar/>
            </GestureHandlerRootView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5FB07B',
        alignItems: 'center',
        justifyContent: 'center'
    },
});