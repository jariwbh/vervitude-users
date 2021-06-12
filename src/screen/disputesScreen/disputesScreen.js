import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, FlatList, RefreshControl, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as STYLES from './styles';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import { DisputeChatFilterService } from '../../services/DisputeChatService/DisputeChatService';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import { useFocusEffect } from '@react-navigation/native';

const disputesScreen = (props) => {
    const [loading, setloading] = useState(false);
    const [disputeList, setDisputeList] = useState([]);
    const [UserId, setUserID] = useState(null);
    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
    }, [loading, disputeList, UserId, refreshing]);

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem(AUTHUSER).then(async (res) => {
                let id = JSON.parse(res)._id;
                getDisputeChatFilter(id);
                setUserID(id);
            });
        }, [])
    );

    useEffect(() => {
        setloading(true);
        AsyncStorage.getItem(AUTHUSER).then(async (res) => {
            let id = JSON.parse(res)._id;
            getDisputeChatFilter(id);
            setUserID(id);
        });
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    //refresh function
    const onRefresh = () => {
        setrefreshing(true);
        getDisputeChatFilter(UserId);
        wait(3000).then(() => setrefreshing(false));
    }

    //get Dispute Chat Filter Api 
    const getDisputeChatFilter = async (id) => {
        try {
            const response = await DisputeChatFilterService(id);
            setDisputeList(response.data);
            setloading(false);
        } catch (error) {
            setloading(false);
            console.log(`error`, error);
        }
    }

    //select to collapsible (show data)
    const onPressToSelectDisputeCard = (item, index, val) => {
        const DisputeCard = disputeList.map((item) => {
            item.selected = false;
            return item;
        });

        if (val == false) {
            DisputeCard[index].selected = false;
        }
        if (val == true) {
            DisputeCard[index].selected = true;
        }
        setDisputeList(DisputeCard);
    }

    //render Notification on flatlist function
    const renderdisputeChat = ({ item, index }) => (
        item.selected == true ?
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <View style={STYLES.disputesStyle.mycommentview}>
                    <TouchableOpacity onPress={() => onPressToSelectDisputeCard(item, index, false)}
                        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>{item.subject}</Text>
                            <Text style={{ fontSize: 14, color: '#999999', marginLeft: 15 }}>{moment(item.createdAt).format('DD/MM/YYYY') + ', ' + moment(item.createdAt).format('LT')}</Text>
                        </View>
                        {
                            item.status == "Requested" &&
                            <View onPress={() => { }}
                                style={{ width: 100, height: 25, backgroundColor: '#C4C4C4', marginRight: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>In Review</Text>
                            </View>
                        }
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, padding: 5, marginTop: 15, color: '#999999' }}> My Comment</Text>
                    <Text style={{ fontSize: 18, padding: 5, marginLeft: 5 }}>{item.content}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
                    </View>
                    {
                        item.attachments.length != 0 &&
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
                            onTouchStart={() => props.navigation.navigate(SCREEN.DISPUTESDETAILSSCREEN, { item })}>
                            <Image source={{ uri: item.attachments[0].attachment }} style={{ width: 280, height: 280 }} />
                        </View>
                    }

                </View>
            </View>
            :
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={STYLES.disputesStyle.chatdisputeview}>
                    <TouchableOpacity onPress={() => onPressToSelectDisputeCard(item, index, true)}
                        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>{item.subject}</Text>
                            <Text style={{ fontSize: 14, color: '#999999', marginLeft: 15 }}>{moment(item.createdAt).format('DD/MM/YYYY') + ', ' + moment(item.createdAt).format('LT')}</Text>
                        </View>
                        {
                            item.status == "Requested" &&
                            <View onPress={() => { }}
                                style={{ width: 100, height: 25, backgroundColor: '#C4C4C4', marginRight: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>In Review</Text>
                            </View>
                        }

                    </TouchableOpacity>
                </View>
            </View>
    )

    return (
        <SafeAreaView style={STYLES.disputesStyle.container}>
            <StatusBar hidden backgroundColor='#FA114F' barStyle='light-content' />
            <View style={STYLES.disputesStyle.headerstyle}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>Chat Disputes</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={refreshing} title="Pull to refresh" tintColor="#FA114F" titleColor="#FA114F" colors={["#FA114F"]} onRefresh={() => onRefresh()} />}>

                {(disputeList == null) || (disputeList && disputeList.length <= 0) ?
                    (loading ? null :
                        <Text style={{ textAlign: 'center', fontSize: 16, color: '#747474', marginTop: 50 }}>No DisputeChat available</Text>
                    )
                    :
                    <FlatList
                        data={disputeList}
                        renderItem={renderdisputeChat}
                        keyExtractor={item => item._id}
                    />
                }


                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLES.disputesStyle.chatdisputeview}>
                        <View onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>Chat did not go Thorugh </Text>
                                <Text style={{ fontSize: 14, color: '#999999', marginLeft: 15 }}>28/02/2021 , 2:30 PM</Text>
                            </View>
                            <TouchableOpacity style={{ width: 100, height: 25, backgroundColor: '#04DE71', marginRight: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#FFFFFF' }} >Dipute Won </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLES.disputesStyle.chatdisputeview}>
                        <View onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, color: '#000000', marginLeft: 20 }}>Chat did not go Thorugh </Text>
                                <Text style={{ fontSize: 14, color: '#999999', marginLeft: 20 }}>14/02/2021 , 2:30 PM</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('disputesdetailsScreen')}
                                style={{ width: 100, height: 25, backgroundColor: '#FA114F', marginRight: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>Dipute Lost</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default disputesScreen;
