import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const RightDrawer = ({ setIsOpen}) => {
    const toggleBar = () => {
        setIsOpen((prevState: any) => !prevState); // Inverser la valeur de isOpen
    };
    return (
        <TouchableOpacity onPress={toggleBar} style={styles.container}>
            <MaterialIcons name="chevron-left" style={styles.icon} />
        </TouchableOpacity>
    );
};

export default RightDrawer;
