import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import * as STYLES from './styles';

const rechargepaymentScreen = (props) => {
    const id = props.route.params.id;
    return (
        <SafeAreaView style={STYLES.rechargePaymentStyles.container}>
            <WebView source={{ uri: `http://pay.membroz.com/#/payment-prev?billid=${id}&https=false&domain=dashboard.vervitude.co` }} />
        </SafeAreaView>
    )
}

export default rechargepaymentScreen;


