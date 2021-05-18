import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as STYLES from './styles';
import * as SCREEN from '../../context/screen/screenName';
import { BillService, WalletDetailService } from '../../services/BillService/BillService';
import Loader from '../../components/loader/index';
import moment from 'moment';

const rechargedetailScreen = (props) => {
    const rechargeDetails = props.route.params.rechargeObj;
    const [loading, setloading] = useState(true);
    const [walletBalance, setwalletBalance] = useState(null);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        getWallatBalance();
    })

    useEffect(() => {
    }, [loading, walletBalance, selected])

    //get wallate Balance api call
    const getWallatBalance = async () => {
        try {
            const response = await WalletDetailService(rechargeDetails.id);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setwalletBalance(response.data[0].walletbalance)
                setloading(false);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //expand wallate details
    const showRechargeDeatils = (val) => {
        if (val == true) {
            setSelected(true);
        } else if (val == false) {
            setSelected(false);
        }
    }

    //open Payment Screen
    const openPaymentScreen = async () => {
        setloading(true);
        try {
            let body = {
                "customerid": rechargeDetails.id,
                "onModel": "Member",
                "billdate": moment().format(),
                "amount": rechargeDetails.amount,
                "totalamount": rechargeDetails.amount,
                "taxes": [],
                "balance": rechargeDetails.amount,
                "paidamount": 0,
                "type": "Walletrecharge",
                "items": [{
                    "item": {
                        "_id": "60a2236e48c98c3638e8b2ac",
                        "sale": {
                            "taxes": [],
                            "rate": 1
                        }
                    },
                    "sale": {
                        "taxes": [],
                        "rate": 1
                    },
                    "quantity": rechargeDetails.amount,
                    "cost": rechargeDetails.amount,
                    "totalcost": rechargeDetails.amount
                }]
            }
            const response = await BillService(body);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                let id = response.data._id;
                props.navigation.navigate(SCREEN.RECHARGEPAYMENTSCREEN, { id })
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    return (
        <SafeAreaView style={STYLES.rechargeDetailStyles.container}>
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

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000000' }}>Recharge Amount</Text>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#555555' }}>₹ {rechargeDetails.amount}</Text>
                </View>
                <View style={{ marginTop: 15, marginLeft: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#34A853' }}>Recharge Summary</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>

                    {selected == true ?
                        <View style={STYLES.rechargeDetailStyles.gamountview}>
                            <View style={{ marginLeft: 20, marginRight: 20 }}>
                                <TouchableOpacity
                                    onPress={() => showRechargeDeatils(false)}
                                    style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 15, marginRight: 0 }}>
                                    <Image source={require('../../assets/Images/squarefilled.png')} style={{ height: 15, width: 15 }} />
                                </TouchableOpacity>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Recharge Amount</Text>
                                    <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}> ₹ {rechargeDetails.amount}</Text>
                                </View>
                                <View style={{ marginTop: 14, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Coupon Applied (FirstRecharge - + ₹ 500)</Text>
                                    <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}> ₹ 0</Text>
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>GST (18%) </Text>
                                    <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}>- ₹  0</Text>
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Balance Added </Text>
                                    <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {rechargeDetails.amount}</Text>
                                </View>
                                <View style={{ marginTop: 14, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>New Balance </Text>
                                    <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {rechargeDetails.amount}</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                            <View style={STYLES.rechargePaymentStyles.gamountview}>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, marginLeft: 20 }}>Balance Post Recharge </Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#04DE71', marginRight: 20 }}>₹ {rechargeDetails.amount}</Text>
                                    <TouchableOpacity onPress={() => showRechargeDeatils(true)}>
                                        <AntDesign name='downsquare' color='#35A453' size={15} style={{ marginRight: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                </View>

                {/* <View style={{ marginLeft: 20, marginTop: 20 }}>
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
                </View> */}

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <TouchableOpacity style={STYLES.rechargeDetailStyles.addmoney} onPress={() => openPaymentScreen()} >
                        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Procceed</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Current Balance ₹ {Number(walletBalance)}</Text>
                </View>
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default rechargedetailScreen;

