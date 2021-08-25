import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView, TextInput, ScrollView, Dimensions, ImageBackground,
    TouchableOpacity, Image, StatusBar, RefreshControl, Pressable, FlatList, Modal
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import * as STYLES from './styles';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';
import Loader from '../../components/loader/index';
import * as SCREEN from '../../context/screen/screenName';
import { TopConsultantViewListService } from '../../services/UserService/UserService';
import { WalletDetailService } from '../../services/BillService/BillService';
import { AUTHUSER } from '../../context/actions/type';
import AsyncStorage from '@react-native-community/async-storage';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';
const WIDTH = Dimensions.get('window').width;

const newchatsScreen = (props) => {
    const [consultantList, setconsultantList] = useState([]);
    const [SearchConsultant, setSearchConsultant] = useState([]);
    const [userId, setuserId] = useState(null);
    const [loading, setloading] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [walletBalance, setwalletBalance] = useState(null);
    const [wallatemodel, setWallatemodel] = useState(false);

    useEffect(() => {
        setloading(true);
        consultantService();
        AsyncStorage.getItem(AUTHUSER).then(async (res) => {
            let userId = JSON.parse(res)._id;
            setuserId(userId);
            try {
                const response = await WalletDetailService(userId);
                if (response.data != null && response.data != 'undefind' && response.status === 200) {
                    setwalletBalance(response.data[0].walletbalance);
                }
            } catch (error) {
                // console.log(`error`, error);
            }
        });
    }, [])

    useEffect(() => {
    }, [userId, consultantList, refreshing, walletBalance]);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = () => {
        setrefreshing(true);
        consultantService();
        wait(3000).then(() => setrefreshing(false));
    }

    //get Consultants List API
    const consultantService = async () => {
        try {
            const response = await TopConsultantViewListService();
            if (response.status == 200) {
                setconsultantList(response.data);
                setSearchConsultant(response.data);
                setloading(false);
            }
            // axiosConfig(userId);
        } catch (error) {
            //console.log(`error`, error);
        }
    }

    const searchFilterFunction = (text) => {
        const newData = SearchConsultant.filter(item => {
            const itemData = `${item.fullname.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return wait(1000).then(() => setconsultantList(newData));
    };

    //start chat click to navigate screen
    const navigationhandler = (item) => {
        if (walletBalance <= 0) {
            setWallatemodel(true);
        } else {
            const consultanDetails = item;
            props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails });
        }
    }

    //add money model pop function
    const onPressRecharge = () => {
        setWallatemodel(false);
        props.navigation.navigate(SCREEN.MYWALLETSCREEN);
    }

    const renderConsultantList = ({ item }) => (
        <Pressable onPress={() => props.navigation.navigate(SCREEN.CONSULTANTSSCREEN, { item })}
            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <View style={STYLES.newChatStyles.counsultantview}>
                <View style={STYLES.newChatStyles.cauve}>
                    {item.property.consultantgrade && item.property.consultantgrade == "Gold" &&
                        <>
                            <FontAwesome name='circle' size={110} color='#FFB629' />
                            <Image source={require('../../assets/Images/medal1.png')}
                                style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                            />
                        </>
                    }
                    {item.property.consultantgrade && item.property.consultantgrade == "Silver" &&
                        <>
                            <FontAwesome name='circle' size={110} color='#E5E4E2' />
                            <Image source={require('../../assets/Images/medal2.png')}
                                style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                            />
                        </>
                    }
                    {item.property.consultantgrade && item.property.consultantgrade == "Platinum" &&
                        <>
                            <FontAwesome name='circle' size={110} color='#E5E4E2' />
                            <Image source={require('../../assets/Images/medal4.png')}
                                style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                            />
                        </>
                    }
                    {item.property.consultantgrade && item.property.consultantgrade == "Diamond" &&
                        <>
                            <FontAwesome name='circle' size={110} color='#9DF9FF' />
                            <Image source={require('../../assets/Images/medal3.png')}
                                style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                            />
                        </>
                    }
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: -50, flex: 1, marginLeft: 20 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <View style={{ borderColor: '#55BCEB', borderRadius: 100, borderWidth: 1.5 }}>
                            <ImageBackground source={{ uri: item ? item.profilepic !== null && item.profilepic ? item.profilepic : noProfile : null }}
                                style={{ width: 90, height: 90 }}
                                imageStyle={{ borderRadius: 100 }}
                            >
                                {
                                    item.property.live === true ?
                                        <View style={{ marginTop: 10, marginRight: -40, height: 15, width: 15, backgroundColor: '#5AC8FA', borderColor: '#5AC8FA', borderRadius: 100, borderWidth: 1 }}></View>
                                        :
                                        <View style={{ marginTop: 10, marginRight: -40, height: 15, width: 15, backgroundColor: '#555555', borderColor: '#FFFFFF', borderRadius: 100, borderWidth: 1 }}></View>
                                }
                            </ImageBackground>
                        </View>
                        {
                            Number(item.ratinglen) > 1000 ?
                                <View style={{ marginTop: 5, padding: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: '#000000', fontSize: 12, marginRight: 5 }}>{item.ratinglen + 'K'}</Text>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                        rating={item.ratinglen}
                                        fullStarColor={'#F1C40E'}
                                        emptyStarColor={'#000000'}
                                    />
                                </View>
                                :
                                <View style={{ marginTop: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#000000', fontSize: 12 }}>{'New'}</Text>
                                </View>
                        }
                    </View>

                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', textTransform: 'capitalize' }}>{item.property.first_name}</Text>
                        <Text style={{ fontSize: 16, color: '#555555' }}>{item.property.usertag}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                            <View style={{ width: WIDTH / 2, height: 1, backgroundColor: '#C2C2C2' }} />
                        </View>
                        <Text style={{ fontSize: 12, color: '#999999' }}>Speciliazition</Text>
                        <Text style={{ fontSize: 12, color: '#000000', textTransform: 'capitalize', width: 150 }}>
                            {
                                item.skills ?
                                    item.skills.slice(0, 2).map(({
                                        title
                                    }) => title).join(',')
                                    : null
                            }
                        </Text>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ justifyContent: 'center', marginTop: -20 }}>
                                <Text style={{ fontSize: 14, color: '#6ABF81', fontWeight: 'bold' }}>₹ {item.property.chargespermin ? item.property.chargespermin : '0'} per min</Text>
                                {/* <Text style={{ fontSize: 12, color: '#999999' }}>{item.property.location}</Text> */}
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => navigationhandler(item)}
                                    style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
                                    <Image source={require('../../assets/Images/chaticon2.png')} style={{ height: 25, width: 27 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => alert('This feature is currently not available')}
                                    style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginRight: 0 }}>
                                    <Image source={require('../../assets/Images/callicon.png')} style={{ height: 25, width: 25 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )

    return (
        <SafeAreaView style={STYLES.newChatStyles.container}>
            <GeneralStatusBarColor hidden={false} translucent={true} backgroundColor="transparent" barStyle="dark-content" />
            <View style={STYLES.newChatStyles.headerstyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>New Chats</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-start', marginRight: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.HOMESCREEN)}>
                            <Image source={require('../../assets/Images/homeicon.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => { props.navigation.navigate(SCREEN.RECENTCHATSCREEN) }}
                    style={{ width: 150, height: 35, backgroundColor: '#FFFFFF', borderRadius: 100, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                    <Text style={{ fontSize: 14, color: '#5AC8FA' }}>Recent Consultant</Text>
                </TouchableOpacity>
            </View>

            <View style={STYLES.newChatStyles.centerView}>
                <View style={STYLES.newChatStyles.statusbar}>
                    <TouchableOpacity >
                        <AntDesign name='search1' size={20} color='#3399ff' style={{ marginLeft: 20 }} />
                    </TouchableOpacity>
                    <TextInput
                        style={STYLES.newChatStyles.statInput}
                        placeholder='Search Chats'
                        type='clear'
                        placeholderTextColor='#999999'
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(value) => searchFilterFunction(value)}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#FFB629" titleColor="#FFB629" colors={["#FFB629"]} onRefresh={() => onRefresh()} />}>

                {(consultantList == null) || (consultantList && consultantList.length == 0) ?
                    (loading ? null :
                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#747474', marginTop: 50 }}>Consultant are not available</Text>
                    )
                    :
                    <View>
                        <View style={{ marginLeft: 20, marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>Top Consultants</Text>
                        </View>
                        <FlatList
                            renderItem={renderConsultantList}
                            data={consultantList}
                            keyExtractor={item => `${item._id}`}
                        />
                    </View>
                }
                <View style={{ marginBottom: 50 }} />
            </ScrollView>

            {/* Wallate message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={wallatemodel}
                onRequestClose={() => setWallatemodel(false)}
            >
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <View style={{ position: 'absolute', bottom: 20 }}>
                        <View style={STYLES.newChatStyles.msgModalView}>
                            <Image source={require('../../assets/Images/wallateicon.png')} style={{ marginTop: 25, height: 40, width: 45 }} />
                            <Text style={{ marginTop: 15, fontSize: 14, color: '#000000', fontWeight: 'bold' }}>Your balance is low,please</Text>
                            <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}>recharge to keep chating</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <TouchableOpacity style={STYLES.newChatStyles.addmoney} onPress={() => onPressRecharge()}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Add Money</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity onPress={() => setWallatemodel(false)}
                                style={STYLES.newChatStyles.cancelbtn}>
                                <Text style={{ fontSize: 14, color: '#000000' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default newchatsScreen;
