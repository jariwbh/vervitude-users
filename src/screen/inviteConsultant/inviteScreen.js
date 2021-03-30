import React from 'react'
import { Text, View, ImageBackground, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import * as STYLES from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'

const inviteScreen = (props) => {
    function onPressSubmit() {
        ToastAndroid.show('User invited!', ToastAndroid.SHORT);
        props.navigation.replace(myProfileScreen);
    }

    return (
        <SafeAreaView style={STYLES.styles.container}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginLeft: wp('3%'), marginTop: hp('5%'), marginRight: hp('3%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate(myProfileScreen) }}>
                    <AntDesign name="arrowleft" color="#5AC8FA" size={24} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('3%'), marginLeft: hp('-30%') }}>Invite</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate(myProfileScreen) }}>
                    <Entypo name="home" color="#5AC8FA" size={24} />
                </TouchableOpacity>
            </View>
            <View style={STYLES.styles.centeView}>
                <View style={STYLES.styles.boxView}>
                    <Text style={STYLES.styles.invitetitle}>Invite</Text>
                    <View >
                        <Text style={STYLES.styles.fieldtitle}>Email Address</Text>
                        <View style={STYLES.styles.inputView}>
                            <TextInput
                                style={STYLES.styles.TextInput}
                                placeholder="Email Address"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#404040"
                            />
                        </View>

                        <Text style={STYLES.styles.fieldtitle}>Phone Number</Text>
                        <View style={STYLES.styles.inputView}>
                            <TextInput
                                style={STYLES.styles.TextInput}
                                placeholder="Phone Number"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#404040"
                            />
                        </View>

                        <Text style={STYLES.styles.fieldtitle}>Full Name</Text>
                        <View style={STYLES.styles.inputView}>
                            <TextInput
                                style={STYLES.styles.TextInput}
                                placeholder="Full Name"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#404040"
                            />
                        </View>

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                        <TouchableOpacity style={STYLES.styles.submitBtn} onPress={() => onPressSubmit()} >
                            <Text style={STYLES.styles.submitbtnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default inviteScreen
