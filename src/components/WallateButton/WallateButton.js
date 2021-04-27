import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function WallateButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}
            style={styles.btnstyle} >
            <Text style={styles.btntext}>₹5,300</Text>
            <View style={{ justifyContent: 'center' }}>
                <MaterialIcons name='account-balance-wallet' size={30} color='#04DE71' />
            </View>
        </TouchableOpacity>
    )
}

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