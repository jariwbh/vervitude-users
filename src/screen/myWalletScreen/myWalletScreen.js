import React from 'react'
import { Text, View, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const myWalletScreen = (props) => {
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: hp('3%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("rechargedetailScreen") }}>
                        <Text style={{ fontSize: hp('4%') }}>₹ Amount</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('2%'), color: 'blue' }}>Apply Promo Code</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp('3%') }}>
                    <TouchableOpacity style={styles.amount}>
                        <Text style={{ fontSize: hp('3%') }}>₹ 500</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amount}>
                        <Text style={{ fontSize: hp('3%') }}>₹ 1000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amount}>
                        <Text style={{ fontSize: hp('3%') }}>₹ 3000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amount}>
                        <Text style={{ fontSize: hp('3%') }}>₹ 10000</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                    <TouchableOpacity style={styles.addmoney}>
                        <Text style={{ color: '#FFFFFF', fontSize: hp('3%') }}>Add Money</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' }}>Current Balanced ₹ 1,000</Text>
                </View>

                <View style={styles.rechargeview}>
                    <Text style={{ textAlign: 'center', fontSize: hp('3%'), fontWeight: 'bold', color: 'green' }}>Recharge History</Text>
                    <View style={{ marginLeft: hp('2%'), marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('2%') }}>14th March 2021</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.bankview}>
                            <TouchableOpacity onPress={() => { }}
                                style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                <View style={{ width: 40, height: 40, marginLeft: hp('2%'), backgroundColor: 'green', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name="rupee" size={25} color='#FFFFFF' />
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: wp('-25%') }}>
                                    <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Credit Card</Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Success</Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%') }}> 2:30PM</Text>
                                </View>
                                <Text style={{ fontSize: hp('2%'), color: '#04DE71', marginTop: hp('1%'), marginRight: hp('3%') }}> ₹ 2000.00</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%') }}>
                        <View style={styles.bankview}>
                            <TouchableOpacity onPress={() => { }}
                                style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                <View style={{ width: 40, height: 40, marginLeft: hp('2%'), backgroundColor: 'red', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name="rupee" size={25} color='#FFFFFF' />
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: wp('-25%') }}>
                                    <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>UPI </Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Failed</Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%') }}>2:30PM</Text>
                                </View>
                                <Text style={{ fontSize: hp('2%'), color: '#04DE71', marginTop: hp('1%'), marginRight: hp('3%') }}> ₹ 1500.00</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.gamountview}>
                            <View style={{ marginLeft: wp('3%'), marginRight: wp('3%') }}>
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('2%') }}>
                                    <Image source={require('../../assets/Images/squarefilled.png')} style={{ height: 20, width: 20, marginRight: hp('2%') }} />
                                </View>
                                <TouchableOpacity onPress={() => { }}
                                    style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('0%') }}>
                                    <View style={{ width: 40, height: 40, marginLeft: hp('2%'), backgroundColor: 'green', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name="rupee" size={25} color='#FFFFFF' />
                                    </View>
                                    <View style={{ flexDirection: 'column', marginLeft: wp('-25%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Credit Card</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Success</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%') }}> 2:30PM</Text>
                                    </View>
                                    <Text style={{ fontSize: hp('2%'), color: '#04DE71', marginTop: hp('1%'), marginRight: hp('3%') }}> ₹ 1500.00</Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>Recharge Amount</Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#04DE71', marginRight: hp('3%') }}> ₹ 1500</Text>
                                </View>
                                <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>Coupon Applied (FirstRecharge - + ₹ 500)</Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#04DE71', marginRight: hp('3%') }}> ₹ 500.00</Text>
                                </View>
                                <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>GST (18%) </Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#999999', marginRight: hp('3%') }}>- ₹  270</Text>
                                </View>
                                <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>Balance Added </Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#999999', marginRight: hp('3%') }}> ₹ 1730</Text>
                                </View>
                                <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>New Balance </Text>
                                    <Text style={{ fontSize: hp('2%'), color: '#999999', marginRight: hp('3%') }}> ₹ 1730</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default myWalletScreen

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
    addmoney: {
        width: wp('40%'),
        height: hp('7%'),
        borderRadius: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    rechargeview: {
        width: wp('100%'),
        height: hp('90%'),
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: hp('5%'),
        borderTopRightRadius: hp('5%'),
        marginTop: hp('3%'),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    bankview: {
        height: hp('12%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        marginTop: hp('0.5%'),
        borderRadius: hp('3%'),
        justifyContent: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },
    gamountview: {
        height: hp('50%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('1.5%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
})