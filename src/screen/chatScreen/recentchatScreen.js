import React from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as STYLES from './styles';

const recentchatScreen = (props) => {
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
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                            <Image source={require('../../assets/Images/user1.png')}
                                style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                            <View style={{ marginLeft: -20, height: 15, width: 15, backgroundColor: '#EEEEEE', borderColor: '#000000', borderRadius: 100, borderWidth: 1 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                            <View style={{ justifyContent: 'center', marginLeft: -30 }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}>Ranjan</Text>
                                <Text style={{ fontSize: 14, color: "#999999" }}>Design / UX Design</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                            <Image source={require('../../assets/Images/user4.png')}
                                style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                            <View style={{ marginLeft: -20, height: 15, width: 15, borderRadius: 100, backgroundColor: '#00D9CE', borderRadius: 100 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                            <View style={{ justifyContent: 'center', marginLeft: 40 }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}>Ruby</Text>
                                <Text style={{ fontSize: 14, color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                            <View style={{ marginLeft: -20, height: 15, width: 15, backgroundColor: '#EEEEEE', borderColor: '#000000', borderRadius: 100, borderWidth: 1 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                            <View style={{ justifyContent: 'center', marginLeft: 40 }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}>Michele</Text>
                                <Text style={{ fontSize: 14, color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                            <Image source={require('../../assets/Images/Ellipse32.png')}
                                style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                            <View style={{ marginLeft: -20, height: 15, width: 15, borderRadius: 100, backgroundColor: '#00D9CE', borderRadius: 100 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                            <View style={{ justifyContent: 'center', marginLeft: 40 }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}>Maria</Text>
                                <Text style={{ fontSize: 14, color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                            <Image source={require('../../assets/Images/user4.png')}
                                style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                            <View style={{ marginLeft: -20, height: 15, width: 15, borderRadius: 100, backgroundColor: '#00D9CE', borderRadius: 100 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                            <View style={{ justifyContent: 'center', marginLeft: 40 }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}>Maya</Text>
                                <Text style={{ fontSize: 14, color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                            <Image source={require('../../assets/Images/user4.png')}
                                style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                            <View style={{ marginLeft: -20, height: 15, width: 15, borderRadius: 100, backgroundColor: '#00D9CE', borderRadius: 100 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                            <View style={{ justifyContent: 'center', marginLeft: 40 }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}>Ruby</Text>
                                <Text style={{ fontSize: 14, color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                            <View style={{ marginLeft: -20, height: 15, width: 15, backgroundColor: '#EEEEEE', borderColor: '#000000', borderRadius: 100, borderWidth: 1 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                            <View style={{ justifyContent: 'center', marginLeft: 40 }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}>Michele</Text>
                                <Text style={{ fontSize: 14, color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={STYLES.recentChatStyles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ color: '#999999', fontSize: 12, marginRight: 15 }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -10 }}>
                            <Image source={require('../../assets/Images/Ellipse32.png')}
                                style={{ width: 70, height: 70, borderRadius: 100, marginLeft: 25 }} />
                            <View style={{ marginLeft: -20, height: 15, width: 15, borderRadius: 100, backgroundColor: '#00D9CE', borderRadius: 100 }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -60 }}>
                            <View style={{ justifyContent: 'center', marginLeft: 40 }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}>Maria</Text>
                                <Text style={{ fontSize: 14, color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default recentchatScreen;
