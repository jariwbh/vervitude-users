import React, { useState, useEffect, useCallback } from 'react';
import {
    Text, View, SafeAreaView, StatusBar, FlatList,
    TouchableOpacity, Image, ScrollView, TextInput
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AUTHUSER } from '../../context/actions/type';
import { BillListService, WalletDetailService } from '../../services/BillService/BillService';
import * as STYLES from './styles';
import * as SCREEN from '../../context/screen/screenName';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../components/loader/index';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

const myWalletScreen = (props) => {
    let couponDetails = props.route.params == undefined ? null : props.route.params.coupon;
    const [loading, setloading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [amount, setAmount] = useState(null);
    const [walletBalance, setwalletBalance] = useState(null);
    const [wallateHistory, setwallateHistory] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem(AUTHUSER).then((res) => {
                let userID = JSON.parse(res)._id;
                setUserID(userID);
                getWallatBalance(userID);
                wallateBillList(userID);
            });
        }, [])
    );

    useEffect(() => {
    }, [loading, amount, userID, walletBalance, wallateHistory]);

    //get wallate Balance api call
    const getWallatBalance = async (userID) => {
        try {
            const response = await WalletDetailService(userID);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setwalletBalance(response.data[0].walletbalance);
                setloading(false);
            }
        } catch (error) {
            //(`error`, error);
        }
    }

    //on touch to navigate screen
    const onPressRecharge = () => {
        let rechargeObj;
        if (amount == null) {
            alert('Please Enter Amount');
            return;
        } else if (Number(amount) < 300) {
            alert('Please Enter Amount 300 or More');
            return;
        }
        setAmount(null);
        rechargeObj = { id: userID, amount: amount, couponDetails: couponDetails }
        props.navigation.navigate(SCREEN.RECHARGEDETAILSCREEN, { rechargeObj })
    }

    //get wallate history list
    const wallateBillList = async (userID) => {
        try {
            const response = await BillListService(userID);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setwallateHistory(response.data);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //render recharge history in flatlist
    const renderRechargeHistory = ({ item, index }) => (
        item.selected != true ?
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <View style={STYLES.myWalletStyles.bankview}>
                    <TouchableOpacity onPress={() => onPressToSelectExpandWallate(item, index, true)}
                        style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: 50, height: 50, marginLeft: 15, backgroundColor: '#04DE71', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name='rupee' size={20} color='#FFFFFF' />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: -80 }}>
                            <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>Wallet Recharge</Text>
                            <Text style={{ fontSize: 12, color: '#000000', marginLeft: 15 }}>{item.status == 'Paid' ? 'Success' : 'Failed'}</Text>
                            <Text style={{ fontSize: 12, color: '#999999', marginLeft: 15 }}>{moment(item.createdAt).format('lll')}</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#34A853', marginTop: 15, marginRight: 20 }}> ₹ {Number(item.paidamount)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            :
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={STYLES.myWalletStyles.gamountview}>
                    <View style={{ marginLeft: 20, marginRight: 20 }}>
                        <TouchableOpacity
                            onPress={() => onPressToSelectExpandWallate(item, index, false)}
                            style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 15, marginRight: 5 }}>
                            <Image source={require('../../assets/Images/squarefilled.png')}
                                style={{ height: 15, width: 15 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }}
                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{ width: 50, height: 50, marginTop: -10, backgroundColor: '#04DE71', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name='rupee' size={20} color='#FFFFFF' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: -80, marginTop: 10, }}>
                                <Text style={{ fontSize: 14, color: '#000000', marginTop: -20, marginLeft: 15 }}>Credit Card</Text>
                                <Text style={{ fontSize: 12, color: '#000000', marginLeft: 15 }}>{item.status == 'Paid' ? 'Success' : 'Failed'}</Text>
                                <Text style={{ fontSize: 12, color: '#999999', marginLeft: 15 }}>{moment(item.createdAt).format('LT')}</Text>
                            </View>
                            <Text style={{ fontSize: 14, color: '#04DE71', marginTop: 5, marginRight: 20 }}> ₹ {Number(item.paidamount)}</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></View>
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Recharge Amount</Text>
                            <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}> ₹ {Number(item.paidamount)}</Text>
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
                            <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}>- ₹ {item.taxamount ? item.taxamount : 0}</Text>
                        </View>
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Balance Added </Text>
                            <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {Number(item.amount)}</Text>
                        </View>
                        <View style={{ marginTop: 14, flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></View>
                        </View>
                        {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>New Balance </Text>
                            <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {Number(item.amount)}</Text>
                        </View> */}
                    </View>
                </View>
            </View>
    )

    //select to collapsible (show data)
    const onPressToSelectExpandWallate = (item, index, val) => {
        const reacharge = wallateHistory.map((item) => {
            item.selected = false;
            return item;
        });
        if (val == false) {
            reacharge[index].selected = false;
        }
        if (val == true) {
            reacharge[index].selected = true;
        }
        setwallateHistory(reacharge);
    }

    return (
        <SafeAreaView style={STYLES.myWalletStyles.container}>
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
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.HOMESCREEN)}>
                            <Image source={require('../../assets/Images/homeicon.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLES.myWalletStyles.homeCardView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                <Text style={{ fontSize: 26, color: '#000000', fontWeight: 'bold' }}>{'₹'}</Text>
                                <TextInput
                                    style={STYLES.myWalletStyles.TextInput}
                                    placeholder='Amount'
                                    placeholderTextColor="#000000"
                                    defaultValue={amount}
                                    keyboardType='number-pad'
                                    onChangeText={(amount) => setAmount(amount)}
                                />
                            </View>

                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => props.navigation.navigate(SCREEN.PROMOCODESCREEN)}>
                                <Text style={{ fontSize: 14, color: '#5A5CC0', fontWeight: 'bold' }}>Apply Promo Code</Text>
                                {couponDetails && couponDetails.couponcode ?
                                    <Text style={{ fontSize: 12, color: '#5A5CC0', fontWeight: 'bold', marginLeft: 25 }}>{`(${couponDetails.couponcode})`}</Text>
                                    : null}
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 0 }}>
                            <TouchableOpacity style={STYLES.myWalletStyles.amount} onPress={() => setAmount('500')}>
                                <Text style={{ fontSize: 14, color: '#000000' }}>₹ 500</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={STYLES.myWalletStyles.amount} onPress={() => setAmount('1000')}>
                                <Text style={{ fontSize: 14, color: '#000000' }}>₹ 1,000</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={STYLES.myWalletStyles.amount} onPress={() => setAmount('3000')}>
                                <Text style={{ fontSize: 14, color: '#000000' }}>₹ 3,000</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={STYLES.myWalletStyles.amount} onPress={() => setAmount('10000')}>
                                <Text style={{ fontSize: 14, color: '#000000' }}>₹ 10,000</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity style={STYLES.myWalletStyles.addmoney} onPress={() => onPressRecharge()}>
                                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Add Money</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Current Balanced ₹ {Number(walletBalance).toFixed(0)}</Text>
                        </View>
                    </View>
                </View>
                {(wallateHistory == null) || (wallateHistory && wallateHistory.length > 0) ?
                    <>
                        <View style={STYLES.myWalletStyles.rechargeview}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginTop: 5, marginBottom: 10 }}>Recharge History</Text>
                            {/* <View style={{ marginLeft: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 14, color: '#999999' }}>14th March 2021</Text>
                    </View> */}
                            <FlatList
                                renderItem={renderRechargeHistory}
                                data={wallateHistory}
                                keyExtractor={item => item._id}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}></View>
                    </>
                    :
                    null
                }
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default myWalletScreen;

