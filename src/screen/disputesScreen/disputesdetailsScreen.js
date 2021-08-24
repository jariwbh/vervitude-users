import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';
import * as STYLES from './styles';

const disputesdetailsScreen = (props) => {
    const imageRes = props.route.params.item;

    return (
        <SafeAreaView style={STYLES.disputesStyle.container}>
            <GeneralStatusBarColor hidden={'false'} translucent={'true'} backgroundColor="transparent" barStyle="dark-content" />
            <View style={STYLES.disputesStyle.headerstyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>Chat Disputes</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Image source={{ uri: imageRes.attachments[0].attachment }} style={{ width: 300, height: 300 }} />
            </View>
        </SafeAreaView>
    )
}

export default disputesdetailsScreen
