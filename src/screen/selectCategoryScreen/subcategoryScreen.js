import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, Modal, Dimensions,
    ScrollView, StatusBar, FlatList, Pressable, RefreshControl, ImageBackground
} from 'react-native';
import { TopConsultantViewListService } from '../../services/UserService/UserService';
import WallateButton from '../../components/WallateButton/WallateButton';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import Loader from '../../components/loader/index';
import StarRating from 'react-native-star-rating';
import * as STYLES from './styles';
import { SubCategoryService } from '../../services/CategoryService/CategoryService';
import ActionButton from 'react-native-circular-action-menu';
import { WalletDetailService } from '../../services/BillService/BillService';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';
import { useFocusEffect } from '@react-navigation/native';
const WIDTH = Dimensions.get('window').width;

const subcategoryScreen = (props) => {
    const categoryProps = props.route.params.item;
    const [consultantList, setconsultantList] = useState([]);
    const [userId, setuserId] = useState(null);
    const [loading, setloading] = useState(false);
    const [refreshing, setrefreshing] = useState(false);
    const [subCategory, setSubCategory] = useState([]);
    const [allSub, setAllSub] = useState(true);
    const [walletBalance, setwalletBalance] = useState(null);
    const [wallatemodel, setWallatemodel] = useState(0);
    const [search, setSearch] = useState(null);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [filter, setFilter] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            setFilter([]);
            setSearch(null);
            getUserData();
            subCategoryList();
        }, [])
    );

    useEffect(() => {
        setloading(true);
    }, [])

    useEffect(() => {
    }, [userId, consultantList, refreshing, allSub, wallatemodel, search, filteredDataSource, filter]);

    //check wallate balance function
    const checkWallateBalance = async (userId) => {
        try {
            const response = await WalletDetailService(userId);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                setwalletBalance(response.data[0].walletbalance)
            }
        } catch (error) {
            // console.log(`error`, error);
        }
    }

    //get all sub category list to call API
    const subCategoryList = async () => {
        let val = categoryProps.property.skillcategory;
        try {
            const response = await SubCategoryService(val);
            if (response.data != null && response.data != undefined && response.status == 200) {
                setSubCategory(response.data);
            }
        } catch (error) {
            // console.log(`error`, error);
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

    //get AsyncStorage current user Details
    const getUserData = async () => {
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        if (getUser == null) {
            setloading(false);
            setTimeout(() => {
                props.navigation.replace(SCREEN.LOGINSCREEN)
            }, 3000);;
        } else {
            let id = JSON.parse(getUser)._id;
            await setuserId(id);
            await consultantService(categoryProps._id);
            await checkWallateBalance(id);
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
                setFilteredDataSource(response.data);
                setloading(false);
            }
        } catch (error) {
            // console.log(`error`, error);
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
        if (walletBalance <= 0) {
            setWallatemodel(true);
        } else {
            const consultanDetails = item;
            props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails });
        }
    }

    //render consultants lists using flatlist
    const renderConsultantList = ({ item }) => (
        <Pressable onPress={() => props.navigation.navigate(SCREEN.CONSULTANTSSCREEN, { item })}
            style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, flex: 1 }}>
            <View style={STYLES.SubCategoryStyles.counsultantview}>
                <View style={STYLES.SubCategoryStyles.cauve}>
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
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: -50, marginLeft: 20, flex: 1 }}>
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
                        <Text style={{ fontSize: 16, color: '#4D4D4D', textTransform: 'capitalize' }}>{item.property.usertag}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                            <View style={{ width: WIDTH / 2, height: 1, backgroundColor: '#C2C2C2' }} />
                        </View>
                        <Text style={{ fontSize: 12, color: '#999999' }}>Speciliazition</Text>
                        <Text style={{ fontSize: 12, color: '#000000', textTransform: 'capitalize', width: 160 }}>
                            {
                                item.skills ?
                                    item.skills.slice(0, 3).map(({
                                        title
                                    }) => title).join(',')
                                    : null
                            }
                        </Text>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#6ABF81', fontWeight: 'bold' }}>₹ {item.property.chargespermin} per min</Text>
                                <Text style={{ fontSize: 12, color: '#808080', fontWeight: 'bold' }}>{item.property.location}</Text>
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

    //render Sun category lists using flatlist
    const renderSubCategory = ({ item, index }) => (
        <View style={{ paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' }}>
            <TouchableOpacity style={item.selected ? STYLES.SubCategoryStyles.categoryviewSelected : STYLES.SubCategoryStyles.categoryview} onPress={() => onPressSelectSubCategory(item._id, index)}>
                {item.selected ?
                    <View style={{ backgroundColor: '#2094FA', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: '#FFFFFF', marginLeft: 10, marginRight: 10 }}>{item.property.title}</Text>
                    </View>
                    :
                    <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: '#000000', marginLeft: 10, marginRight: 10 }}>{item.property.title}</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>
    )

    //add money model pop function
    const onPressRecharge = () => {
        setWallatemodel(false);
        props.navigation.navigate(SCREEN.MYWALLETSCREEN);
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
            setFilter([]);
        }
    };

    // Flat List Item
    const ItemView = ({ item }) => {
        return (
            <View style={{ width: WIDTH - 25 }}>
                <Text
                    style={{ padding: 10, alignItems: 'flex-start', justifyContent: 'center' }}
                    onPress={() => navigationhandlerConsultants(item)}>
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

    //on touch to open consultants screen
    const navigationhandlerConsultants = (item) => {
        setSearch(null);
        setFilter([]);
        props.navigation.navigate(SCREEN.CONSULTANTSSCREEN, { item });
    }

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
                        <WallateButton onPress={() => props.navigation.navigate(SCREEN.MYWALLETSCREEN)} />
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
                            returnKeyType='search'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(value) => searchFilterFunction(value)}
                            defaultValue={search}
                        />
                        {/* <TouchableOpacity >
                            <Image source={require('../../assets/Images/filter.png')} style={{ width: 18, height: 20, marginRight: 20 }} />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>

            {
                (filteredDataSource == null) || (filteredDataSource && filteredDataSource.length == 0) ? null :
                    <View style={{
                        marginTop: 150, backgroundColor: '#FFFFFF', position: 'absolute',
                        zIndex: 2, justifyContent: 'center', alignItems: 'center', margin: 20, height: 100
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                            <FlatList
                                data={filter}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={ItemSeparatorView}
                                renderItem={ItemView}
                            />
                        </ScrollView>
                    </View>
            }

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps={'always'}
                refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#2094FA" titleColor="#2094FA" colors={["#2094FA"]} onRefresh={() => onRefresh()} />}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                    <View style={STYLES.SubCategoryStyles.homeCardView}>
                        <View style={{ marginLeft: 20, marginTop: 15 }}>
                            <Text style={{ fontSize: 26, textTransform: 'capitalize' }}>{categoryProps.property.skillcategory}</Text>
                        </View>
                        <View style={{ marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 10, flexDirection: 'row' }}>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' }}>
                                <TouchableOpacity style={allSub ? STYLES.SubCategoryStyles.categoryviewSelected : STYLES.SubCategoryStyles.categoryview} onPress={() => allSubCatBox()}>
                                    {
                                        allSub ?
                                            <View style={{ backgroundColor: '#2094FA', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, color: '#FFFFFF', marginLeft: 10, marginRight: 10 }}>{`All` + `  ` + categoryProps.property.skillcategory.substring(0, 4)}</Text>
                                            </View>
                                            :
                                            <View style={{ backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, color: '#000000', marginLeft: 10, marginRight: 10 }}>{`All` + `  ` + categoryProps.property.skillcategory.substring(0, 4)}</Text>
                                            </View>
                                    }
                                </TouchableOpacity>

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
                            <View style={{ marginTop: 5 }}>
                                <FlatList
                                    renderItem={renderConsultantList}
                                    data={consultantList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </View>
                        }
                        <View style={{ marginBottom: 20 }}></View>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}></View>
            </ScrollView>
            <ActionButton
                buttonColor="#00D9CE"
                position="right"
                bgColor="transparent"
                autoInactive={false}
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

            {/* Wallate message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={wallatemodel}
                onRequestClose={() => setWallatemodel(false)}
            >
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <View style={{ position: 'absolute', bottom: 20 }}>
                        <View style={STYLES.SubCategoryStyles.msgModalView}>
                            <Image source={require('../../assets/Images/wallateicon.png')} style={{ marginTop: 25, height: 40, width: 45 }} />
                            <Text style={{ marginTop: 15, fontSize: 14, color: '#000000', fontWeight: 'bold' }}>Your balance is low,please</Text>
                            <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}>recharge to keep chating</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <TouchableOpacity style={STYLES.SubCategoryStyles.addmoney} onPress={() => onPressRecharge()}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Add Money</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity onPress={() => setWallatemodel(false)}
                                style={STYLES.SubCategoryStyles.cancelbtn}>
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

export default subcategoryScreen;

