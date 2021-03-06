import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, ScrollView, TextInput, BackHandler, Dimensions, ImageBackground,
    TouchableOpacity, Image, StyleSheet, LogBox, StatusBar, FlatList, ToastAndroid, Platform
} from 'react-native';
import WallateButton from '../../components/WallateButton/WallateButton';
import MenuButton from '../../components/MenuButton/MenuButton';
import StarRating from 'react-native-star-rating';
import * as STYLE from './styles';
import Loader from '../../components/loader/index';
import ActionButton from 'react-native-circular-action-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SCREEN from '../../context/screen/screenName';
import { TopConsultantViewListService, UserPatchService, UserUpdateService } from '../../services/UserService/UserService';
import { AUTHUSER } from '../../context/actions/type';
import AsyncStorage from '@react-native-community/async-storage';
import { CategoryService } from '../../services/CategoryService/CategoryService';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';
import { getByIdMemberService } from '../../services/UserService/UserService';
//import axiosConfig from '../../helpers/axiosConfig';
import DeviceInfo from 'react-native-device-info';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { NotificationService } from '../../services/NotificationService/NotificationService';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Swiper from 'react-native-swiper';
import SliderService from '../../services/SliderService/SliderService';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';
import crashlytics from "@react-native-firebase/crashlytics";

