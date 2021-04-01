import React from 'react'
import { Text, View, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const myspendsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#FA114F', width: wp('100%'), height: hp('15%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                    <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%'), }} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('4%'), marginLeft: hp('-8%'), color: '#FFFFFF', fontWeight: 'bold' }}>My Spends</Text>
                <TouchableOpacity
                    style={{ height: hp('6%'), width: wp('35%'), backgroundColor: '#FFFFFF', flexDirection: 'row', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', marginRight: wp('2%') }}>
                    <Text style={{ fontSize: hp('2.8%'), color: '#04DE71' }}>₹ 5000</Text>
                    <View style={{ marginLeft: hp('2%'), justifyContent: 'center' }}>
                        <MaterialIcons name="account-balance-wallet" size={25} color='#04DE71' />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.walletview}>
                    <Text style={{ fontSize: hp('2%'), color: '#9D9D9D' }}>Wallet Balance</Text>
                    <Text style={{ fontSize: hp('4%'), color: '#04DE71' }}>₹ 5000.00</Text>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.walletview}>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#000000' }} >
                        {/* <Image source={require('../../assets/Images/Ellipse4.png')}
                            style={{ width: 20, height: 20,}}
                        /> */}
                    </View>
                </View>

            </View>
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
        height: hp('30%'),
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
})