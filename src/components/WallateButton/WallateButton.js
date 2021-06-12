import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { WalletDetailService } from '../../services/BillService/BillService';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import { useFocusEffect } from '@react-navigation/native';

export default function WallateButton(props) {
    const [walletBalance, setwalletBalance] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem(AUTHUSER).then(async (res) => {
                let userId = JSON.parse(res)._id;
                try {
                    const response = await WalletDetailService(userId);
                    if (response.data != null && response.data != 'undefind' && response.status === 200) {
                        setwalletBalance(response.data[0].walletbalance)
                    }
                } catch (error) {
                    console.log(`error`, error);
                }
            });
        }, [walletBalance])
    );

    return (
        <TouchableOpacity onPress={props.onPress}
            style={styles.btnstyle} >
            <Text style={styles.btntext}>₹ {Number(walletBalance)}</Text>
            <Image source={require('../../assets/Images/wallateicon.png')}
                style={{ alignItems: 'center', height: 20, width: 25 }}
            />
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