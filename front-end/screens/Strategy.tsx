import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Field} from "../components/Field/Field";
import ToolBar from "../components/ToolBar/ToolBar";
import DrawerLeft from '../components/drawer/DrawerLeft';
import TopWidget from '../components/drawer/TopWidget';


export default function Strategy() {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    /**
     * Handle the press event on the play button.
     *
     * @param {any} info - the information related to the press event
     * @return {void}
     */
    const handlePressPlayButton = (info: any) => {
        setIsDrawerOpen(true);
    };

    /**
     * Closes the drawer by setting the isDrawerOpen state to false.
     *
     * @param {}
     * @return {}
     */
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };
    /**
     * A function that handles the selected item.
     *
     * @param {any | null} selectedItem - the selected item to be handled
     * @return {void}
     */
    const handleItemSelected = (selectedItem: any | null) => {
        setSelectedItem(selectedItem.name);
    };
    const animate = (animate : any) => {
        return animate;
        // Implémentez la logique de l'animation ici
    };
    const indexanimate = 0;
    
    return (
        <View style={styles.container}>
            {isDrawerOpen && <DrawerLeft onClose={handleCloseDrawer} isOpen={isDrawerOpen} onItemSelected={handleItemSelected} />}
            {!isDrawerOpen && <TopWidget onPlayButtonPress={handlePressPlayButton} selectedItem={selectedItem} />}
            <GestureHandlerRootView style={{flex: 1}}>
            <Field  />
            <ToolBar/>
            </GestureHandlerRootView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5FB07B',
        width: '100%',
        height: '100%',
    },
});