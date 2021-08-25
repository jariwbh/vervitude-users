import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Entypo from 'react-native-vector-icons/Entypo';
const WIDTH = Dimensions.get('window').width;
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor'

const WebViewScreen = (props) => {
    const URI = props.route.params.data;
    const [title, settitle] = useState('');

    const _onNavigationStateChange = (webViewState) => {
        settitle(webViewState.url);
    }

    function LoadingIndicatorView() {
        <ActivityIndicator color='#009b88' size='large' />
    }

    useEffect(() => {
    }, [title]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GeneralStatusBarColor hidden={false} translucent={true} backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 15 }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                        <Entypo name='cross' size={28} color='#000000' />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: WIDTH / 5 }} >
                    <Text style={{ color: '#34A853' }}>{title}</Text>
                </View>
            </View>
            <WebView
                style={{ flex: 1 }}
                source={{ uri: URI }}
                onNavigationStateChange={_onNavigationStateChange}
                renderLoading={LoadingIndicatorView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
            />
        </SafeAreaView>
    )
}

export default WebViewScreen;


