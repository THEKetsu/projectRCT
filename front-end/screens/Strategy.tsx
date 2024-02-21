import {StyleSheet, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Field} from "../components/Field/Field";
import ToolBar from "../components/ToolBar/ToolBar";
import DrawerLeft from '../components/drawer/DrawerLeft';
import TopWidget from '../components/drawer/TopWidget';


export default function Strategy() {
    return (
        <View style={styles.container}>
            {isDrawerOpen && <DrawerLeft onClose={handleCloseDrawer} isOpen={isDrawerOpen} onItemSelected={handleItemSelected} />}
            {!isDrawerOpen && <TopWidget onPlayButtonPress={handlePressPlayButton}  selectedItem={selectedItem}/>}
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