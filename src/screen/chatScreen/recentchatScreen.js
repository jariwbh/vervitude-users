import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, TextInput, ScrollView,
    TouchableOpacity, Image, StatusBar, FlatList, RefreshControl
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as STYLES from './styles';
import { AUTHUSER } from '../../context/actions/type';
import AsyncStorage from '@react-native-community/async-storage';
import { RecentChatService } from '../../services/ChatService/ChatService';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

const recentchatScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [recentChat, setrecentChat] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [currentUserId, setcurrentUserId] = useState(null);
    const [SearchConsultant, setSearchConsultant] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem(AUTHUSER).then((res) => {
                let currentUser = JSON.parse(res)._id;
                axiosConfig(currentUser);
                setcurrentUserId(currentUser);
                recentchatlist(currentUser);
            });
        }, [])
    );

    useEffect(() => {
        setloading(true);
    }, [])

    useEffect(() => {
    }, [currentUserId, recentChat, refreshing])

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = () => {
        let id = currentUserId;
        setrefreshing(true);
        recentchatlist(id);
        wait(3000).then(() => setrefreshing(false));
    }

    const searchFilterFunction = (text) => {
        const newData = SearchConsultant.filter(item => {
            const itemData = `${item.property.consultantid.fullname.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        return wait(1000).then(() => setrecentChat(newData));
    };

    const recentchatlist = async (id) => {
        try {
            const response = await RecentChatService(id);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setrecentChat(response.data);
                setSearchConsultant(response.data);
                setloading(false);
            }
        }
        catch (error) {
            setloading(false);
            // console.log(`error`, error);
        }
    }

    const navigationhandler = (item) => {
        const consultanDetails = {
            _id: item.property.consultantid._id,
            profilepic: item.property.consultantid.profilepic,
            fullname: item.property.consultantid.fullname,
            consultanobject: item
        }
        props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails });
    }

    const renderChatUser = ({ item }) => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => navigationhandler(item)}>
                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>{item.updatedAt ? moment(item.updatedAt).format('lll') : moment(item.createdAt).format('lll')}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                    <Image source={{ uri: item ? item.property.consultantid.profilepic !== null && item.property.consultantid.profilepic ? item.property.consultantid.profilepic : noProfile : noProfile }}
                        style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25, borderColor: '#555555', borderWidth: 0.2 }} />
                    <View style={{ marginLeft: -20, height: 15, width: 15, backgroundColor: '#EEEEEE', borderColor: '#000000', borderRadius: 100, borderWidth: 1 }}></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60, marginLeft: -70 }}>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000", textTransform: 'capitalize' }}>
                            {item && item.property.consultantid.fullname.split(' ')[0]}</Text>
                        <Text style={{ fontSize: 14, color: "#999999" }}>{item && item.property && item.property.consultantid && item.property.consultantid.property && item.property.consultantid.property.usertag ? item.property.consultantid.property.usertag : null}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={STYLES.recentChatStyles.container}>
            <StatusBar hidden backgroundColor='#FFB629' barStyle='light-content' />
            <View style={STYLES.recentChatStyles.headerstyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>Recent Chats</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-start', marginRight: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('homeScreen')}>
                            <Image source={require('../../assets/Images/homeicon.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => { props.navigation.navigate("newchatsScreen") }}
                    style={{ width: 150, height: 40, backgroundColor: '#FFFFFF', borderRadius: 100, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                    <Text style={{ fontSize: 14, color: '#FFB629' }}>Find a Consultant</Text>
                </TouchableOpacity>
            </View>

            <View style={STYLES.recentChatStyles.centerView}>
                <View style={STYLES.recentChatStyles.statusbar}>
                    <TouchableOpacity >
                        <AntDesign name='search1' size={20} color='#FFB629' style={{ marginLeft: 20 }} />
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
                refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#00D9CE" titleColor="#00D9CE" colors={["#00D9CE"]} onRefresh={() => onRefresh()} />}>

                {(recentChat == null) || (recentChat && recentChat.length == 0) ?
                    (loading ? null :
                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#555555', marginTop: 50 }}>Recent chat not available</Text>
                    )
                    :
                    <FlatList
                        data={recentChat}
                        renderItem={renderChatUser}
                        keyExtractor={item => item._id}
                    />
                }
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default recentchatScreen;
