import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function WallateButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}
            style={styles.btnstyle} >
            <Text style={styles.btntext}>₹5,300</Text>
            <Image source={require('../../assets/Images/wallateicon.png')}
                style={{ alignItems: 'center', height: 20, width: 25 }}
            />
        </TouchableOpacity>
    )
}
//wallateicon
const styles = StyleSheet.create({
    btnstyle: {
        height: 45,
        width: 120,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginRight: 10
    },
    btntext: {
        fontSize: 20,
        color: '#04DE71'
    }
})