const homeScreen = (props) => {
    const [consultant, setConsultant] = useState([]);
    const [loading, setloading] = useState(false);
    const [category, setCategory] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [notification, setNotification] = useState(0);
    const [sliderData, setsliderData] = useState([]);
    const [search, setSearch] = useState(null);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [filter, setFilter] = useState([]);
    let userID;

    useFocusEffect(
        React.useCallback(() => {
            setFilter([]);
            setSearch(null);
            ConsultantList();
            getNotification(userID);
        }, [])
    );

    useEffect(() => {
        setloading(true);
        categoryList();
        getUserData();
        sliderService();
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        });

        return props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton,
            );
        });
    }, [])

    useEffect(() => {
    }, [userInfo, category, loading, consultant, sliderData, search, filteredDataSource, filter])

    //silder image manage function
    const sliderService = async () => {
        try {
            const response = await SliderService();
            setsliderData(response.data);
        } catch (error) {
            firebase.crashlytics().recordError(error);
            // console.log(`error`, error);
        }
    }

    //open WEB VIEW SCREEN
    const WebViewScreen = (data) => {
        props.navigation.navigate(SCREEN.WEBVIEWSCREEN, { data });
    }

    const PushNotifications = async () => {
        let fcmToken = await firebase.messaging().getToken();
        if (fcmToken != undefined) {
            // console.log(`fcmToken`, fcmToken);
            getFcmToken(fcmToken);
        }

        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                //console.log(`token`, token)
                // if (token.token != undefined) {
                //     getFcmToken(token.token)
                // }
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                // process the notification
                // (required) Called when a remote is received or opened, or local notification is opened
                if (notification.foreground) {
                    notification.data = {
                        message: notification.message,
                        title: notification.title
                    }
                    //  console.log("NOTIFICATION:", notification);
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                //  console.log("ACTION:", notification.action);
                // console.log("NOTIFICATION:", notification);
                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                //  console.log(`err`, err);
                // console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            senderID: '79264411371',
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }

    //get notification function
    const getNotification = async (id) => {
        const response = await NotificationService(id);
        setNotification(response.data.length)
    }

    //GET MESSAGE TOKEN
    const getFcmToken = async (fcmToken) => {
        let uniqueId;
        let deviceInfo;
        if (Platform.OS === 'android') {
            uniqueId = await DeviceInfo.getAndroidId()
            if (fcmToken) {
                deviceInfo = {
                    anroiddevice: {
                        "deviceid": uniqueId,
                        "registrationid": fcmToken
                    }
                }
                await UserPatch(deviceInfo);
            }
        } else {
            uniqueId = DeviceInfo.getUniqueId();
            if (fcmToken) {
                deviceInfo = {
                    iosdevice: {
                        "deviceid": uniqueId,
                        "registrationid": fcmToken
                    }
                }
                await UserPatch(deviceInfo);
            }
        }
    }

    //GET ASYNCSTORAGE CURRENT USER DETAILS
    const getUserData = async () => {
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        var UserInfo = JSON.parse(getUser);
        UserInfo.property.live = true;
        userID = UserInfo._id
        setUserInfo(UserInfo);
        PushNotifications();
        await getNotification(userID);
        await getByIdMember(userID);
        await UpdateUserService(UserInfo);
    }

    //UPDATE MEMBER INFORMATION API CALL
    const UserPatch = async (deviceInfo) => {
        try {
            const response = await UserPatchService(userID, deviceInfo);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setloading(false);
            }
        }
        catch (error) {
            firebase.crashlytics().recordError(error);
            //console.log(`error`, error);
            setloading(false);
        }
    }

    //get member details 
    const getByIdMember = async (id) => {
        try {
            const response = await getByIdMemberService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                authenticateUser(response.data);
            }
        } catch (error) {
            firebase.crashlytics().recordError(error);
            setloading(false);
        }
    }

    //category List Service to call function
    const categoryList = async () => {
        try {
            const response = await CategoryService();
            const uniqueValues = [...new Map(response.data.map(item => [item["property"]["skillcategory"], item])).values()];
            const slice = uniqueValues.slice(0, 4);
            setCategory([...slice, { add: true }]);
        } catch (error) {
            firebase.crashlytics().recordError(error);
            // console.log(`error`, error);
        }
    }

    //REPLACE AND ADD LOCAL STORAGE FUNCTION
    const authenticateUser = (user) => {
        AsyncStorage.setItem(AUTHUSER, JSON.stringify(user));
    }

    //mobile back press to call
    const handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }

    //UPDATE MEMBER INFORMATION API CALL
    const UpdateUserService = async (user) => {
        try {
            const response = await UserUpdateService(user);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                authenticateUser(user);
            }
        }
        catch (error) {
            setloading(false);
        }
    }

    //Consultant List Service to call function
    const ConsultantList = async () => {
        try {
            const response = await TopConsultantViewListService();
            const slice = response.data.slice(0, 5);
            setFilteredDataSource(response.data);
            setConsultant(slice);
            setloading(false);
        } catch (error) {
            firebase.crashlytics().recordError(error);
            //  console.log(`error`, error);
        }
    }

    //search consultants function
    const searchFilterFunction = (text) => {
        if (Number(text.length) > 3) {
            const newData = filteredDataSource.filter(item => {
                const itemData = item.fullname
                    ? item.fullname.toLowerCase()
                    : ''.toLowerCase();
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) !== -1;
            });
            setFilter(newData);
            setSearch(text);
        } else {
            setSearch(text);
            setFilter([])
        }
    };

    // Flat List Item
    const ItemView = ({ item }) => {
        return (
            <View style={{ width: WIDTH - 25 }}>
                <Text
                    style={{ padding: 10, alignItems: 'flex-start', justifyContent: 'center' }}
                    onPress={() => navigationhandler(item)}>
                    {item.fullname + ' - ' + ' Consultant'}
                </Text>
            </View>
        );
    };

    // Flat List Item Separator
    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    //navigarte consultant screen
    const navigationhandler = (item) => {
        setSearch(null);
        setFilter([]);
        props.navigation.navigate(SCREEN.CONSULTANTSSCREEN, { item });
    }

    //render consultans list useing flatlist 
    const renderConsultants = ({ item }) => {
        return (
            <View style={{ flexDirection: 'column', marginBottom: 30 }}>
                <TouchableOpacity style={{ margin: 20 }} onPress={() => navigationhandler(item)}>
                    <Image source={{ uri: item.profilepic ? item.profilepic : noProfile }}
                        style={{ alignItems: 'center', height: 80, width: 80, borderColor: '#2294FA', borderWidth: 2, borderRadius: 100 }}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold', textAlign: 'center', marginTop: -10, textTransform: 'capitalize' }}>
                        {item.property.first_name}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#999999', textAlign: 'center', textTransform: 'uppercase' }}>{item.property.usertag}</Text>
                    {
                        Number(item.ratinglen) > 0 ?
                            <View style={{ marginTop: -12, padding: 15, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12, color: '#000000', textAlign: 'center', marginRight: 2 }}>{item.ratinglen + 'k'}</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={15}
                                    rating={item.ratings}
                                    fullStarColor={'#F1C40E'}
                                    emptyStarColor={'#000000'}
                                />
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#000000', fontSize: 12 }}>{'New'}</Text>
                            </View>
                    }
                </View>
            </View>
        )
    }

    //render category list useing flatlist
    const renderCategory = ({ item }) => (
        item.add == true ?
            <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.SELECTCATEGORYSCREEN)}
                    style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Image source={require('../../assets/Images/allicon.png')}
                        style={{ height: 55, width: 55, borderRadius: 8, borderWidth: 0.2, borderColor: '#000000' }} />
                </TouchableOpacity>
                <View style={{ marginTop: 5, alignItems: 'center', width: 50, justifyContent: 'center' }}>
                    <Text styles={{ fontSize: 12, textAlign: 'center' }}>All</Text>
                </View>
            </View>
            :
            <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.SUBCATEGORYSCREEN, { item }) }} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Image source={{ uri: item.property.image['1'].attachment }}
                        style={{ height: 55, width: 55, borderRadius: 8, borderWidth: 0.2, borderColor: '#000000' }} />
                </TouchableOpacity>
                <View style={{ marginTop: 5, alignItems: 'center' }}>
                    <Text styles={{ fontSize: 12, textAlign: 'center' }}>{item.property.skillcategory.split(' ')[0].substring(0, 8)}</Text>
                </View>
            </View>
    )

    const renderImage = () => (
        <TouchableOpacity style={styles.touchableOpacityStyle}>
            <Ionicons name="chatbubbles" color='#FFFFFF' size={30} style={{ top: -45, right: 50 }} />
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={STYLE.styles.container}>
            <GeneralStatusBarColor hidden={false} translucent={true} backgroundColor="transparent" barStyle="dark-content" />
            <View style={STYLE.styles.headerstyle}>
                <View style={{ marginTop: 30, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                        <MenuButton onPress={() => props.navigation.navigate(SCREEN.MYPROFILESCREEN)} />
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.NOTIFICATIONSCREEN)}
                            style={{ marginLeft: 30, marginTop: -10, justifyContent: 'center', alignItems: 'center', height: 30, width: 30 }}>
                            <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 25, width: 20 }} />
                            <View style={{ marginLeft: 15, marginTop: -40, height: 22, width: 22, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EB5757' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#FFFFFF' }}>{notification}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'flex-end' }}>
                        <WallateButton onPress={() => props.navigation.navigate(SCREEN.MYWALLETSCREEN)} />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLE.styles.statusbar}>
                        <TouchableOpacity >
                            <AntDesign name='search1' size={20} color='#00D9CE' style={{ marginLeft: 20 }} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder='Search App'
                            type='clear'
                            placeholderTextColor='#999999'
                            returnKeyType='search'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(text) => searchFilterFunction(text)}
                            defaultValue={search}
                        />
                    </View>
                </View>
            </View>
            {
                (filteredDataSource == null) || (filteredDataSource && filteredDataSource.length < 0) ? null :
                    <View style={{
                        marginTop: 150, backgroundColor: '#FFFFFF', position: 'absolute',
                        zIndex: 2, justifyContent: 'center', alignItems: 'center', margin: 20, height: 100
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                            <FlatList
                                data={filter}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={ItemSeparatorView}
                                keyboardShouldPersistTaps={'always'}
                                renderItem={ItemView}
                            />
                        </ScrollView>
                    </View>
            }
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <View style={STYLE.styles.homeCardView}>
                        <View style={{
                            top: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {(sliderData != null) || (sliderData && sliderData.length < 0) ?
                                <Swiper
                                    containerStyle={styles.wrapper}
                                    autoplay={true}
                                    autoplayTimeout={5}
                                    autoplayDirection={true}
                                    activeDotColor={'#00D9CE'}
                                >
                                    {sliderData.map((item, index) => (
                                        <View key={index} >
                                            <ImageBackground source={{ uri: item.property.image[0].attachment }} style={styles.customImage} imageStyle={{ borderRadius: 10 }} >
                                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 100, flex: 0.5 }}>
                                                    <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', }}>{item.property.title} </Text>
                                                    <TouchableOpacity onPress={() => WebViewScreen(item.property.link)} >
                                                        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline', marginRight: 10 }}>{item.property.title_link} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    ))}
                                </Swiper>
                                : null
                            }
                        </View>
                        <View style={STYLE.styles.categoriesText}>
                            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.SELECTCATEGORYSCREEN)}>
                                <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#00D9CE', fontWeight: 'bold', marginTop: 10 }}>Categories</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                                <FlatList
                                    renderItem={renderCategory}
                                    data={category}
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    numColumns={5}
                                    keyExtractor={item => item._id}
                                    style={{ width: WIDTH - 40 }}
                                />
                            </ScrollView>
                        </View>

                        <View style={STYLE.styles.categoriesText}>
                            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.NEWCHATSSCREEN)}>
                                <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#00D9CE' }}>Top Consultants</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                                <FlatList
                                    renderItem={renderConsultants}
                                    data={consultant}
                                    horizontal={false}
                                    numColumns={5}
                                    keyExtractor={item => item._id}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}></View>
            </ScrollView>

            <ActionButton
                buttonColor="#00D9CE"
                position="right"
                bgColor="transparent"
                autoInactive={true}
            // icon={renderImage()}
            >
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Chat" onPress={() => props.navigation.navigate(SCREEN.RECENTCHATSCREEN)}>
                    <Image source={require('../../assets/Images/chaticon1.png')} style={{ height: 23, width: 25 }} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Find a counsultant" onPress={() => props.navigation.navigate(SCREEN.NEWCHATSSCREEN)}>
                    <Image source={require('../../assets/Images/findicon.png')} style={{ height: 20, width: 20 }} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Wallet Balance" onPress={() => props.navigation.navigate(SCREEN.MYWALLETSCREEN)}>
                    <Image source={require('../../assets/Images/moneyicon.png')} style={{ height: 20, width: 15 }} />
                </ActionButton.Item>
            </ActionButton>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 20,
        color: '#FFFFFF',
    },
    actionbtn: {
        height: 100,
        width: 100,
        borderRadius: 200,
        backgroundColor: '#00D9CE',
        marginTop: 0,
        marginLeft: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableOpacityStyle: {
        borderRadius: 100,
        position: 'absolute',
        backgroundColor: '#00D9CE',
        width: 100,
        height: 100,
        right: 30,
        bottom: -30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: -60,
        elevation: 2
    },
    customImage: {
        height: 220,
        width: WIDTH - 40
    },
    wrapper: {
        height: 220,
        width: WIDTH - 40
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#737373',
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: 20,
        width: WIDTH - 20,
        height: 45,
        alignItems: 'center',
    },
    textInputStyle: {
        fontSize: 15,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default homeScreen;


