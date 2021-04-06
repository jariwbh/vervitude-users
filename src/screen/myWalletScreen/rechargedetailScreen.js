import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const rechargedetailScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#04DE71', width: wp('100%'), height: hp('15%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("myWalletScreen") }}>
                    <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%'), }} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('3%'), marginLeft: hp('-25%'), color: '#FFFFFF' }}>My Wallet</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate("homeScreen") }}>
                    <Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%'), }} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: hp('2%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#000000' }}>Recharge Amount</Text>
                    <Text style={{ fontSize: hp('4%'), fontWeight: 'bold', color: '#555555' }}>₹ 1,500</Text>
                </View>
                <View style={{ marginTop: hp('2%'), marginLeft: hp('3%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: '#34A853' }}>Recharge Summary</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.gamountview}>
                        <View style={{ marginLeft: wp('3%'), marginRight: wp('3%') }}>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('2%') }}>
                                <Image source={require('../../assets/Images/squarefilled.png')} style={{ height: 12, width: 12, marginRight: hp('2%') }} />
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('2%') }}>
                                <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>Recharge Amount</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginRight: hp('3%') }}> ₹ 1,500</Text>
                            </View>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></View>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>Coupon Applied (FirstRecharge - + ₹ 500)</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginRight: hp('3%') }}> ₹ 500</Text>
                            </View>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>GST (18%) </Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginRight: hp('3%') }}>- ₹ 270</Text>
                            </View>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>Balance Added </Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71', marginRight: hp('3%') }}> ₹ 1,730</Text>
                            </View>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%'), color: '#999999' }}>New Balance </Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71', marginRight: hp('3%') }}> ₹ 1,730</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginLeft: hp('3%'), marginTop: hp('3%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: '#34A853' }}>Payment Options</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>Credit Card</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-on" color="#04DE71" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>Debit Card</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-off" color="#999999" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>Net Banking</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-off" color="#999999" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>Wallet</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-off" color="#999999" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), }}>
                    <View style={styles.bankview}>
                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%'), marginLeft: hp('3%') }}>UPI</Text>
                        <TouchableOpacity >
                            <Ionicons name="radio-button-off" color="#999999" size={30} style={{ marginRight: hp('3%') }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                    <TouchableOpacity style={styles.addmoney} onPress={() => { props.navigation.navigate("rechargepaymentScreen") }} >
                        <Text style={{ color: '#FFFFFF', fontSize: hp('3%') }}>Procceed</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>Current Balance ₹ 1,000</Text>
                </View>
                <View style={{ marginBottom: hp('10%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default rechargedetailScreen

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
        height: hp('40%'),
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
    },
    bankview: {
        height: hp('7%'),
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
        borderRadius: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#04DE71',
        borderWidth: hp('0.2'),
        borderColor: '#2094FA'
    },
})