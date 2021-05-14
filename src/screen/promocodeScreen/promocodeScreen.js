import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native';
import PromoCodeService from '../../services/PromoCodeService/PromoCodeService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../components/loader/index';
import HTML from 'react-native-render-html';
import * as STYLES from './styles';

const promocodeScreen = (props) => {
    const [promoCodeList, setpromoCodeList] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        couponService();
    }, [])

    //coupon Service List Service to call function
    const couponService = async () => {
        try {
            const response = await PromoCodeService();
            if (response.data != null && response.data != undefined && response.status == 200) {
                setpromoCodeList(response.data);
                setloading(false);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //select to collapsible (show data)
    const onPressToSelectPromoCode = (item, index) => {
        const coupon = promoCodeList.map((item) => {
            item.selected = false;
            return item;
        });
        coupon[index].selected = true;
        setpromoCodeList(coupon);
    }

    //render coupon 
    const renderCoupon = ({ item, index }) => (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <View style={item.selected == true ? STYLES.styles.gamountslideview : STYLES.styles.gamountview}>
                <TouchableOpacity onPress={() => onPressToSelectPromoCode(item, index)}

                    style={item.selected == true ?
                        { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 15 } :
                        { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }
                    }
                >
                    <View style={{ marginLeft: 15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image source={require('../../assets/Images/staricon.png')} style={{ height: 50, width: 50 }} />
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>{item.property.title}</Text>
                            <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>{item.property.couponcode}</Text>
                            <View style={{ marginLeft: 15 }}>
                                <HTML
                                    baseFontStyle={{ fontSize: 12, color: '#999999' }}
                                    html={`<html> ${item.property.description.length < 30 ? `${item.property.description}` : `${item.property.description.substring(0, 30)}...`} </html>`} />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ fontSize: 14, color: '#787AFF', fontWeight: 'bold', marginRight: 20 }}>Apply</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                {
                    item.selected == true &&
                    <>
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', marginLeft: 30, marginRight: 30 }}></View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                                <HTML
                                    baseFontStyle={{ fontSize: 12, color: '#000000' }}
                                    html={`<html> ${item.property.description} </html>`} />
                            </View>

                            <TouchableOpacity style={{ marginTop: 20, marginLeft: 20, marginBottom: 15 }}>
                                <Text style={{ fontSize: 12, color: '#787AFF' }}>Terms and Condition Apply</Text>
                            </TouchableOpacity>
                        </View>

                    </>
                }
            </View>
        </View>
    )

    return (
        <SafeAreaView style={STYLES.styles.container}>
            <StatusBar hidden backgroundColor='#787AFF' barStyle='light-content' />
            <View style={STYLES.styles.headerstyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>Promo Code</Text>
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
                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-around' }}>
                    <TextInput
                        style={STYLES.styles.TextInput}
                        placeholder='Type Here'
                        underlineColorAndroid='#999999'
                    />
                    <TouchableOpacity style={{ marginTop: 25 }}>
                        <Text style={{ fontSize: 18, color: '#787AFF', fontWeight: 'bold' }}>Apply</Text>
                    </TouchableOpacity>
                </View>

                <View style={STYLES.styles.mainCardView}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 18, color: '#787AFF', fontWeight: 'bold' }}>Available Promotions</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <FlatList
                            renderItem={renderCoupon}
                            data={promoCodeList}
                            keyExtractor={item => item._id}
                        />
                    </View>

                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                        <View style={STYLES.styles.gamountslideview}>
                            <TouchableOpacity onPress={() => { }}
                                style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ marginLeft: 15 }}>
                                    <Image source={require('../../assets/Images/staricon.png')} style={{ height: 50, width: 50 }} />
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: -80 }}>
                                    <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>First Recharge</Text>
                                    <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>AASDFAS123</Text>
                                    <Text style={{ fontSize: 12, color: '#999999', marginLeft: 15 }}>₹500 Bonus on Minimum ....</Text>
                                </View>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={{ fontSize: 14, color: '#787AFF', fontWeight: 'bold', marginRight: 20 }}>Apply</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', marginLeft: 30, marginRight: 30 }}></View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 14, marginLeft: 20, marginRight: 20 }}>Lorem lpsum is simply dummy text of the printing and typesetting industry </Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 14, marginLeft: 20, marginRight: 20 }}>Lorem lpsum is simply dummy text of the printing and typesetting industry </Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 14, marginLeft: 20, marginRight: 20 }}>Lorem lpsum is simply dummy text of the printing and typesetting industry </Text>
                                </View>
                                <TouchableOpacity style={{ marginTop: 20, marginLeft: 20 }}>
                                    <Text style={{ fontSize: 12, color: '#787AFF' }}>Terms and Condition Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> */}
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default promocodeScreen;