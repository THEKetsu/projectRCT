import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text , Image,FlatList, ScrollView, TextInput, StyleProp, ImageStyle} from 'react-native';
import styles from './styles';
import close_menu from '../../assets/cross.png';
import plus from '../../assets/plus.png';
import pen from '../../assets/crayon.png';
import bin from '../../assets/trash.png';
import house from '../../assets/house.png';
import field from '../../assets/rct_field.png';
import share from '../../assets/share.png';
import importAllData from './JsonFile';
import { auth,db } from '../../firebase/firebase';
import {collection, addDoc, getDocs, updateDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";
/**
 * Store data to Firestore database.
 *
 * @param {any[]} data - array of data to be stored
 * @return {void} 
 */
const storeDataToFirestore = (data: any[]) => {
    try {
        if (!data || !data.length) {
            console.error('No data to store');
            return;
        }

        data.forEach((jsonData: any) => {
            const transformedData: any = {
                id: jsonData.id,
                name: jsonData.name,
                picture_url: jsonData.picture_url,
                timestamp: jsonData.timestamp,
                data: jsonData.data.map((item: any) => ({
                    position: Array.isArray(item.position) ? item.position.map((pos: number[]) => pos.join(',')) : item.position, // Vérifier si item.position est un tableau
                    data: item.data,
                    ballon: item.ballon
                }))
            };
            console.log('Transformed Data Information : ', transformedData);

            addDoc(collection(db, 'Strategy'), transformedData)
                .then(docRef => {
                    console.log('Document written with ID: ', docRef.id);
                })
                .catch(error => {
                    console.error('Error adding document: ', error);
                });
        });
    } catch (error) {
        console.error('Error storing data to Firestore: ', error);
    }
};


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
const DrawerLeft = ({ isOpen, onClose, onItemSelected }: { isOpen: boolean, onClose: () => void, onItemSelected: (selectedItem: any | null) => void }) => {
    const [selectedButtonId, setSelectedButton] = useState<string | null>(null);
    const [selectedButtonText, setSelectedButtonText] = useState<string | null>(null);
    const [editingItemId, setEditingItemId] = useState<string | null>(null); // ID de l'élément en cours de modification
    const [data, setData] = useState<any[]>([]);
    const [lastId, setLastId] = useState<number>(0);
    const [currentId, setCurrentId] = useState<number>(0);

    const getNextId = () => {
        // Récupérer le plus grand ID parmi les éléments existants
        const existingIds = data.map(item => item.id);
        const maxId = Math.max(...existingIds);
    
        // Incrémenter le plus grand ID trouvé
        const nextId = maxId !== -Infinity ? maxId + 1 : 1;
        setLastId(nextId); // Mettre à jour lastId pour l'utiliser lors de la création d'un nouvel élément
        return nextId;
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const allData = importAllData();
            try {
                const dataFromFirestore = await retrieveStrategies();
                setData(dataFromFirestore);
            } catch (error) {
                console.error('Error fetching data from Firestore: ', error);
                setData(allData);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Strategy'), (snapshot) => {
            const updatedData: any[] = [];
            snapshot.docs.forEach((doc) => {
                updatedData.push(doc.data());
            });
            setData(updatedData);
        });

        return () => unsubscribe();
    }, []);
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
     */
    /**
 * Function to handle the deletion of the selected item.
 */
    const handleDeleteSelectedItem = async (id: string) => {
        console.log('Deleting item with local ID: ', id);
        if (id) {
            try {
                // Trouver l'élément correspondant dans le tableau de données
                const selectedItem = data.find(item => item.id === id);
                console.log('Selected item: ', selectedItem);
                if (!selectedItem) {
                    console.error('Selected item not found in local data');
                    return;
                }
    
                // Récupérer l'ID Firestore associé à l'élément en recherchant dans la base de données Firestore
                const querySnapshot = await getDocs(collection(db, 'Strategy'));
                let firestoreId: string | null = null;
                querySnapshot.forEach(doc => {
                    if (doc.data().id === id) {
                        firestoreId = doc.id;
                    }
                });
                // Vérifier si l'ID Firestore a été trouvé
                if (!firestoreId) {
                    console.error('Firestore ID not found for selected item');
                    return;
                }
    
                // Supprimer le document Firestore en utilisant l'ID Firestore associé à l'élément
                console.log('Deleting document from Firestore: ', firestoreId);
                await deleteDoc(doc(db, 'Strategy', firestoreId));
                console.log('Document deleted from Firestore');
    
                // Mettre à jour le tableau de données local en supprimant l'élément
                const newData = data.filter(item => item.id !== id);
                setData(newData);
                setSelectedButton(null);
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
  // Dans la fonction handleAddItem
  const handleAddItem = async () => {
    try {
        const newItem = {
            id: getNextId(), // Utiliser getNextId() pour obtenir le prochain ID
            name: 'Nouvel élément',
            image: field,
            timestamp: Date.now(),
            data: []
        };
        const docRef = await addDoc(collection(db, 'Strategy'), newItem);
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
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
 * Updates the name property of the item with the given id in the Firestore database.
 *
 * @param {string} name - the new name to be updated
 * @param {string} id - the id of the item to be updated
 * @return {void} 
 */
   const updateItemNameInFirestore = async (name: string, id: string) => {
    try {
        console.log('Updating document name in Firestore:', name, 'for item with ID:', id);
        // Trouver l'ID Firestore correspondant à l'élément avec l'ID local
        const querySnapshot = await getDocs(collection(db, 'Strategy'));
        let firestoreId: string | null = null;
        querySnapshot.forEach(doc => {
            if (doc.data().id === id) {
                firestoreId = doc.id;
            }
        });
        // Vérifier si l'ID Firestore a été trouvé
        if (!firestoreId) {
            console.error('Firestore ID not found for selected item');
            return;
        }
        // Mettre à jour le document Firestore en utilisant l'ID Firestore associé à l'élément
        await updateDoc(doc(db, 'Strategy', firestoreId), { name });
        console.log('Document updated in Firestore');
    } catch (error) {
        console.error('Error updating document in Firestore: ', error);
    }
};


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
const handleFinishEditing = async (newName: string, itemId: string) => {
    try {
        // Mettre à jour le nom dans Firestore
        console.log('Updating document name in Firestore:', newName, 'for item with ID:', itemId);
        await updateItemNameInFirestore(newName, itemId);
        
        // Mettre à jour le nom dans l'état local (data)
        setData(prevData =>
            prevData.map(item =>
                item.id === itemId ? { ...item, name: newName } : item
            )
        );

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
      const renderImageItem = ({ item }: { item: { id: string, name: string, url: string} }): JSX.Element => (
        <TouchableOpacity
            key={item.id}
            onPressIn={() => handlePressIn(item.id, item)}
            style={[styles.listItem, selectedButtonId === item.id && styles.selectedButton]}>
            <View style={styles.imageContainer}>
                <Image source={field} style={[styles.Field as StyleProp<ImageStyle>, selectedButtonId === item.id && styles.selectedImage as StyleProp<ImageStyle>]}/>
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

    return (
        <View style={styles.drawerLeft}>
            { isOpen  && (
                <View style={styles.drawerLeftContent}>
                    {/* Menu view Top */}
                    <View style={styles.menuDrawerLeft}>
                        <TouchableOpacity onPress={onClose} style ={styles.closeMenu}>
                            <Image source={close_menu} style={styles.plusButtonImage as StyleProp<ImageStyle>} />
                        </TouchableOpacity>
                        <View style={styles.textTop}>
                            <Text style={styles.textTopContent}>{selectedButtonText || "Selectionner un scenario"}</Text>
                        </View>  
                        <TouchableOpacity style={styles.imagesTop} onPress={handleDeleteSelectedItem}>
                            <Image source={pen} style={styles.plusButtonImage as StyleProp<ImageStyle>}/>
                        </TouchableOpacity>
                    </View>
                    {/* List view */}
                    <View style={styles.listDrawerLeft}>               
                        <ScrollView style={styles.scrollBar}>
                            <View style={styles.listItem}>
                                <TouchableOpacity style={styles.plusButton} onPress={handleAddItem}>
                                    <Image source={plus} style={styles.plusButtonImage as StyleProp<ImageStyle>}/>
                                </TouchableOpacity>
                            </View>
                            {data.map((item) => renderImageItem({ item }))}
                        </ScrollView>
                    </View>
                    
                    {/* Bottomn view */}
                    <View style={styles.bottomDrawerLeft}>
                        <TouchableOpacity style={styles.buttonBottomDrawerLeft}>
                            <Image source={house} style={styles.plusButtonImage as StyleProp<ImageStyle>} />
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
