import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Field} from "../components/Field/Field";
import ToolBar from "../components/ToolBar/ToolBar";
import DrawerLeft from '../components/drawer/DrawerLeft';
import TopWidget from '../components/drawer/TopWidget';
import { returnPublicInstance } from '../classes/ReturnPublicManager';
import { loadStrategyFromDB } from '../firebase/firebase';
export default function Strategy() {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [scenario, setScenario] = useState<[]| null>([]);

    const [strategy, setStrategy] = useState<any | null>(null);

    useEffect(() => {    
    //console.log(returnPublicInstance.IdStrategy);
    if (returnPublicInstance.IdStrategy !== 0){
       const strategy = loadStrategyFromDB(returnPublicInstance.IdStrategy);
       //console.log("Test",strategy);
       setStrategy(strategy);
    }
    }, [returnPublicInstance.IdStrategy]);
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
            returnPublicInstance.IdScenario = selectedItem.id;
            setSelectedItem(selectedItem.name);
            setScenario(selectedItem);

    };

    return (
        <View style={styles.container}>
            {isDrawerOpen &&
            <DrawerLeft onClose={handleCloseDrawer} isOpen={isDrawerOpen} onItemSelected={handleItemSelected} strategy={strategy}/>}
            {!isDrawerOpen && <TopWidget onPlayButtonPress={handlePressPlayButton} selectedItem={selectedItem} strategy={strategy}/>}
            <GestureHandlerRootView style={{flex: 1}}>
                <Field data={scenario.data}/>
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