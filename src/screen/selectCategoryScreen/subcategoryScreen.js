import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, SafeAreaView, TouchableOpacity,
    ScrollView, StatusBar, FlatList, Pressable, RefreshControl, ImageBackground
} from 'react-native';
import { TopConsultantViewListService } from '../../services/UserService/UserService';
import WallateButton from '../../components/WallateButton/WallateButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import Loader from '../../components/loader/index';
import StarRating from 'react-native-star-rating';
import * as STYLES from './styles';
import { SubCategoryService } from '../../services/CategoryService/CategoryService';
import ActionButton from 'react-native-circular-action-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const subcategoryScreen = (props) => {
    const categoryProps = props.route.params.item;
    const [consultantList, setconsultantList] = useState([]);
    const [userId, setuserId] = useState(null);
    const [loading, setloading] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [subCategory, setSubCategory] = useState([]);
    const [allSub, setAllSub] = useState(true);
    const [SearchConsultant, setSearchConsultant] = useState([]);

    useEffect(() => {
        getUserData();
        subCategoryList();
    }, [])

    useEffect(() => {
    }, [userId, consultantList, refreshing, allSub]);

    //get all sub category list to call API
    const subCategoryList = async () => {
        let val = categoryProps.property.skillcategory;
        try {
            const response = await SubCategoryService(val);
            if (response.data != null && response.data != undefined && response.status == 200) {
                setSubCategory(response.data);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    //wait / timeout function
    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //get pull to refresh function
    const onRefresh = () => {
        setrefreshing(true);
        consultantService(categoryProps._id);
        wait(3000).then(() => setrefreshing(false));
    }

    //Search Function
    const searchFilterFunction = (text) => {
        const newData = SearchConsultant.filter(item => {
            const itemData = `${item.fullname.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return wait(1000).then(() => setconsultantList(newData));
    };

    //get AsyncStorage current user Details
    const getUserData = async () => {
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        setloading(true);
        if (getUser == null) {
            setTimeout(() => {
                props.navigation.replace(SCREEN.LOGINSCREEN)
            }, 3000);;
        } else {
            let id = JSON.parse(getUser)._id;
            await setuserId(id);
            await consultantService(categoryProps._id);
        }
    }

    //get Consultants List API
    const consultantService = async (id) => {
        try {
            let response;
            if (id != null && id != undefined) {
                response = await TopConsultantViewListService(id);
            } else {
                response = await TopConsultantViewListService();
            }
            if (response.data != null && response.data != undefined && response.status == 200) {
                setconsultantList(response.data);
                setSearchConsultant(response.data);
                setloading(false);
            }
        } catch (error) {
            console.log(`error`, error);
        }
    }

    // Select sub category change to get data with color
    const onPressSelectSubCategory = async (item, index) => {
        const subCat = subCategory.map((item) => {
            item.selected = false;
            return item;
        });
        setAllSub(false);
        subCat[index].selected = true;
        setSubCategory(subCat);
        await consultantService(item);
    }

    // all sub category get data with collor
    const allSubCatBox = async () => {
        const subCat = subCategory.map((item) => {
            item.selected = false;
            return item;
        });
        setAllSub(true);
        setSubCategory(subCat);
        await consultantService(categoryProps._id);
    }

    //consutlants list to rendom consultant click to navigate screen
    const navigationhandler = (item) => {
        const consultanDetails = item;
        props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails });
    }

    //render consultants lists using flatlist
    const renderConsultantList = ({ item }) => (
        <Pressable onPress={() => props.navigation.navigate(SCREEN.CONSULTANTSSCREEN, { item })}
            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, flex: 1 }}>
            <View style={STYLES.SubCategoryStyles.counsultantview}>
                {/* <View style={STYLES.SubCategoryStyles.cauve}>
                    <FontAwesome name='circle' size={110} color='#FFB629' />
                    <Image source={require('../../assets/Images/medal1.png')}
                        style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
                    />
                </View> */}
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 20, marginLeft: 20, flex: 1 }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <ImageBackground source={{ uri: item ? item.profilepic !== null && item.profilepic ? item.profilepic : noProfile : null }}
                            style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: 100, borderWidth: 1 }}
                            imageStyle={{ borderRadius: 100 }}
                        >
                            {
                                item.property.live === true ?
                                    <View style={{ marginTop: 10, marginRight: -40, height: 15, width: 15, backgroundColor: '#5AC8FA', borderColor: '#5AC8FA', borderRadius: 100, borderWidth: 1 }}></View>
                                    :
                                    <View style={{ marginTop: 10, marginRight: -40, height: 15, width: 15, backgroundColor: '#555555', borderColor: '#FFFFFF', borderRadius: 100, borderWidth: 1 }}></View>
                            }
                        </ImageBackground>
                        <View style={{ marginTop: 5, padding: 10, flexDirection: 'row' }}>
                            <Text style={{ color: '#000000', fontSize: 12 }}>{item.ratinglen + 'K'}</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starSize={15}
                                rating={item.ratinglen}
                                fullStarColor={'#F1C40E'}
                                emptyStarColor={'#000000'}
                            />
                        </View>
                    </View>

                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', textTransform: 'capitalize' }}>{item.property.first_name}</Text>
                        <Text style={{ fontSize: 16, color: '#999999', textTransform: 'capitalize' }}>{item.property.usertag}</Text>

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
                        </Text>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, color: '#6ABF81', fontWeight: 'bold' }}>₹ {item.property.chargespermin} per min</Text>
                                <Text style={{ fontSize: 12, color: '#999999' }}>{item.property.location}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 120 }}>
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

    //render Sun category lists using flatlist
    const renderSubCategory = ({ item, index }) => (
        <View style={{ paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' }}>
            <TouchableOpacity style={item.selected ? STYLES.SubCategoryStyles.categoryviewSelected : STYLES.SubCategoryStyles.categoryview} onPress={() => onPressSelectSubCategory(item._id, index)}>
                {item.selected ?
                    <View style={{ height: 30, width: 30, backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 100 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2094FA' }}>{item.property.title.charAt(0)}</Text>
                    </View>
                    :
                    <View style={{ height: 30, width: 30, backgroundColor: '#2094FA', alignItems: 'center', borderRadius: 100 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>{item.property.title.charAt(0)}</Text>
                    </View>
                }
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
                            placeholder='Search Consultants'
                            type='clear'
                            placeholderTextColor='#999999'
                            returnKeyType='done'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(value) => searchFilterFunction(value)}
                        />
                        <TouchableOpacity >
                            <Image source={require('../../assets/Images/filter.png')} style={{ width: 18, height: 20, marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps={'always'}
                refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#00D9CE" titleColor="#00D9CE" colors={["#00D9CE"]} onRefresh={() => onRefresh()} />}>
                <View style={{ marginLeft: 20, marginTop: 15 }}>
                    <Text style={{ fontSize: 26, textTransform: 'capitalize' }}>{categoryProps.property.skillcategory}</Text>
                </View>
                <View style={{ marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 10, flexDirection: 'row' }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' }}>
                        <TouchableOpacity style={allSub ? STYLES.SubCategoryStyles.categoryviewSelected : STYLES.SubCategoryStyles.categoryview} onPress={() => allSubCatBox()}>
                            {
                                allSub ?
                                    <View style={{ height: 30, width: 30, backgroundColor: '#FFFFFF', alignItems: 'center', borderRadius: 100 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2094FA' }}>A</Text>
                                    </View>
                                    :
                                    <View style={{ height: 30, width: 30, backgroundColor: '#2094FA', alignItems: 'center', borderRadius: 100 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>A</Text>
                                    </View>
                            }
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

                {(consultantList == null) || (consultantList && consultantList.length == 0) ?
                    <Text style={{ textAlign: 'center', fontSize: 16, color: '#747474', marginTop: 50 }}>Consultant are not available</Text>
                    :
                    <FlatList
                        renderItem={renderConsultantList}
                        data={consultantList}
                        keyExtractor={item => `${item._id}`}
                    />
                }
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
            <ActionButton
                buttonColor="#00D9CE"
                position="right"
                bgColor="transparent"
                autoInactive={false}
            // icon={renderImage()}
            >
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Chat" onPress={() => props.navigation.navigate(SCREEN.RECENTCHATSCREEN)}>
                    <Ionicons name="chatbubbles" style={STYLES.styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Find a counsultant" onPress={() => props.navigation.navigate(SCREEN.INVITESCREEN)}>
                    <MaterialCommunityIcons name="card-plus-outline" style={STYLES.styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Wallet Balance" onPress={() => props.navigation.navigate(SCREEN.MYWALLETSCREEN)}>
                    <FontAwesome name="rupee" style={STYLES.styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default subcategoryScreen;

