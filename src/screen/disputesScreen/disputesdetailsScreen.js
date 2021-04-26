import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as STYLES from './styles';

const disputesdetailsScreen = (props) => {
    return (
        <SafeAreaView style={STYLES.disputesStyle.container}>
            <StatusBar backgroundColor='#FA114F' barStyle='light-content' />
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

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLES.disputesStyle.chatdisputeview}>
                        <View onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>The Consultant Did not Respond </Text>
                                <Text style={{ fontSize: 14, color: '#999999', marginLeft: 15 }}>14/02/2021 , 2:30 PM</Text>
                            </View>
                            <TouchableOpacity style={{ width: 100, height: 25, backgroundColor: '#C4C4C4', marginRight: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#303030' }}>In Review</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                    <View style={STYLES.disputesStyle.mycommentview}>
                        <View onPress={() => { }}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 14, color: '#000000', marginLeft: 15 }}>Chat did not go thorugh </Text>
                                <Text style={{ fontSize: 14, color: '#999999', marginLeft: 15 }}>14/02/2021 , 2:30 PM</Text>
                            </View>

                            <TouchableOpacity onPress={() => { }}
                                style={{ width: 100, height: 25, backgroundColor: '#04DE71', marginRight: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>Dipute Won</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 18, padding: 5, marginTop: 15, color: '#999999' }}> My Comment</Text>
                        <Text style={{ fontSize: 18, padding: 5, marginLeft: 5 }}>Chat Ended abruptly consultant logged out and I was charge full amount.</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <Image source={require('../../assets/Images/img.png')} style={{ width: 280, height: 280 }} />
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default disputesdetailsScreen
