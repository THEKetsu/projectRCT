import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text , Image,FlatList, ScrollView, TextInput} from 'react-native';
import styles from './styles';
import close_menu from '../../assets/cross.png';
import plus from '../../assets/plus.png';
import pen from '../../assets/crayon.png';
import bin from '../../assets/trash.png';
import house from '../../assets/house.png';
import field from '../../assets/rct_field.png';
import importAllData from './JsonFile';

const DrawerLeft = ({ isOpen, onClose, onItemSelected }: { isOpen: boolean, onClose: () => void, onItemSelected: (selectedItem: string | null) => void }) => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [editingItemId, setEditingItemId] = useState<string | null>(null); // ID de l'élément en cours de modification
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        const allData = importAllData();
        setData(allData);
    }, []);

    const handlePressIn = (text: string) => {
        setSelectedButton(text);
        onItemSelected(text);
    };

    const handleDeleteSelectedItem = () => {
        if (selectedButton) {
            const newData = data.filter(item => item.text !== selectedButton);
            setData(newData);
            setSelectedButton(null); // Efface également la sélection actuelle après la suppression
        }
    };
    const handleAddItem = () => {
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
        // Écrire les données JSON dans un fichier
        fs.writeFile('nouvel_element.json', jsonData, (err: any) => {
            if (err) {
                console.error('Une erreur s\'est produite lors de l\'écriture du fichier :', err);
                return;
            }
            console.log('Le fichier nouvel_element.json a été créé avec succès.');
        });
    };
    const handleTextInputChange = (name: string, id: string) => {
        setData(prevData => prevData.map(item => item.id === id ? { ...item, name: name } : item));
    };

    const handleStartEditing = (id: string) => {
        setEditingItemId(id);
    };

    const handleFinishEditing = () => {
        setEditingItemId(null);
    };



    
    // Transformation de allData en tableau d'objets pour l'affichage
    const renderImageItem = ({ item }: { item: { id: string, name: string, url: string} }) => (
        <TouchableOpacity
            key={item.id}
            onPressIn={() => handlePressIn(item.name)}
            style={[styles.listItem, selectedButton === item.name && styles.selectedButton]}>
            <Image source={field} style={styles.Field}/>
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
                        <TouchableOpacity onPress={onClose} >
                            <Image source={close_menu} />
                        </TouchableOpacity>
                        <View style={styles.textTop}>
                            <Text style={styles.textTopContent}>{selectedButton || "Selectionner un scenario"}</Text>
                        </View>  
                        <TouchableOpacity style={styles.imagesTop}>
                            <Image source={pen} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imagesTop} onPress={handleDeleteSelectedItem}>
                            <Image source={bin} />
                        </TouchableOpacity>
                    </View>
                    {/* List view */}
                    <View style={styles.listDrawerLeft}> 
                        <View style={styles.scrollStyle}>               
                        <ScrollView>
                            <View style={styles.listItem}>
                                <TouchableOpacity style={styles.plusButton} onPress={handleAddItem}>
                                    <Image source={plus} style={styles.plusButtonImage}/>
                                </TouchableOpacity>
                            </View>
                            {data.map((item) => renderImageItem({ item }))}
                        </ScrollView>
                        </View>
                    </View>
                    
                    {/* Bottomn view */}
                    <View style={styles.bottomDrawerLeft}>
                        <TouchableOpacity style={styles.buttonBottomDrawerLeft}>
                            <Image source={house} />
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
