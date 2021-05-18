import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import WallateButton from '../../components/WallateButton/WallateButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as STYLES from './styles';
import { WalletDetailService } from '../../services/BillService/BillService';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import Loader from '../../components/loader/index';

const myspendsScreen = (props) => {
    const [loading, setloading] = useState(true);
    const [walletBalance, setwalletBalance] = useState(null);

    useEffect(
        () => {
            AsyncStorage.getItem(AUTHUSER).then(async (res) => {
                let userId = JSON.parse(res)._id;
                try {
                    const response = await WalletDetailService(userId);
                    if (response.data != null && response.data != 'undefind' && response.status === 200) {
                        setwalletBalance(response.data[0].walletbalance);
                        setloading(false);
                    }
                } catch (error) {
                    console.log(`error`, error);
                }
            });
        },
        []
    )

    useEffect(() => {
    }, [walletBalance])

    return (
        <SafeAreaView style={STYLES.styles.container}>
            <StatusBar hidden backgroundColor='#FFE64F' barStyle='light-content' />
            <View style={STYLES.styles.headerstyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 28, color: '#FFFFFF', fontWeight: 'bold' }}>My Spends</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <WallateButton onPress={() => props.navigation.navigate('myWalletScreen')} />
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <View style={STYLES.styles.walletview}>
                        <Text style={{ fontSize: 14, color: '#9D9D9D' }}>Wallet Balance</Text>
                        <Text style={{ fontSize: 26, color: '#04DE71', fontWeight: 'bold' }}>₹ {Number(walletBalance)}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <View style={STYLES.styles.counsultantview}>
                        <View style={STYLES.styles.cauve}>
                            <FontAwesome name='circle' size={110} color='#FFB629' />
                            <Image source={require('../../assets/Images/medal1.png')}
                                style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: -40, flex: 1 }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: 100, borderWidth: 1 }}
                            />
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', marginTop: -20 }}>Ravindra</Text>
                                <Text style={{ fontSize: 16, color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#C2C2C2' }} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: 12, color: '#000000' }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontSize: 16, color: '#FB3267', fontWeight: 'bold' }}>₹ 2,000</Text>
                                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>2h10min</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <View style={STYLES.styles.counsultantview}>
                        <View style={STYLES.styles.cauve}>
                            <FontAwesome name='circle' size={110} color='#FFB629' />
                            <Image source={require('../../assets/Images/medal1.png')}
                                style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: -40, flex: 1 }}>
                            <Image source={require('../../assets/Images/user1.png')}
                                style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: 100, borderWidth: 1 }}
                            />
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', marginTop: -20 }}>Ruby</Text>
                                <Text style={{ fontSize: 16, color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#C2C2C2' }} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: 12, color: '#000000' }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontSize: 16, color: '#FB3267', fontWeight: 'bold' }}>₹ 2,000</Text>
                                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>2h10min</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
            { loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default myspendsScreen
