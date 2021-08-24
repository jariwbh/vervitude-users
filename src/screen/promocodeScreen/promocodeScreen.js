import React, { useState, useEffect } from 'react';
import {
    Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image,
    TextInput, ScrollView, FlatList, RefreshControl
} from 'react-native';
import PromoCodeService from '../../services/PromoCodeService/PromoCodeService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import HTML from 'react-native-render-html';
import * as STYLES from './styles';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';

const promocodeScreen = (props) => {
    const [SearchPromoCode, setSearchPromoCode] = useState([]);
    const [promoCodeList, setPromoCodeList] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        couponService();
    }, [])

    useEffect(() => {
    }, [SearchPromoCode, promoCodeList, refreshing, loading])

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = () => {
        setrefreshing(true);
        couponService();
        wait(3000).then(() => setrefreshing(false));
    }

    //coupon Service List Service to call function
    const couponService = async () => {
        try {
            const response = await PromoCodeService();
            if (response.data != null && response.data != undefined && response.status == 200) {
                setPromoCodeList(response.data);
                setSearchPromoCode(response.data);
                setloading(false);
            }
        } catch (error) {
            //  console.log(`error`, error);
        }
    }

    //on search filter function
    const searchFilterFunction = (text) => {
        const newData = SearchPromoCode.filter(item => {
            const itemData = `${item.property.couponcode.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return wait(1000).then(() => setPromoCodeList(newData));
    };

    //select to collapsible (show data)
    const onPressToSelectPromoCode = (item, index) => {
        const coupon = promoCodeList.map((item) => {
            item.selected = false;
            return item;
        });
        coupon[index].selected = true;
        setPromoCodeList(coupon);
    }

    //onpress to apply coupon code 
    const applyCoupon = (coupon) => {
        props.navigation.push(SCREEN.MYWALLETSCREEN, { coupon });
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
                    <TouchableOpacity onPress={() => applyCoupon(item)}>
                        <Text style={{ fontSize: 14, color: '#787AFF', fontWeight: 'bold', marginRight: 20 }}>Apply</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                {
                    item.selected == true &&
                    <>
                        {/* <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', marginLeft: 30, marginRight: 30 }}></View>
                        </View> */}
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
            <GeneralStatusBarColor hidden={'false'} translucent={'true'} backgroundColor="transparent" barStyle="dark-content" />
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

            <ScrollView showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#787AFF" titleColor="#787AFF" colors={["#787AFF"]} onRefresh={() => onRefresh()} />}>

                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-around' }}>
                    <TextInput
                        style={STYLES.styles.TextInput}
                        placeholder='Type Here'
                        underlineColorAndroid='#FFFFFF'
                        placeholderTextColor="#FFFFFF"
                        type='clear'
                        autoCorrect={false}
                        onChangeText={(value) => searchFilterFunction(value)}
                        autoCapitalize='characters'
                    />
                    <TouchableOpacity style={{ marginTop: 25 }}>
                        <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' }}>Apply</Text>
                    </TouchableOpacity>
                </View>

                <View style={STYLES.styles.mainCardView}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' }}>Available Promotions</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

                        {(promoCodeList == null) || (promoCodeList && promoCodeList.length == 0) ?
                            (loading ? null :
                                <Text style={{ textAlign: 'center', fontSize: 16, color: '#747474', marginTop: 50 }}>Promo Code not available</Text>
                            )
                            :
                            <FlatList
                                data={promoCodeList}
                                renderItem={renderCoupon}
                                keyExtractor={(item, index) => item._id}
                            />
                        }
                    </View>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default promocodeScreen;