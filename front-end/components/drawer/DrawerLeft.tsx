import React from 'react';
import { View, TouchableOpacity, Text , Image,FlatList, ScrollView} from 'react-native';
import styles from './styles';
import close_menu from '../../assets/cross.png';
import home_menu from '../../assets/BurgerMenu.png';
import pen from '../../assets/crayon.png';
import bin from '../../assets/trash.png';
import house from '../../assets/house.png';
import field from '../../assets/rct_field.png';
import database from './firebase';



const DrawerLeft = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const data = [
        { id: '1', image: field , text: 'Touche à 22m'},
        { id: '2', image: field, text: 'Ruck 5v5 milieu de terrain' },
        { id: '3', image: field , text: 'Foot'},
        // Ajoutez plus d'éléments ici si nécessaire
    ];

    const renderImageItem = ({ item }: { item: { id: string, image: any , text : any} }) => (
        <View style={styles.listItem}>
            <TouchableOpacity>
                <Image source={item.image}  style={styles.Field}/>
            </TouchableOpacity>
            <View style={styles.textView}>
            <Text>{item.text}</Text>
        </View>

        </View>
    );   
    console.log('isOpen', isOpen);
    
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
                            <Text style={styles.textTopContent}> Touche à 22m </Text>
                        </View>  
                        <View style={styles.imagesTop}>
                            <Image source={pen} />
                        </View>
                        <View style={styles.imagesTop}>
                            <Image source={bin} />
                        </View>
                    </View>

                    {/* List view */}
                    <View style={styles.listDrawerLeft}> 
                        <View style={styles.scrollStyle}>               
                        <ScrollView>
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
