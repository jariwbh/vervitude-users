import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, SafeAreaView, TouchableOpacity,
    ScrollView, StatusBar, FlatList, Pressable, RefreshControl
} from 'react-native';
import { ConsultantListService } from '../../services/UserService/UserService';
import WallateButton from '../../components/WallateButton/WallateButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import StarRating from 'react-native-star-rating';
import * as STYLES from './styles';
import { SubCategoryService } from '../../services/CategoryService/CategoryService';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const subcategoryScreen = (props) => {
    const categoryProps = props.route.params.item;
    const [consultantList, setconsultantList] = useState([]);
    const [userId, setuserId] = useState(null);
    const [loading, setloading] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {
        getStudentData();
        subCategoryList();
    }, [])

    const subCategoryList = async () => {
        let val = categoryProps.property.skillcategory;
        try {
            const response = await SubCategoryService(val);
            console.log(`response`, response.data);
            if (response.data != null && response.data != undefined && response.status == 200) {
                setSubCategory(response.data);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    useEffect(() => {
    }, [userId, consultantList, refreshing]);

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

    //get AsyncStorage current user Details
    const getStudentData = async () => {
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        setloading(true);
        if (getUser == null) {
            setTimeout(() => {
                props.navigation.replace(SCREEN.LOGINSCREEN)
            }, 3000);;
        } else {
            let id = JSON.parse(getUser)._id;
            //axiosConfig('5a2cbf23ee5c2a1080793272');
            await setuserId(id);
            await consultantService();
        }
    }

    //get Consultants List API
    const consultantService = async () => {
        try {
            const response = await ConsultantListService();
            if (response.data != null && response.data != undefined && response.status == 200) {
                setconsultantList(response.data);
                setloading(false);
            }
            // axiosConfig(userId);
        } catch (error) {
            console.log(`error`, error);
        }
    }
    const onPressSelectSubCategory = (id) => {
        console.log(`id`, id);
    }

    const navigationhandler = (item) => {
        const consultanDetails = item;
        props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails });
    }

    const renderConsultantList = ({ item }) => (
        <Pressable onPress={() => props.navigation.navigate(SCREEN.CONSULTANTSSCREEN, { item })}
            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
            <View style={STYLES.SubCategoryStyles.counsultantview}>
                <View style={STYLES.SubCategoryStyles.cauve}>
                    <FontAwesome name='circle' size={110} color='#FFB629' />
                    <Image source={require('../../assets/Images/medal1.png')}
                        style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                    />
                </View>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: -40, flex: 1 }}>
                    {
                        item.property.live === true ?
                            <View style={{ marginTop: -100, marginRight: -40, height: 15, width: 15, backgroundColor: '#5AC8FA', borderColor: '#5AC8FA', borderRadius: 100, borderWidth: 1 }}></View>
                            :
                            <View style={{ marginTop: -100, marginRight: -40, height: 15, width: 15, backgroundColor: '#555555', borderColor: '#FFFFFF', borderRadius: 100, borderWidth: 1 }}></View>
                    }
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={{ uri: item ? item.profilepic !== null && item.profilepic ? item.profilepic : noProfile : null }}
                            style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: 100, borderWidth: 1 }}
                        />
                        <View style={{ marginTop: 5, padding: 10, flexDirection: 'row' }}>
                            <Text>4K</Text>
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
                    <View>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', textTransform: 'capitalize' }}>{item.property.first_name}</Text>
                        <Text style={{ fontSize: 16, color: '#999999' }}>Business Counsultant</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#C2C2C2' }} />
                        </View>
                        <Text style={{ fontSize: 12, color: '#999999' }}>Speciliazition</Text>
                        <Text style={{ fontSize: 12, color: '#000000' }}>CRM,Digital Marketing,Marketing</Text>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                <Text style={{ fontSize: 12, color: '#999999' }}>{item.property.location}</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginRight: -20 }}>
                                <TouchableOpacity
                                    onPress={() => navigationhandler(item)}
                                    style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 100, backgroundColor: '#5AC8FA' }}>
                                    <FontAwesome5 name='edit' size={14} color='#FFFFFF' />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 12, color: '#000000' }}>chat</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )

    const renderSubCategory = ({ item }) => (
        <View style={{ paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' }}>
            <TouchableOpacity style={STYLES.SubCategoryStyles.categoryview} onPress={() => onPressSelectSubCategory(item._id)}>
                <View style={{ height: 30, width: 30, backgroundColor: '#2094FA', alignItems: 'center', borderRadius: 100 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>{item.property.title.charAt(0)}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ fontSize: 12, textAlign: 'center' }}>{item.property.title}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={STYLES.SubCategoryStyles.container}>
            <StatusBar hidden backgroundColor='#2094FA' barStyle='light-content' />
            <View style={STYLES.SubCategoryStyles.headerstyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>Sub Category</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <WallateButton onPress={() => props.navigation.navigate('myWalletScreen')} />
                    </View>
                </View>

                <View style={STYLES.SubCategoryStyles.centerView}>
                    <View style={STYLES.SubCategoryStyles.statusbar}>
                        <TouchableOpacity >
                            <AntDesign name='search1' size={20} color='#3399ff' style={{ marginLeft: 20 }} />
                        </TouchableOpacity>
                        <TextInput
                            style={STYLES.SubCategoryStyles.statInput}
                            placeholder='Search App'
                            type='clear'
                            placeholderTextColor='#999999'
                            returnKeyType='done'
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <TouchableOpacity >
                            <Image source={require('../../assets/Images/filter.png')} style={{ width: 18, height: 20, marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#00D9CE" titleColor="#00D9CE" colors={["#00D9CE"]} onRefresh={() => onRefresh()} />}>
                <View style={{ marginLeft: 20, marginTop: 15 }}>
                    <Text style={{ fontSize: 26, textTransform: 'capitalize' }}>{categoryProps.property.skillcategory}</Text>
                </View>

                <View style={{ marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 20, flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' }}>
                        <TouchableOpacity style={STYLES.SubCategoryStyles.categoryview} onPress={() => onPressSelectSubCategory()}>
                            <View style={{ height: 30, width: 30, backgroundColor: '#2094FA', alignItems: 'center', borderRadius: 100 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>A</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>{`All` + ` - ` + categoryProps.property.skillcategory.substring(0, 4)}</Text>
                        </View>
                    </View>
                    <FlatList
                        renderItem={renderSubCategory}
                        horizontal={false}
                        numColumns={10}
                        data={subCategory}
                        keyExtractor={item => `${item._id}`}
                    />
                </View>

                <FlatList
                    renderItem={renderConsultantList}
                    data={consultantList}
                    keyExtractor={item => `${item._id}`}
                />
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default subcategoryScreen;

