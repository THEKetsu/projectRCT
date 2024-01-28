import React from 'react';
import { View, TouchableOpacity, Text , Image} from 'react-native';
import styles from './styles';
import close_menu from '../../assets/cross.png';
const DrawerLeft = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    console.log('isOpen', isOpen);
    return (
        <View style={styles.drawerLeft}>
            { isOpen  && (
                <View style={styles.drawerLeftContent}>
                    {/* Menu Drawer Top */}
                    
                    <View style={styles.menuDrawerLeft}>
                        <Text>Test</Text>
                        <TouchableOpacity onPress={onClose} >
                            <Image source={close_menu} />
                        </TouchableOpacity>
                    </View>

                    {/* List Drawer */}
                    <View style={styles.listDrawerLeft}>
                        <Text>Test</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DrawerLeft;
