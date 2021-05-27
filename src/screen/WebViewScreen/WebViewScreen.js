import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import Entypo from 'react-native-vector-icons/Entypo';

const WebViewScreen = (props) => {
    const URI = props.route.params.data;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 15 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                    <Entypo name='cross' size={28} color='#000000' />
                </TouchableOpacity>
                {/* <Text style={{ color: 'green' }}>{URI}</Text> */}
            </View>
            <WebView
                style={{ flex: 1 }}
                source={{ uri: URI }} />
        </SafeAreaView>
    )
}

export default WebViewScreen;


