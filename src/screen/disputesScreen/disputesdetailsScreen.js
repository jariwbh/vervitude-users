import React from 'react'
import { Text, View, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';

const disputesdetailsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#FA114F', width: wp('100%'), height: hp('15%'), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                    <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%'), }} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('4%'), fontWeight: 'bold', marginLeft: hp('3%'), color: '#FFFFFF' }}>Chat Disputes</Text>
            </View>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.chatdisputeview}>
                        <View onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('0%'), }}>
                            <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>The Consultant Did not Respond </Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>14/02/2021 , 2:30 PM</Text>
                            </View>
                            <TouchableOpacity style={{ width: wp('27%'), height: hp('5%'), backgroundColor: '#C4C4C4', marginRight: hp('3%'), borderRadius: wp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2.5%'), color: '#303030' }}>In Review</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.chatdisputeview}>
                        <View onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('0%'), }}>
                            <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Chat did not go thorugh </Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>28/02/2021 , 2:30 PM</Text>
                            </View>
                            <TouchableOpacity style={{ width: wp('27%'), height: hp('5%'), backgroundColor: '#04DE71', marginRight: hp('3%'), borderRadius: wp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2.5%'), color: '#FFFFFF' }} >Dipute Won </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.chatdisputeview}>
                        <View onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('0%'), }}>
                            <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Chat did not go thorugh </Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>14/02/2021 , 2:30 PM</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("disputesdetailsScreen") }}
                                style={{ width: wp('27%'), height: hp('5%'), backgroundColor: '#04DE71', marginRight: hp('3%'), borderRadius: wp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2.5%'), color: '#FFFFFF' }}>Dipute Lost</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.mycommentview}>
                        <Text style={{ fontSize: hp('2.5%'), padding: hp('1%') }}> My Comment</Text>
                        <Text style={{ fontSize: hp('2.5%'), padding: hp('1%'), marginLeft: hp('1%') }}> Chat Ended abruptly consultant logged out and I was charge full amount.</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                            <Image source={require('../../assets/Images/img.png')} style={{ width: 200, height: 200, }} />
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: hp('10%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default disputesdetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    chatdisputeview: {
        height: hp('10%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('1.5%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 3,
        justifyContent: 'center'
    },
    mycommentview: {
        height: hp('52%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('1.5%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 3,
        //justifyContent: 'center'
    }
})