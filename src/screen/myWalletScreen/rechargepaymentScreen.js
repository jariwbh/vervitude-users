import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import * as STYLES from './styles';
import RazorpayCheckout from 'react-native-razorpay';

const rechargepaymentScreen = (props) => {
    const options = props.route.params.data;
    const [onMessage, setonMessage] = useState(null);

    useEffect(() => {
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }, [onMessage])


    return (
        <SafeAreaView style={STYLES.rechargePaymentStyles.container}>
            {/* <WebView source={{ uri: `http://pay.membroz.com/#/payment-prev?billid=${id}&https=false&domain=dashboard.vervitude.co` }} /> */}
        </SafeAreaView>
    )
}

export default rechargepaymentScreen;


