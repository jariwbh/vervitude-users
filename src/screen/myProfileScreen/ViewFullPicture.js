import React from 'react'
import { View, Image, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ViewFullPicture(props) {
    const userProfile = props.route.params.userProfileImage;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar hidden backgroundColor='#FFFFFF' barStyle='light-content' />
            <View style={{ justifyContent: 'flex-start', marginTop: 30 }}>
                <TouchableOpacity onPress={() => { props.navigation.goBack(null) }}>
                    <AntDesign name='arrowleft' size={24} color='#00D9CE' style={{ marginLeft: 15 }} />
                </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: userProfile }} resizeMode='cover' style={{ height: '80%', width: '100%', borderRadius: 10 }} />
            </View>
        </SafeAreaView>
    )
}
