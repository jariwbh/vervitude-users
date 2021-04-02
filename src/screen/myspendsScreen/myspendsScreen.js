import React from 'react'
import { Text, View, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const myspendsScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#FA114F', width: wp('100%'), height: hp('15%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderBottomLeftRadius: hp('3%'), borderBottomRightRadius: hp('3%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                    <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%') }} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('4%'), marginLeft: hp('-8%'), color: '#FFFFFF', fontWeight: 'bold' }}>My Spends</Text>
                <TouchableOpacity
                    style={{ height: hp('7%'), width: wp('35%'), backgroundColor: '#FFFFFF', flexDirection: 'row', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', marginRight: wp('2%') }}>
                    <Text style={{ fontSize: hp('2.8%'), color: '#04DE71' }}>₹ 5,000</Text>
                    <View style={{ marginLeft: hp('2%'), justifyContent: 'center' }}>
                        <MaterialIcons name="account-balance-wallet" size={25} color='#04DE71' />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.walletview}>
                        <Text style={{ fontSize: hp('2%'), color: '#9D9D9D' }}>Wallet Balance</Text>
                        <Text style={{ fontSize: hp('4%'), color: '#04DE71', fontWeight: 'bold' }}>₹ 5000.00</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <View style={styles.counsultantview}>
                        {/* <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', }}>
                            <View style={styles.pro}>

                            </View>
                        </View> */}
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('5%'), flex: 1 }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: hp('15%'), borderWidth: hp('0.2%') }}
                            />
                            <View>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000', marginTop: hp('-3%') }}>Ravindra</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#C2C2C2' }} />
                                </View>
                                <Text style={{ fontSize: hp('1.8%'), color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: hp('1.8%'), color: '#000000' }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2.5%'), color: '#FB3267', fontWeight: 'bold' }}>₹ 2,000</Text>
                                    <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>2h10min</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.counsultantview}>
                        <View >

                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('5%') }}>
                            <Image source={require('../../assets/Images/user1.png')}
                                style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: hp('15%'), borderWidth: hp('0.2%') }}
                            />
                            <View>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000', marginTop: hp('-2%') }}>Ruby</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#C2C2C2' }} />
                                </View>
                                <Text style={{ fontSize: hp('1.8%'), color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: hp('1.8%'), color: '#000000' }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2.5%'), color: '#FB3267', fontWeight: 'bold' }}>₹ 2,000</Text>
                                    <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>2h10min</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: hp('5%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default myspendsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    walletview: {
        height: hp('25%'),
        width: wp('90%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('1.5%'),
        shadowOpacity: 10,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counsultantview: {
        flex: 1,
        height: hp('25%'),
        width: wp('90%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('1.5%'),
        shadowOpacity: 10,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 15,
    },
    // pro: {
    //     marginTop: hp('-5'),
    //     marginRight: wp('-10%'),
    //     overflow: 'hidden',
    //     // borderBottomColor: "red",
    //     borderTopColor: "transparent",
    //     width: 100,
    //     height: 100,
    //     backgroundColor: 'transparent',
    //     borderTopWidth: 0,

    //     borderLeftColor: "red",
    //     borderLeftWidth: 60,
    //     borderTopColor: "transparent",
    //     borderRightColor: "transparent",
    //     borderRightWidth: 0,

    //     borderBottomWidth: 0,
    //     borderTopLeftRadius: 60,
    //     borderTopRightRadius: 60,
    //     borderBottomRightRadius: 0,
    //     borderBottomLeftRadius: 60,
    // },
})