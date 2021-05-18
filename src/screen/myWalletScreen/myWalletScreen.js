import React, { useState, useEffect } from 'react';
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

const myWalletScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [userID, setUserID] = useState(null);
    const [amount, setAmount] = useState(null);
    const [walletBalance, setwalletBalance] = useState(null);
    const [wallateHistory, setwallateHistory] = useState([]);

    //get AsyncStorage current user Details
    const getUserDetails = async () => {
        AsyncStorage.getItem(AUTHUSER).then((res) => {
            let userID = JSON.parse(res)._id;
            setloading(true);
            if (userID == null) {
                setTimeout(() => {
                    props.navigation.replace(SCREEN.LOGINSCREEN)
                }, 3000);;
            } else {
                setUserID(userID);
                getWallatBalance(userID);
                wallateBillList(userID);
            }
        });
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    useEffect(() => {
    }, [loading, amount, userID, walletBalance, wallateHistory])

    //get wallate Balance api call
    const getWallatBalance = async (userID) => {
        try {
            const response = await WalletDetailService(userID);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setwalletBalance(response.data[0].walletbalance);
                setloading(false);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //on touch to navigate screen
    const onPressRecharge = () => {
        if (amount != null) {
            let rechargeObj = { id: userID, amount: amount }
            props.navigation.navigate(SCREEN.RECHARGEDETAILSCREEN, { rechargeObj })
        } else {
            alert('Please Enter Amount');
        }
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
                    <TouchableOpacity onPress={() => onPressToSelectExpandWallate(item, index)}
                        style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: 50, height: 50, marginLeft: 15, backgroundColor: '#04DE71', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name='rupee' size={20} color='#FFFFFF' />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: -100 }}>
                            <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>Credit Card</Text>
                            <Text style={{ fontSize: 12, color: '#000000', marginLeft: 15 }}>Success</Text>
                            <Text style={{ fontSize: 12, color: '#999999', marginLeft: 15 }}> 2:30PM</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#34A853', marginTop: 5, marginRight: 20 }}> ₹ {Number(item.amount)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            :
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={STYLES.myWalletStyles.gamountview}>
                    <View style={{ marginLeft: 20, marginRight: 20 }}>
                        <TouchableOpacity
                            onPress={() => onPressToSelectExpandWallate(item, index)}
                            style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 15, marginRight: 15 }}>
                            <Image source={require('../../assets/Images/squarefilled.png')}
                                style={{ height: 15, width: 15 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }}
                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{ width: 50, height: 50, marginTop: -10, backgroundColor: '#04DE71', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name='rupee' size={20} color='#FFFFFF' />
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: -90 }}>
                                <Text style={{ fontSize: 14, color: '#000000', marginTop: -20, marginLeft: 15 }}>Credit Card</Text>
                                <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>Success</Text>
                                <Text style={{ fontSize: 14, color: '#999999', marginLeft: 15 }}> 2:30PM</Text>
                            </View>
                            <Text style={{ fontSize: 14, color: '#04DE71', marginTop: 5, marginRight: 20 }}> ₹ {Number(item.amount)}</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></View>
                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>Recharge Amount</Text>
                            <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}> ₹ {Number(item.amount)}</Text>
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
                            <Text style={{ fontSize: 12, color: '#000000', marginRight: 20 }}>- ₹ 0</Text>
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
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginLeft: 15, color: '#999999' }}>New Balance </Text>
                            <Text style={{ fontSize: 14, color: '#04DE71', marginRight: 20 }}> ₹ {Number(item.amount)}</Text>
                        </View>
                    </View>
                </View>
            </View>
    )

    //select to collapsible (show data)
    const onPressToSelectExpandWallate = (item, index) => {
        const reacharge = wallateHistory.map((item) => {
            item.selected = false;
            return item;
        });
        reacharge[index].selected = true;
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20 }}>
                    <TextInput
                        style={STYLES.myWalletStyles.TextInput}
                        placeholder='₹ Amount'
                        underlineColorAndroid='#999999'
                        defaultValue={amount}
                        keyboardType='number-pad'
                        onChangeText={(amount) => setAmount(amount)}
                    />
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => props.navigation.navigate(SCREEN.PROMOCODESCREEN)}>
                        <Text style={{ fontSize: 14, color: 'blue' }}>Apply Promo Code</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                    <TouchableOpacity style={STYLES.myWalletStyles.amount} onPress={() => setAmount('500')}>
                        <Text style={{ fontSize: 16 }}>₹ 500</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={STYLES.myWalletStyles.amount} onPress={() => setAmount('1000')}>
                        <Text style={{ fontSize: 16 }}>₹ 1,000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={STYLES.myWalletStyles.amount} onPress={() => setAmount('3000')}>
                        <Text style={{ fontSize: 16 }}>₹ 3,000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={STYLES.myWalletStyles.amount} onPress={() => setAmount('10000')}>
                        <Text style={{ fontSize: 16 }}>₹ 10,000</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity style={STYLES.myWalletStyles.addmoney} onPress={() => onPressRecharge()}>
                        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Add Money</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Current Balanced ₹ {Number(walletBalance)}</Text>
                </View>

                <View style={STYLES.myWalletStyles.rechargeview}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#34A853', marginTop: 15 }}>Recharge History</Text>
                    <View style={{ marginLeft: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 14, color: '#999999' }}>14th March 2021</Text>
                    </View>
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <View style={STYLES.myWalletStyles.bankview}>
                            <TouchableOpacity onPress={() => { }}
                                style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ width: 50, height: 50, marginLeft: 15, backgroundColor: '#04DE71', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name='rupee' size={20} color='#FFFFFF' />
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: -100 }}>
                                    <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>Credit Card</Text>
                                    <Text style={{ fontSize: 12, color: '#000000', marginLeft: 15 }}>Success</Text>
                                    <Text style={{ fontSize: 12, color: '#999999', marginLeft: 15 }}> 2:30PM</Text>
                                </View>
                                <Text style={{ fontSize: 14, color: '#34A853', marginTop: 5, marginRight: 20 }}> ₹ 2000.00</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <FlatList
                        renderItem={renderRechargeHistory}
                        data={wallateHistory}
                        keyExtractor={item => item._id}
                    />

                    <View style={{ marginLeft: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 14, color: '#999999' }}>27th Feburary 2021</Text>
                    </View>


                </View>
            </ScrollView>
            { loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default myWalletScreen;

