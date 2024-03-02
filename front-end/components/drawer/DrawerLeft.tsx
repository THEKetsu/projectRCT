import React, {useEffect, useState} from 'react';
import {Image, ImageStyle, ScrollView, StyleProp, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import close_menu from '../../assets/cross.png';
import plus from '../../assets/plus.png';
import pen from '../../assets/crayon.png';
import bin from '../../assets/trash.png';
import house from '../../assets/house.png';
import field from '../../assets/rct_field.png';
import share from '../../assets/share.png';
import importAllData from './JsonFile';
import {DocumentData, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import Strategy from '../../screens/Strategy';
import { v4 as uuidv4 } from 'uuid';

const retrieveStrategies = async () => {
    try {
        const strategies: any[] = [];
        const querySnapshot = await getDocs(collection(db, 'Strategy'));
        querySnapshot.forEach(doc => {
            strategies.push(doc.data());
        });

        console.log('Retrieved strategies: ', strategies);
        return strategies;
    } catch (error) {
        console.error('Error retrieving strategies: ', error);
        return [];
    }
};

/**
 * Renders the left drawer component.
 *
 * @param {Object} isOpen - A boolean to indicate if the drawer is open
 * @param {Function} onClose - A function to handle the closing of the drawer
 * @param {Function} onItemSelected - A function to handle the selection of an item
 * @return {JSX.Element} The rendered left drawer component
 */
const DrawerLeft = ({isOpen, onClose, onItemSelected, strategy}: {
    isOpen: boolean,
    onClose: () => void,
    onItemSelected: (selectedItem: any | null) => void,
    strategy : Promise<DocumentData | null | undefined>
}) => {

    const [strategyData, setStrategyData] = useState<DocumentData | null | undefined>(null);
    useEffect(() => {
        if (strategy) { // Vérifier si la promesse n'est pas null
            // Mettre à jour l'état lorsque la promesse est résolue
            strategy.then((data) => {
                setStrategyData(data); // Mettre à jour l'état avec les données de la promesse
            }).catch((error) => {
                console.error("Erreur lors de la récupération de la stratégie :", error);
            });
        }
    }, [strategy]);
    //console.log("STRATEGY",strategyData);

    const [selectedButtonId, setSelectedButton] = useState<string | null>(null);
    const [selectedButtonText, setSelectedButtonText] = useState<string | null>(null);
    const [editingItemId, setEditingItemId] = useState<string | null>(null); // ID de l'élément en cours de modification
    const [dataScenario, setDataScnenario] = useState<any[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const allData = strategyData;
    //         if (allData != null && allData != undefined) {
    //         if (allData.scenarios != null && allData.scenarios != undefined) {
    //             setDataScnenario(allData.scenarios);
    //         }
    //     }
    //     };
    //     fetchData();
    // }, [strategyData]);

    useEffect(() => {
        const fetchData = async () => {
            if (strategy) {
                try {
                    const data = await strategy;
                    setStrategyData(data);
    
                    if (data && data.scenarios) {
                        setDataScnenario(data.scenarios);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération de la stratégie :", error);
                }
            }
        };
    
        fetchData();
    
        // Effect cleanup function
        return () => {
            // Clean up any subscriptions or asynchronous tasks here
        };
    }, [strategy]);
    

    useEffect(() => {
        if (dataScenario != null && dataScenario != undefined) {
            console.log("LOCAL DATA CHANGED", dataScenario);
            if (strategyData == null || strategyData == undefined) {
                return;
            }
            const unsubscribe = onSnapshot(collection(db, 'Strategy'), (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.data().id === strategyData.id) {
                        const updatedData = {
                            ...doc.data(),
                            scenarios: dataScenario
                        };
                        updateDoc(doc.ref, updatedData)
                            .then(() => {
                                console.log("Document updated successfully!");
                            })
                            .catch((error) => {
                                console.error("Error updating document:", error);
                            });
                    }
                });
            });
            return () => unsubscribe();
        }
    }, [dataScenario, strategyData]);
    


    // const getNextId = (strategy: any) => {
    //     // Vérifiez si la stratégie et ses scénarios existent
    //     if (strategy && strategy.scenarios && strategy.scenarios.length > 0) {
    //         // Récupérez tous les IDs existants
    //         const existingIds = strategy.scenarios.map((scenario: any) => scenario.id);
    //         // Trouvez le maximum des IDs existants
    //         const maxId = Math.max(...existingIds);
    //         // Incrémentez l'ID maximum de 1 pour obtenir le prochain ID
    //         return maxId + 1;
    //     } else {
    //         // Si aucun scénario n'existe, retournez simplement 1 comme premier ID
    //         return 1;
    //     }
    // };
    

    /**
     * A function that handles the press in event.
     *
     * @param {string} text - the text to be selected
     * @param {any} item - the item to be processed
     * @return {void}
     */
    const handlePressIn = (id: string, item: any) => {
        setSelectedButton(id); // Mettre à jour avec l'ID de l'élément
        setSelectedButtonText(item.name); // Mettre à jour avec le nom de l'élément
        onItemSelected(item);
    };
/**
 * Function to handle the deletion of the selected item.
 *
 * @param {string} id - The ID of the item to be deleted
 * @return {void}
 */
const handleDeleteSelectedItem = async (id: string) => {
    console.log('Deleting item with local ID: ', id);
    if (id) {
        try {
            const selectedItem = dataScenario.find(item => item.id === id);
            console.log('Selected item: ', selectedItem);
            if (!selectedItem) {
                console.error('Selected item not found in local data');
                return;
            }
            // Find the strategy document that contains this scenario
            const querySnapshot = await getDocs(collection(db, 'Strategy'));
            querySnapshot.forEach(doc => {
                const strategyData = doc.data();
                if (strategyData.scenarios && strategyData.scenarios.some((scenario: any) => scenario.id === id)) {
                    // Remove the scenario from the scenarios array
                    const updatedScenarios = strategyData.scenarios.filter((scenario: any) => scenario.id !== id);
                    updateDoc(doc.ref, { scenarios: updatedScenarios })
                        .then(() => {
                            console.log("Scenario removed from strategy successfully!");
                            // Update the local state after deleting the item
                            const newData = dataScenario.filter(item => item.id !== id);
                            setDataScnenario(newData);
                            setSelectedButton(null);
                            // Update the strategy data state
                            setStrategyData(prevStrategyData => {
                                if (prevStrategyData) {
                                    return { ...prevStrategyData, scenarios: updatedScenarios };
                                }
                                return prevStrategyData;
                            });
                        })
                        .catch((error) => {
                            console.error("Error removing scenario from strategy:", error);
                        });
                }
            });
        } catch (error) {
            console.error('Error deleting document from Firestore: ', error);
        }
    }
};






    

    /**
     * Function to handle adding an item.
     *
     * @return {void}
     */
    const handleAddItem = async (Strategy: any) => {
        if (Strategy) {
            try {
                const newItem = {
                    id: uuidv4(),
                    name: 'Nouvel élément',
                    image: field,
                    timestamp: Date.now(),
                    data: []
                };
    
                // Mise à jour des données locales
                const newScenarios = [...dataScenario, newItem];
                setDataScnenario(newScenarios);
    
                // Mise à jour des données Firestore
                const querySnapshot = await getDocs(collection(db, 'Strategy'));
                querySnapshot.forEach(queryDocumentSnapshot => {
                    const documentData = queryDocumentSnapshot.data();
                    const documentId = queryDocumentSnapshot.id;
    
                    if (documentData && documentData.id === Strategy.id) {
                        const documentRef = doc(db, 'Strategy', documentId);
                        updateDoc(documentRef, { scenarios: newScenarios })
                            .then(() => {
                                console.log('Scenarios updated in Firestore successfully!');
                            })
                            .catch((error) => {
                                console.error('Error updating scenarios in Firestore:', error);
                            });
                    }
                });
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }
    };
    

    
    


    /**
     * Updates the name property of the item with the given id in the data array.
     *
     * @param {string} name - the new name to be updated
     * @param {string} id - the id of the item to be updated
     * @return {void}
     */
    const handleTextInputChange = async (name: string, id: string) => {
        setDataScnenario(prevData => prevData.map(item => item.id === id ? {...item, name: name} : item));
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
     * Updates the name property of the item with the given id in the Firestore database.
     *
     * @param {string} name - the new name to be updated
     * @param {string} id - the id of the item to be updated
     * @return {void}
     */
    async function updateItemNameInFirestore(name: string, id: string) {
        try {
            const querySnapshot = await getDocs(collection(db, 'Strategy'));
            let firestoreId: string | null = null;
            querySnapshot.forEach(doc => {
                if (doc.data().id === id) {
                    firestoreId = doc.id;
                }
            });

            await updateDoc(doc(db, 'Strategy', firestoreId), {name});
        } catch (error) {
            console.error('Error updating document in Firestore: ', error);
        }
    }


    /**
     * Handles the finish editing action.
     *
     * @param {string} newName - the new name of the item
     * @param {string} itemId - the id of the item being edited
     * @return {void}
     */
    /**
     * Handles the finish editing action.
     *
     * @param {string} newName - the new name of the item
     * @param {string} itemId - the id of the item being edited
     * @return {void}
     */
    /**
 * Handles the finish editing action.
 *
 * @param {string} newName - The new name of the item
 * @param {string} itemId - The ID of the item being edited
 * @return {void}
 */
const handleFinishEditing = async (newName: string, itemId: string) => {
    try {
        // Update the item name in Firestore
        await updateItemNameInFirestore(newName, itemId);

        // Update the item name in the local state
        setDataScnenario(prevData =>
            prevData.map(item =>
                item.id === itemId ? {...item, name: newName} : item
            )
        );

        // Reset the editing item ID
        setEditingItemId(null);
    } catch (error) {
        console.error('Error handling finish editing: ', error);
    }
};


    /**
     * Function to render an image item.
     *
     * @param {Object} item - An object containing id, name, and URL of the image
     * @return {JSX.Element} The rendered image item component
     */
    const renderImageItem = ({item}: { item: { id: string, name: string, url: string } }): JSX.Element => {

        return(
            <TouchableOpacity
            key={item.id}
            onPressIn={() => handlePressIn(item.id, item)}
            style={[styles.listItem, selectedButtonId === item.id && styles.selectedButton]}
        >
            <View style={styles.imageContainer}>
                <Image source={field}
                       style={[styles.Field as StyleProp<ImageStyle>, selectedButtonId === item.id && styles.selectedImage as StyleProp<ImageStyle>]}/>
                {selectedButtonId === item.id && (
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => handleStartEditing(item.id)}>
                            <Image source={share} style={styles.icon as StyleProp<ImageStyle>}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteSelectedItem(item.id)}>
                            <Image source={bin} style={styles.icon as StyleProp<ImageStyle>}/>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View style={styles.textView}>
                {editingItemId === item.id ? (
                    <TextInput
                        value={item.name}
                        onChangeText={(text) => handleTextInputChange(text, item.id)}
                        onBlur={() => handleFinishEditing(item.name, item.id)}
                        autoFocus
                    />
                ) : (
                    <Text onPress={() => handleStartEditing(item.id)}>{item.name}</Text>
                )}
            </View>
        </TouchableOpacity>
        );
    }
    return (
        <View style={styles.drawerLeft}>
            {isOpen && (
                <View style={styles.drawerLeftContent}>
                    <View style={styles.menuDrawerLeft}>
                        <TouchableOpacity onPress={onClose} style={styles.closeMenu}>
                            <Image source={close_menu} style={styles.plusButtonImage as StyleProp<ImageStyle>}/>
                        </TouchableOpacity>
                        <View style={styles.textTop}>
                            <Text
                                style={styles.textTopContent}>{selectedButtonText || "Selectionner un scenario"}</Text>
                        </View>
                        <TouchableOpacity style={styles.imagesTop} onPress={handleDeleteSelectedItem}>
                            <Image source={pen} style={styles.plusButtonImage as StyleProp<ImageStyle>}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.listDrawerLeft}>
                        <ScrollView style={styles.scrollBar}>
                            <View style={styles.listItem}>
                                <TouchableOpacity style={styles.plusButton} onPress={() => handleAddItem(strategyData)}>
                                    <Image source={plus} style={styles.plusButtonImage as StyleProp<ImageStyle>}/>
                                </TouchableOpacity>
                            </View>
                            {dataScenario.map((item) => renderImageItem({item}))}
                        </ScrollView>
                    </View>

                    <View style={styles.bottomDrawerLeft}>
                        <TouchableOpacity style={styles.buttonBottomDrawerLeft}>
                            <Image source={house} style={styles.plusButtonImage as StyleProp<ImageStyle>}/>
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


