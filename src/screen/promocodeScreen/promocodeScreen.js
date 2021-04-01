import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const promocodeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={{ backgroundColor: '#787AFF', width: wp('100%'), height: hp('15%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                    <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%'), }} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('4%'), fontWeight: 'bold', marginLeft: hp('-20%'), color: '#FFFFFF' }}>Promo Code</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate(myProfileScreen) }}>
                    <Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%'), }} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ flexDirection: 'row', marginTop: hp('1%'), justifyContent: 'space-around' }}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Type Here"
                        underlineColorAndroid='#000000'
                    />
                    <TouchableOpacity style={{ marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('3%'), color: '#787AFF', fontWeight: 'bold' }}>Apply</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                    <Text style={{ fontSize: hp('3%'), color: '#787AFF', fontWeight: 'bold' }}>Available Promotions</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.gamountview}>
                        <TouchableOpacity onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('1%'), }}>
                            <View style={{ width: 40, height: 40, marginLeft: hp('2%'), backgroundColor: 'green', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="rupee" size={25} color='#FFFFFF' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>First Recharge</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>AASDFAS123</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%'), }}>₹500 Bonus on Minimum ....</Text>
                            </View>
                            <Text style={{ fontSize: hp('2%'), color: '#787AFF', marginTop: hp('1%'), fontWeight: 'bold', marginRight: hp('3%') }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.gamountview}>
                        <TouchableOpacity onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('1%'), }}>
                            <View style={{ width: 40, height: 40, marginLeft: hp('2%'), backgroundColor: 'green', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="rupee" size={25} color='#FFFFFF' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>First Recharge</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>AASDFAS123</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%'), }}>₹500 Bonus on Minimum ....</Text>
                            </View>
                            <Text style={{ fontSize: hp('2%'), color: '#787AFF', marginTop: hp('1%'), fontWeight: 'bold', marginRight: hp('3%') }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.gamountview}>
                        <TouchableOpacity onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('1%'), }}>
                            <View style={{ width: 40, height: 40, marginLeft: hp('2%'), backgroundColor: 'green', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="rupee" size={25} color='#FFFFFF' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>First Recharge</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>AASDFAS123</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%'), }}>₹500 Bonus on Minimum ....</Text>
                            </View>
                            <Text style={{ fontSize: hp('2%'), color: '#787AFF', marginTop: hp('1%'), fontWeight: 'bold', marginRight: hp('3%') }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                    <View style={styles.termsview}>
                        <View style={{ marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2.5%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>Lorem lpsum is simply dummy text of the printing and typesetting industry </Text>
                        </View>
                        <View style={{ marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2.5%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>Lorem lpsum is simply dummy text of the printing and typesetting industry </Text>
                        </View>
                        <View style={{ marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2.5%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>Lorem lpsum is simply dummy text of the printing and typesetting industry </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2.5%'), color: '#787AFF', marginLeft: hp('3%'), marginRight: hp('0%') }}>Terms and Condition Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default promocodeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    TextInput: {
        width: wp('60%'),
        height: hp('8%'),
        fontSize: hp('3%'),
    },
    gamountview: {
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
    },
    termsview: {
        height: hp('40%'),
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
    },
})