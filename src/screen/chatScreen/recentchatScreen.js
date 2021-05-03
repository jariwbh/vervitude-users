import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, TextInput, ScrollView,
    TouchableOpacity, Image, StatusBar, FlatList
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

const recentchatScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [recentChat, setrecentChat] = useState([])
    useEffect(() => {
        AsyncStorage.getItem(AUTHUSER).then((res) => {
            setloading(true);
            let currentUser = JSON.parse(res)._id;
            axiosConfig(currentUser);
            recentchatlist(currentUser);
        });
    }, [])

    const recentchatlist = async (currentUser) => {
        try {
            const response = await RecentChatService(currentUser);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setrecentChat(response.data);
                setloading(false);
            }
        }
        catch (error) {
            console.log(`error`, error);
        }
    }

    useEffect(() => {
        recentChat
    }, [])

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
                    <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                    <Image source={{ uri: item ? item.property.consultantid.profilepic !== null && item.property.consultantid.profilepic ? item.property.consultantid.profilepic : noProfile : noProfile }}
                        style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                    <View style={{ marginLeft: -20, height: 15, width: 15, backgroundColor: '#EEEEEE', borderColor: '#000000', borderRadius: 100, borderWidth: 1 }}></View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000", textTransform: 'capitalize' }}>
                            {item && item.property.consultantid.fullname}</Text>
                        <Text style={{ fontSize: 14, color: "#999999" }}>Design / UX Design</Text>
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
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={recentChat}
                    renderItem={renderChatUser}
                    keyExtractor={item => item._id}
                />
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default recentchatScreen;
