import React from 'react'
import { Text, View, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const rechargepaymentScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: 'green', width: wp('100%'), height: hp('15%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                    <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%'), }} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('4%'), marginLeft: hp('-25%'), color: '#FFFFFF' }}>My Wallet</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate(myProfileScreen) }}>
                    <Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%'), }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ marginTop: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>Recharge Amount</Text>
                    <Text style={{ fontSize: hp('4%'), fontWeight: 'bold' }}>₹ 1,500</Text>
                </View>
                <View style={{ marginLeft: hp('3%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: 'green' }}>Recharge Summary</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.gamountview}>
                        <Text style={{ fontSize: hp('2.5%'), marginLeft: wp('2%') }}>Balance Post Recharge </Text>
                        <Text style={{ fontSize: hp('3%'), marginLeft: wp('17%'), color: '#35A453' }}>1730</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate(myProfileScreen) }}>
                            <AntDesign name="upsquare" color="#35A453" size={30} style={{ marginRight: wp('3%'), }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginLeft: hp('3%'), marginTop: hp('3%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: 'green' }}>Payment Options</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('3%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>Credit Card</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-on" color="#35A453" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('3%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>Debit Card</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-off" color="#000000" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('3%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>Net Banking</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-off" color="#000000" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('3%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>Wallet</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-off" color="#000000" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('3%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>UPI</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-off" color="#000000" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                    <TouchableOpacity style={styles.addmoney} onPress={() => { props.navigation.navigate("rechargedetailScreen") }}>
                        <Text style={{ color: '#FFFFFF', fontSize: hp('3%') }}>Procceed</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' }}>Current Balanced ₹ 1,000</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default rechargepaymentScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    amount: {
        width: wp('20%'),
        height: hp('7%'),
        borderRadius: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: hp('0.3%')
    },
    gamountview: {
        height: hp('7%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('1.5%'),
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 5,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bankview: {
        height: hp('8%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        marginTop: hp('1%'),
        borderRadius: hp('3%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addmoney: {
        width: wp('40%'),
        height: hp('7%'),
        borderRadius: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
})