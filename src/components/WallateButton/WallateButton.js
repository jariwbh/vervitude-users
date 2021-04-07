import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function WallateButton() {
    return (
        <TouchableOpacity
            style={styles.btnstyle}>
            <Text style={styles.btntext}>₹5,300</Text>
            <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                <MaterialIcons name="account-balance-wallet" size={30} color='#04DE71' />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnstyle: {
        height: 50,
        width: 150,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 100
    },
    btntext: {
        fontSize: 20,
        color: '#04DE71'
    }
})