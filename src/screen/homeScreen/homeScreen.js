import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, ScrollView, TextInput, BackHandler,
    TouchableOpacity, Image, StyleSheet, LogBox, StatusBar, FlatList, ToastAndroid, Platform
} from 'react-native';
import WallateButton from '../../components/WallateButton/WallateButton';
import MenuButton from '../../components/MenuButton/MenuButton';
import SliderScreen from '../../components/slider/sliderScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import * as STYLE from './styles';
import Loader from '../../components/loader/index';
import ActionButton from 'react-native-circular-action-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SCREEN from '../../context/screen/screenName';
import { ConsultantListService, UserUpdateService } from '../../services/UserService/UserService';
import { AUTHUSER } from '../../context/actions/type';
import AsyncStorage from '@react-native-community/async-storage';
import { CategoryService } from '../../services/CategoryService/CategoryService';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const homeScreen = (props) => {
    const [consultant, setConsultant] = useState([]);
    const [loading, setloading] = useState(false);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        setloading(true);
        getUserData();
        ConsultantList();
        categoryList();

        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        });

        return props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton,
            );
        });
    }, [])

    //get AsyncStorage current user Details
    const getUserData = async () => {
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        var UserInfo = JSON.parse(getUser);
        UserInfo.property.live = true;
        UpdateUserService(UserInfo);
    }

    //category List Service to call function
    const categoryList = async () => {
        try {
            const response = await CategoryService();
            const slice = response.data.slice(0, 4)
            setCategory([...slice, { add: true }]);
            console.log(`slice`, slice);
        } catch (error) {
            console.log(`error`, error);
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

    //UPDATE PROFILE PICTURE API CALL
    const UpdateUserService = async (user) => {
        try {
            const response = await UserUpdateService(user);
            //console.log(`response`, response);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                authenticateUser(user);
                if (Platform.OS === 'android') {
                    ToastAndroid.show("User is Online", ToastAndroid.SHORT);
                } else {
                    alert('User is Online');
                }
            }
        }
        catch (error) {
            console.log(`error`, error);
            setloading(false);
        }
    }

    //Consultant List Service to call function
    const ConsultantList = async () => {
        try {
            const response = await ConsultantListService();
            const slice = response.data.slice(0, 5)
            setConsultant(slice);
            setloading(false);
        } catch (error) {
            console.log(`error`, error);
        }
    }

    const navigationhandler = (item) => {
        props.navigation.navigate(SCREEN.CONSULTANTSSCREEN, { item });
    }

    const renderConsultants = ({ item }) => {
        return (
            <View style={{ flexDirection: 'column', marginBottom: 30 }}>
                <TouchableOpacity style={{ margin: 20 }} onPress={() => navigationhandler(item)}>
                    <Image source={{ uri: item.profilepic ? item.profilepic : noProfile }}
                        style={{ alignItems: 'center', height: 80, width: 80, borderColor: '#2294FA', borderWidth: 2, borderRadius: 100 }}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 14, color: '#000000', fontWeight: '900', textAlign: 'center', marginTop: -10, textTransform: 'capitalize' }}>
                        {item.property.first_name}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#999999', textAlign: 'center', textTransform: 'uppercase' }}>{item.property.usertag}</Text>
                    <View style={{ marginTop: -12, padding: 15, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12, color: '#000000', textAlign: 'center', marginRight: 2 }}>2.3K</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={15}
                            rating={3}
                            fullStarColor={'#F1C40E'}
                            emptyStarColor={'#000000'}
                        />
                    </View>
                </View>
            </View>
        )
    }

    const renderCategory = ({ item }) => (
        <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
            { item.add == true ?
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.SELECTCATEGORYSCREEN)} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image source={require('../../assets/Images/allicon.png')}
                            style={{ height: 60, width: 60 }} />
                    </TouchableOpacity>
                    <View style={{ marginTop: 5, alignItems: 'center' }}>
                        <Text>All Catgory</Text>
                    </View>
                </View>

                :
                <View>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.SUBCATEGORYSCREEN, { item }) }} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image source={{ uri: item.property.image[0].attachment }}
                            style={{ height: 60, width: 60 }} />
                    </TouchableOpacity>
                    <View style={{ marginTop: 5, alignItems: 'center' }}>
                        <Text styles={{ fontSize: 12, textAlign: 'center' }}>{item.property.skillcategory}</Text>
                    </View>
                </View>
            }
        </View>
    )

    return (
        <SafeAreaView style={STYLE.styles.container}>
            <StatusBar hidden backgroundColor='#00D9CE' barStyle='light-content' />
            <View style={STYLE.styles.headerstyle}>
                <View style={{ marginTop: 30, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                        <MenuButton onPress={() => props.navigation.navigate('myProfileScreen')} />
                        <View style={{ marginLeft: 30, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('notificationScreen')}>
                                <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 25, width: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'flex-end' }}>
                        <WallateButton onPress={() => props.navigation.navigate('myWalletScreen')} />
                    </View>
                </View>

                <View style={STYLE.styles.centerView}>
                    <View style={STYLE.styles.statusbar}>
                        <TouchableOpacity >
                            <AntDesign name='search1' size={20} color='#00D9CE' style={{ marginLeft: 20 }} />
                        </TouchableOpacity>
                        <TextInput
                            style={STYLE.styles.statInput}
                            placeholder='Search App'
                            type='clear'
                            placeholderTextColor='#999999'
                            returnKeyType='done'
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <SliderScreen />
                <View style={STYLE.styles.categoriesText}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                        <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#00D9CE', fontWeight: 'bold', marginTop: 10 }}>Categories</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <FlatList
                            renderItem={renderCategory}
                            data={category}
                            horizontal={false}
                            numColumns={5}
                            keyExtractor={item => item._id}
                        />
                    </ScrollView>
                </View>

                <View style={STYLE.styles.categoriesText}>
                    <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#00D9CE' }}>Top Consultants</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <FlatList
                            renderItem={renderConsultants}
                            data={consultant}
                            horizontal={false}
                            numColumns={5}
                            keyExtractor={item => item._id}
                        />
                    </ScrollView>
                </View>
            </ScrollView>

            <ActionButton
                buttonColor="#00D9CE"
                position="right"
                bgColor="transparent"
                autoInactive={true}
            // icon={renderImage()}
            >
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Chat" onPress={() => props.navigation.navigate(SCREEN.RECENTCHATSCREEN)}>
                    <Ionicons name="chatbubbles" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Find a counsultant" onPress={() => props.navigation.navigate(SCREEN.INVITESCREEN)}>
                    <MaterialCommunityIcons name="card-plus-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Wallet Balance" onPress={() => props.navigation.navigate(SCREEN.MYWALLETSCREEN)}>
                    <FontAwesome name="rupee" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
            { loading ? <Loader /> : null}
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
    }
});

export default homeScreen;


