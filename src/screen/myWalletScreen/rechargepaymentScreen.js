import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import * as STYLES from './styles';

const rechargepaymentScreen = (props) => {
    const id = props.route.params.id;
    const [onMessage, setonMessage] = useState(null);
    let posturl = `http://pay.membroz.com/#/payment-prev?billid=${id}&https=false&domain=dashboard.vervitude.co`;

    useEffect(() => {
        console.log(`posturl`, posturl);
    }, [onMessage])


    return (
        <SafeAreaView style={STYLES.rechargePaymentStyles.container}>
            <WebView source={{ uri: `http://pay.membroz.com/#/payment-prev?billid=${id}&https=false&domain=dashboard.vervitude.co` }} />
        </SafeAreaView>
    )
}

export default rechargepaymentScreen;


