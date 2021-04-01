import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import * as SCREEN from '../../context/screen/screenName';
import ChatMenu from '../../components/ChatMenu/ChatMenu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const rubychatScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'space-between', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: hp('5%') }}>
                    <TouchableOpacity style={styles.chatIcon} onPress={() => { props.navigation.navigate(SCREEN.CHATHISTORYSCREEN) }} >
                        <AntDesign name="arrowleft" size={24} color="#5AC8FA" />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/profile.png')}
                        style={{ width: 50, height: 50, borderRadius: hp('7%'), marginLeft: hp('1%') }} />
                    <FontAwesome name="circle" size={15} color="#5AC8FA" style={{ marginLeft: wp('-4%'), marginTop: wp('-10%') }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginLeft: hp('2%') }}>
                        <Text style={{ fontSize: hp('2.5%'), color: '#5AC8FA' }}>Ruby</Text>
                        <Text style={{ fontSize: hp('1.5%'), color: '#000000' }}>Online</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('25%') }}>
                        <Image source={require('../../assets/images/chat.png')} style={{ width: 50, height: 25 }} />
                        <Text style={{ fontSize: hp('2%'), color: '#5AC8FA', position: 'absolute' }}>20K</Text>
                    </View>
                    <ChatMenu onPress={() => { props.navigation.navigate(SCREEN.CHATHISTORYSCREEN) }} />
                </View>

                <View style={styles.chatview}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('65%') }}>
                        <View style={styles.inputview}>
                            <TouchableOpacity >
                                <Image source={require('../../assets/images/addicon.png')} style={{ width: 25, height: 25, marginLeft: wp('4%') }} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.inputtext}
                                placeholder="Write Something here"
                                type='clear'
                                placeholderTextColor="#999999"
                                returnKeyType="done"
                            />
                            <TouchableOpacity >
                                <Image source={require('../../assets/images/sendicon.png')} style={{ width: 25, height: 25, marginRight: wp('4%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: hp('10%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default rubychatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    chatview: {
        marginTop: hp('3%'),
        width: wp('100%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('5%'),
        height: hp('80%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 3
    },
    chatIcon: {
        width: wp("7%"),
        height: wp("7%"),
        borderRadius: hp('6%'),
        marginLeft: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputview: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderColor: '#737373',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        width: wp('90%'),
        height: hp('8%'),
        borderRadius: hp('2%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    inputtext: {
        fontSize: hp('2.5%'),
        flex: 1,
        marginLeft: wp('4%')
    }
})
