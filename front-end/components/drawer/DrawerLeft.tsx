import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text , Image,FlatList, ScrollView, TextInput} from 'react-native';
import styles from './styles';
import close_menu from '../../assets/cross.png';
import plus from '../../assets/plus.png';
import pen from '../../assets/crayon.png';
import bin from '../../assets/trash.png';
import house from '../../assets/house.png';
import field from '../../assets/rct_field.png';
import share from '../../assets/share.png';
import importAllData from './JsonFile';
import * as FileSystem from 'expo-file-system';




/**
 * Renders the left drawer component.
 *
 * @param {Object} isOpen - A boolean to indicate if the drawer is open
 * @param {Function} onClose - A function to handle the closing of the drawer
 * @param {Function} onItemSelected - A function to handle the selection of an item
 * @return {JSX.Element} The rendered left drawer component
 */
const DrawerLeft = ({ isOpen, onClose, onItemSelected }: { isOpen: boolean, onClose: () => void, onItemSelected: (selectedItem: any | null) => void }) => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [editingItemId, setEditingItemId] = useState<string | null>(null); // ID de l'élément en cours de modification
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        const allData = importAllData();
        setData(allData);
    }, []);

    
    /**
     * A function that handles the press in event.
     *
     * @param {string} text - the text to be selected
     * @param {any} item - the item to be processed
     * @return {void} 
     */
    const handlePressIn = (text: string,item : any ) => {
        setSelectedButton(text);
        onItemSelected(item);
    };
    /**
     * Function to handle the deletion of the selected item.
     */
    const handleDeleteSelectedItem = () => {
        if (selectedButton) {
            const newData = data.filter(item => item.text !== selectedButton);
            setData(newData);
            setSelectedButton(null); // Efface également la sélection actuelle après la suppression
        }
    };

    /**
     * Function to handle adding an item.
     *
     * @return {void} 
     */
    const handleAddItem = () => {
        console.log('Add item');
        const newItem = {
            id: Math.random().toString(), // Utiliser une clé aléatoire pour l'ID
            name: 'Nouvel élément',
            image: field, // Vous pouvez changer cela si vous voulez une image différente
            timestamp: Date.now(),  
            data: []
        };
        setData(prevData => [...prevData, newItem]); 
        // create a json file with this information 
        const jsonData = JSON.stringify(newItem, null, 4);
    };
    /**
     * Updates the name property of the item with the given id in the data array.
     *
     * @param {string} name - the new name to be updated
     * @param {string} id - the id of the item to be updated
     * @return {void} 
     */
    const handleTextInputChange = (name: string, id: string) => {
        setData(prevData => prevData.map(item => item.id === id ? { ...item, name: name } : item));
    };

    /**
     * Handles the start of editing for a specific item.
     *
     * @param {string} id - The identifier of the item to start editing
     * @return {void} 
     */
    const handleStartEditing = (id: string) => {
        setEditingItemId(id);
    };

    /**
     * This function handles the finish editing action.
     *
     * @param {} 
     * @return {} 
     */
    const handleFinishEditing = () => {
        setEditingItemId(null);
    };
      /**
     * Function to render an image item.
     *
     * @param {Object} item - An object containing id, name, and URL of the image
     * @return {JSX.Element} The rendered image item component
     */
    const renderImageItem = ({ item }: { item: { id: string, name: string, url: string} }) => (
            <TouchableOpacity
            key={item.id}
            onPressIn={() => handlePressIn(item.name,item)}
            style={[styles.listItem, selectedButton === item.name && styles.selectedButton]}>
            <View style={styles.imageContainer}>
                <Image source={field} style={[styles.Field, selectedButton === item.name && styles.selectedImage]}/>
                {selectedButton === item.name && (
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => handleStartEditing(item.id)}>
                            <Image source={share} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteSelectedItem()}>
                            <Image source={bin} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
            )}
            </View>

            <View style={styles.textView}>
                {editingItemId === item.id ? (
                    <TextInput
                        value={item.name}
                        onChangeText={(text) => handleTextInputChange(text, item.id)}
                        onBlur={handleFinishEditing}
                        autoFocus
                    />
                ) : (
                    <Text onPress={() => handleStartEditing(item.id)}>{item.name}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={styles.drawerLeft}>
            { isOpen  && (
                <View style={styles.drawerLeftContent}>
                    {/* Menu view Top */}
                    <View style={styles.menuDrawerLeft}>
                        <TouchableOpacity onPress={onClose} style ={styles.closeMenu}>
                            <Image source={close_menu} style={styles.plusButtonImage} />
                        </TouchableOpacity>
                        <View style={styles.textTop}>
                            <Text style={styles.textTopContent}>{selectedButton || "Selectionner un scenario"}</Text>
                        </View>  
                        <TouchableOpacity style={styles.imagesTop} onPress={handleDeleteSelectedItem}>
                            <Image source={pen} style={styles.plusButtonImage}/>
                        </TouchableOpacity>
                    </View>
                    {/* List view */}
                    <View style={styles.listDrawerLeft}>               
                        <ScrollView style={styles.scrollBar}>
                            <View style={styles.listItem}>
                                <TouchableOpacity style={styles.plusButton} onPress={handleAddItem}>
                                    <Image source={plus} style={styles.plusButtonImage}/>
                                </TouchableOpacity>
                            </View>
                            {data.map((item) => renderImageItem({ item }))}
                        </ScrollView>
                    </View>
                    
                    {/* Bottomn view */}
                    <View style={styles.bottomDrawerLeft}>
                        <TouchableOpacity style={styles.buttonBottomDrawerLeft}>
                            <Image source={house} style={styles.plusButtonImage} />
                        </TouchableOpacity>
                        <View style={styles.textBottom}>
                            <Text style={styles.textBottomContent}>Match du Jeudi Aprem</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};
export default DrawerLeft;
