import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as STYLE from './styles';

const notificationScreen = (props) => {
    return (
        <SafeAreaView style={STYLE.styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={STYLE.styles.headerstyle}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' size={24} color='#FFFFFF' style={{ marginLeft: 20 }} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ marginLeft: -120, justifyContent: 'center' }} >
                            <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 25, width: 20 }} />
                        </TouchableOpacity>

                        <View style={{ justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={STYLE.styles.submitbtn}>
                                <Text style={{ fontSize: 14, color: '#000000' }}>Clear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <View style={STYLE.styles.notificationview}>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginRight: 20, color: '#999999' }}>Just now</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: -30, marginLeft: 15, alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#FF114F', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name='rupee' size={20} color='#FFFFFF' />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={{ fontSize: 12, color: '#F67742' }} >#Transaction</Text>
                                <Text style={{ fontSize: 14, color: '#000000' }}>Your Feb transaction have been completed please check your account</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLE.styles.notificationview}>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginRight: 20, color: '#999999' }}>Just now</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: -30, marginLeft: 15, alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#04DE71', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name='rupee' size={25} color='#FFFFFF' />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={{ fontSize: 12, color: '#F67742' }} >#Transaction</Text>
                                <Text style={{ fontSize: 14, color: '#000000' }}>Your Feb transaction have been completed please check your account</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLE.styles.notificationview}>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, marginRight: 20, color: '#999999' }}>Yesterday</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: -30, marginLeft: 15, alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#04DE71', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name='rupee' size={25} color='#FFFFFF' />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={{ fontSize: 12, color: '#F67742' }} >#Transaction</Text>
                                <Text style={{ fontSize: 14, color: '#000000' }}>Your Feb transaction have been completed please check your account</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ paddingBottom: 50 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default notificationScreen;
