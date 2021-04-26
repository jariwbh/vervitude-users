import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as STYLES from './styles';

const rechargepaymentScreen = (props) => {
    return (
        <SafeAreaView style={STYLES.rechargePaymentStyles.container}>
            <StatusBar hidden backgroundColor='#04DE71' barStyle='light-content' />
            <View style={STYLES.myWalletStyles.headerstyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>My Wallet</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-start', marginRight: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('homeScreen')}>
                            <Image source={require('../../assets/Images/homeicon.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView>
                <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000000' }}>Recharge Amount</Text>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#555555' }}>₹ 1,500</Text>
                </View>
                <View style={{ marginTop: 15, marginLeft: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#34A853' }}>Recharge Summary</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <View style={STYLES.rechargePaymentStyles.gamountview}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, marginLeft: 20 }}>Balance Post Recharge </Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: '#04DE71', marginRight: 20 }}>₹ 1,730</Text>
                            <TouchableOpacity onPress={() => { props.navigation.navigate(myProfileScreen) }}>
                                <AntDesign name='downsquare' color='#35A453' size={15} style={{ marginRight: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#34A853' }}>Payment Options</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <View style={STYLES.rechargeDetailStyles.bankview}>
                        <Text style={{ fontSize: 14, color: '#000000', marginLeft: 20 }}>Credit Card</Text>
                        <TouchableOpacity >
                            <Ionicons name='radio-button-on' color='#04DE71' size={30} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <View style={STYLES.rechargeDetailStyles.bankview}>
                        <Text style={{ fontSize: 14, color: '#000000', marginLeft: 20 }}>Debit Card</Text>
                        <TouchableOpacity >
                            <Ionicons name='radio-button-off' color='#999999' size={30} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <View style={STYLES.rechargeDetailStyles.bankview}>
                        <Text style={{ fontSize: 14, color: '#000000', marginLeft: 20 }}>Net Banking</Text>
                        <TouchableOpacity >
                            <Ionicons name='radio-button-off' color='#999999' size={30} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <View style={STYLES.rechargeDetailStyles.bankview}>
                        <Text style={{ fontSize: 14, color: '#000000', marginLeft: 20 }}>Wallet</Text>
                        <TouchableOpacity >
                            <Ionicons name='radio-button-off' color='#999999' size={30} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <View style={STYLES.rechargeDetailStyles.bankview}>
                        <Text style={{ fontSize: 14, color: '#000000', marginLeft: 20 }}>UPI</Text>
                        <TouchableOpacity >
                            <Ionicons name='radio-button-off' color='#999999' size={30} style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity style={STYLES.rechargeDetailStyles.addmoney} onPress={() => { props.navigation.navigate('rechargepaymentScreen') }} >
                        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Procceed</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Current Balance ₹ 1,000</Text>
                </View>
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default rechargepaymentScreen


