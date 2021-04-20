import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function MenuButton(props) {
    return (
        <TouchableOpacity style={styles.categoryIcon} onPress={props.onPress} >
            <Image source={require('../../assets/Images/menuicon.png')}
                style={{ alignItems: 'center', height: 50, width: 60 }}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});


