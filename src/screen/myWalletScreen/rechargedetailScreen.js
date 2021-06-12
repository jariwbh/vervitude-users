import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar, ToastAndroid, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as STYLES from './styles';
import * as SCREEN from '../../context/screen/screenName';
import { BillService, WalletDetailService, WalletRechargeWithCouponService, BillPaymentService } from '../../services/BillService/BillService';
import Loader from '../../components/loader/index';
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const rechargedetailScreen = (props) => {
    const rechargeDetails = props.route.params.rechargeObj;
    const [loading, setloading] = useState(true);
    const [userDetails, setuserDetails] = useState(null);
    const [walletBalance, setwalletBalance] = useState(null);
    const [selected, setSelected] = useState(false);
    const [billRes, setbillRes] = useState(null);

    useEffect(() => {
        getWallatBalance();
        getUserData();
    }, [])

    useEffect(() => {
    }, [loading, walletBalance, selected, userDetails, billRes])

    //get AsyncStorage current user Details
    const getUserData = async () => {
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        if (getUser == null) {
            setTimeout(() => {
                props.navigation.replace(SCREEN.LOGINSCREEN)
            }, 3000);;
        } else {
            var UserInfo = JSON.parse(getUser);
            setuserDetails(UserInfo);
        }
    }

    //get wallate Balance api call
    const getWallatBalance = async () => {
        try {
            const response = await WalletDetailService(rechargeDetails.id);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setwalletBalance(response.data[0].walletbalance)
                setloading(false);
            }
        } catch (error) {
            // console.log(`error`, error);
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

    //razorpay function
    const razorPay = (options, res) => {
        setloading(false);
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log(`Success`, data.razorpay_payment_id);
            genratebill(res)
        }).catch((error) => {
            // handle failure
            setloading(false);
            props.navigation.navigate(SCREEN.MYWALLETSCREEN);
            console.log(`error`, error)
        });
    }

    //generate bill function
    const genratebill = async (res) => {
        setloading(true);
        try {
            let billpayment = {
                "customerid": rechargeDetails.id,
                "onModel": "Member",
                "paymentdate": moment().format(),
                "billid": res._id,
                "amount": rechargeDetails.amount,
                "totalamount": rechargeDetails.amount,
                "paidamount": rechargeDetails.amount
            }
            const billPaymentResponse = await BillPaymentService(billpayment);
            if (billPaymentResponse.data != null && billPaymentResponse.data != 'undefind' && billPaymentResponse.status == 200) {
                if (rechargeDetails && rechargeDetails.couponDetails) {
                    let walletbody = {
                        "txntype": "Cr",
                        "txnref": `Wallet recharged bill no ${billPaymentResponse.data.prefix}-${billPaymentResponse.data.receiptnumber} - ${rechargeDetails.couponDetails.couponcode}`,
                        "txndate": moment().format(),
                        "customerid": rechargeDetails.id,
                        "onModel": "Member",
                        "value": rechargeDetails.couponDetails.property.fixvalue
                    }
                    const response1 = await WalletRechargeWithCouponService(walletbody);
                    if (response1.data != null && response1.data != 'undefind' && response1.status === 200) {
                        setloading(false);
                        props.navigation.navigate(SCREEN.MYWALLETSCREEN);
                    }
                }
                setloading(false);
                props.navigation.navigate(SCREEN.MYWALLETSCREEN);
            }
        } catch (error) {
            console.log(`error`, error);
            setloading(false);
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
                "totalamount": rechargeDetails.amount,
                "type": "Walletrecharge",
                "items": [{
                    "item": {
                        "_id": "60a2236e48c98c3638e8b2ac",
                        "sale": {
                            "taxes": [{
                                "taxname": "GST",
                                "amount": 18
                            }],
                            "rate": 1
                        }
                    },
                    "sale": {
                        "taxes": [{
                            "taxname": "GST",
                            "amount": 18
                        }],
                        "rate": 1
                    },
                    "quantity": Math.round(Number(rechargeDetails.amount) / ((Number(18) / Number(100)) + 1))
                }]
            }
            const response = await BillService(body);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setloading(true);
                setbillRes(response.data);
                var options = {
                    description: 'Wallet Recharge',
                    image: userDetails && userDetails.profilepic ? userDetails.profilepic : noProfile,
                    currency: 'INR',
                    key: 'rzp_test_ab33l8rxSjcnJZ', // Your api key
                    amount: rechargeDetails.amount,
                    name: userDetails.fullname,
                    prefill: {
                        email: userDetails.property.primaryemail,
                        contact: userDetails.property.mobile,
                        name: userDetails.fullname
                    },
                    theme: { color: '#04DE71' }
                }
                razorPay(options, response.data)
            }
        } catch (error) {
            setloading(false);
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
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#555555' }}>₹ {rechargeDetails && rechargeDetails.amount}</Text>
                </View>
                <View style={{ marginTop: 15, marginLeft: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#34A853' }}>Recharge Summary</Text>
                </View>
                {
                    rechargeDetails && rechargeDetails.couponDetails ?
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
                                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Coupon Applied ({rechargeDetails.couponDetails.property.title})</Text>
                                            <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}> ₹ {rechargeDetails.couponDetails.property.fixvalue}</Text>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>GST (18%) </Text>
                                            <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}>- ₹ {Math.round((Number(rechargeDetails.amount) + Number(rechargeDetails.couponDetails.property.fixvalue)) - (Number(rechargeDetails.amount) + Number(rechargeDetails.couponDetails.property.fixvalue)) / ((Number(18) / Number(100)) + 1))}</Text>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Balance Added </Text>
                                            <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {Math.round((Number(rechargeDetails.amount) + Number(rechargeDetails.couponDetails.property.fixvalue)) / ((Number(18) / Number(100)) + 1))}</Text>
                                        </View>
                                        <View style={{ marginTop: 14, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>New Balance </Text>
                                            <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {Math.round((Number(rechargeDetails.amount) + Number(rechargeDetails.couponDetails.property.fixvalue)) / ((Number(18) / Number(100)) + 1)) + Number(walletBalance)}</Text>
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
                        :
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
                                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Coupon Applied </Text>
                                            <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}> ₹ 0</Text>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>GST (18%) </Text>
                                            <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}>- ₹  {Math.round((Number(rechargeDetails.amount)) - (Number(rechargeDetails.amount) / ((Number(18) / Number(100)) + 1)))}</Text>
                                        </View>
                                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Balance Added </Text>
                                            <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {Math.round(Number(rechargeDetails.amount) / ((Number(18) / Number(100)) + 1))}</Text>
                                        </View>
                                        <View style={{ marginTop: 14, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>New Balance </Text>
                                            <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {Math.round(Number(rechargeDetails.amount) / ((Number(18) / Number(100)) + 1)) + Number(walletBalance)}</Text>
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

                }
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
                <View style={{ marginBottom: 0 }}></View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default rechargedetailScreen;

