import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar, RefreshControl, FlatList, Pressable } from 'react-native';
import WallateButton from '../../components/WallateButton/WallateButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as STYLES from './styles';
import { WalletDetailService, WalletUsageListService } from '../../services/BillService/BillService';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import Loader from '../../components/loader/index';
import moment from 'moment';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const myspendsScreen = (props) => {
    const [loading, setloading] = useState(true);
    const [walletBalance, setwalletBalance] = useState(null);
    const [refreshing, setrefreshing] = useState(false);
    const [consultantList, setconsultantList] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(
        () => {
            AsyncStorage.getItem(AUTHUSER).then(async (res) => {
                let userId = JSON.parse(res)._id;
                setUserId(userId);
                getWallateUsageList(userId);
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
    }, [walletBalance, userId, refreshing, consultantList])

    //get wallate usage list
    const getWallateUsageList = async () => {
        try {
            const response = await WalletUsageListService();
            console.log(`response.data `, response);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setconsultantList(response.data);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //wait timeout function
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //get pull to refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getWallateUsageList();
        wait(3000).then(() => setrefreshing(false));
    }

    //render consultants lists using flatlist
    const renderConsultantList = ({ item }) => (
        <Pressable onPress={() => props.navigation.navigate(SCREEN.CONSULTANTSSCREEN, { item })}
            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, flex: 1 }}>
            <View style={STYLES.styles.counsultantview}>
                {/* <View style={STYLES.styles.cauve}>
                    <FontAwesome name='circle' size={110} color='#FFB629' />
                    <Image source={require('../../assets/Images/medal1.png')}
                        style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                    />
                </View> */}
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 0, marginLeft: 20, flex: 1 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Image source={{ uri: item ? item.profilepic !== null && item.profilepic ? item.profilepic : noProfile : null }}
                            style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: 100, borderWidth: 1 }}
                            imageStyle={{ borderRadius: 100 }}
                        >
                        </Image>
                    </View>

                    <View style={{ marginLeft: 30 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', textTransform: 'capitalize' }}>{item.consultant.property.first_name}</Text>
                        <Text style={{ fontSize: 16, color: '#999999', textTransform: 'capitalize' }}>{item.consultant.property.usertag}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#C2C2C2' }} />
                        </View>

                        <Text style={{ fontSize: 12, color: '#999999' }}>Speciliazition</Text>
                        <Text style={{ fontSize: 12, color: '#000000' }}>
                            {
                                item.skills ?
                                    item.skills.map(({
                                        title
                                    }) => title).join(',')
                                    : null
                            }
                            CRM,Digital Marketing,Marketing
                        </Text>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 16, color: '#FB3267', fontWeight: 'bold' }}>₹ {Number(item.paidamount)}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 100 }}>
                                <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{moment.utc(moment.duration(item.items[0].quantity, "minutes").asMilliseconds()).format("H") + 'h'
                                    + moment.utc(moment.duration(item.items[0].quantity, "minutes").asMilliseconds()).format("mm") + 'min'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )

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

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps={'always'}
                refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#00D9CE" titleColor="#00D9CE" colors={["#00D9CE"]} onRefresh={() => onRefresh()} />}>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <View style={STYLES.styles.walletview}>
                        <Text style={{ fontSize: 14, color: '#9D9D9D' }}>Wallet Balance</Text>
                        <Text style={{ fontSize: 26, color: '#04DE71', fontWeight: 'bold' }}>₹ {Number(walletBalance)}</Text>
                    </View>
                </View>

                {(consultantList == null) || (consultantList && consultantList.length == 0) ?
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#747474', marginTop: 50 }}>No Spends</Text>
                    :
                    <FlatList
                        renderItem={renderConsultantList}
                        data={consultantList}
                        keyExtractor={item => `${item._id}`}
                    />
                }
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
            { loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default myspendsScreen
