import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import * as SCREEN from '../../context/screen/screenName';
import ChatMenu from '../../components/ChatMenu/ChatMenu'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function chatHistoryScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('5%') }}>
                    <TouchableOpacity style={styles.categoryIcon} onPress={() => { props.navigation.navigate(SCREEN.HOMESCREEN) }} >
                        <AntDesign name="arrowleft" size={24} color="#5AC8FA" />
                    </TouchableOpacity>
                    <View style={{ marginTop: hp('0%'), justifyContent: 'center', alignItems: 'center', marginLeft: hp('40%') }}>
                        <Image source={require('../../assets/images/chat.png')} style={{ width: 50, height: 25 }} />
                        <Text style={{ fontSize: hp('2%'), color: '#5AC8FA', position: 'absolute' }}>20K</Text>
                    </View>
                    <ChatMenu onPress={() => { }} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                    <Text style={{ width: wp('25%'), fontSize: hp('2%'), marginLeft: hp('2%'), marginRight: hp('2%'), color: '#5F5F5F' }}>Marketing</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#BEBEBE', marginLeft: hp('-6%'), marginRight: hp('2%') }} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.RUBYCHATSCREEN) }} style={styles.chatview}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ color: '#5AC8FA', marginLeft: hp('2%'), fontSize: hp('1.5%') }}>New</Text>
                            <Text style={{ color: '#999999', fontSize: hp('1.5%'), marginRight: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image source={require('../../assets/images/profile.png')}
                                style={{ marginTop: hp('-0%'), width: 70, height: 70, borderRadius: hp('7%'), marginLeft: hp('3%'), }} />
                            <FontAwesome name="circle" size={21} color="#EEEEEE" style={{ marginLeft: wp('-35%') }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('-15%') }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000' }}>Ruby</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71' }}>+ ₹ 20.00</Text>
                            </View>
                            <View style={{ marginRight: hp('3%'), width: 30, height: 30, marginTop: hp('2%'), alignItems: 'center', justifyContent: 'center', borderRadius: hp('7%'), backgroundColor: '#0F74C8' }}>
                                <Text style={{ color: '#FFFFFF' }}>5</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.RUBYCHATSCREEN) }} style={styles.chatview}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ color: '#999999', fontSize: hp('1.5%'), marginRight: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image source={require('../../assets/images/profile.png')} style={{ marginTop: hp('0%'), width: 70, height: 70, borderRadius: hp('7%'), marginLeft: hp('3%'), }} />
                            <FontAwesome name="circle" size={21} color="#5AC8FA" style={{ marginLeft: wp('-4%') }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('5%') }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000' }}>Maria</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71' }}>+ ₹ 0.00</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                    <Text style={{ width: wp('25%'), fontSize: hp('2%'), marginLeft: hp('2%'), marginRight: hp('2%'), color: '#5F5F5F' }}>DESIGN</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#BEBEBE', marginLeft: hp('-6%'), marginRight: hp('2%') }} />
                </View>


                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.RUBYCHATSCREEN) }} style={styles.chatview}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ color: '#999999', fontSize: hp('1.5%'), marginRight: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image source={require('../../assets/images/profile.png')}
                                style={{ marginTop: hp('-0%'), width: 70, height: 70, borderRadius: hp('7%'), marginLeft: hp('3%'), }} />
                            <FontAwesome name="circle" size={21} color="#5AC8FA" style={{ marginLeft: wp('-35%') }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('-15%') }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000' }}>Maya</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71' }}>+ ₹ 20.00</Text>
                            </View>
                            <View style={{ marginRight: hp('3%'), width: 30, height: 30, marginTop: hp('2%'), alignItems: 'center', justifyContent: 'center', borderRadius: hp('7%'), backgroundColor: '#0F74C8' }}>
                                <Text style={{ color: '#FFFFFF' }}>5</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.RUBYCHATSCREEN) }} style={styles.chatview}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ color: '#999999', fontSize: hp('1.5%'), marginRight: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image source={require('../../assets/images/profile.png')} style={{ marginTop: hp('-0%'), width: 70, height: 70, borderRadius: hp('7%'), marginLeft: hp('3%'), }} />
                            <FontAwesome name="circle" size={21} color="#5AC8FA" style={{ marginLeft: wp('-4%') }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('5%') }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000' }}>Maria</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71' }}>+ ₹ 20.00</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.RUBYCHATSCREEN) }} style={styles.chatview}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ color: '#999999', fontSize: hp('1.5%'), marginRight: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image source={require('../../assets/images/profile.png')}
                                style={{ marginTop: hp('-0%'), width: 70, height: 70, borderRadius: hp('7%'), marginLeft: hp('3%'), }} />
                            <FontAwesome name="circle" size={21} color="#5AC8FA" style={{ marginLeft: wp('-35%') }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('-15%') }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000' }}>Rajan</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71' }}>+ ₹ 20.00</Text>
                            </View>
                            <View style={{ marginRight: hp('3%'), width: 30, height: 30, marginTop: hp('2%'), alignItems: 'center', justifyContent: 'center', borderRadius: hp('7%'), backgroundColor: '#0F74C8' }}>
                                <Text style={{ color: '#FFFFFF' }}>5</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                    <Text style={{ width: wp('60%'), fontSize: hp('2%'), marginLeft: hp('2%'), color: '#5F5F5F' }}>BUSINESS CONSULTING</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#BEBEBE', marginLeft: hp('-12%'), marginRight: hp('2%') }} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.RUBYCHATSCREEN) }} style={styles.chatview}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ color: '#999999', fontSize: hp('1.5%'), marginRight: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image source={require('../../assets/images/profile.png')} style={{ marginTop: hp('-0%'), width: 70, height: 70, borderRadius: hp('7%'), marginLeft: hp('3%'), }} />
                            <FontAwesome name="circle" size={21} color="#EEEEEE" style={{ marginLeft: wp('-4%') }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('5%') }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000' }}>Maria</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71' }}>+ ₹ 20.00</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.RUBYCHATSCREEN) }} style={styles.chatview}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ color: '#999999', fontSize: hp('1.5%'), marginRight: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image source={require('../../assets/images/profile.png')}
                                style={{ marginTop: hp('-0%'), width: 70, height: 70, borderRadius: hp('7%'), marginLeft: hp('3%'), }} />
                            <FontAwesome name="circle" size={21} color="#5AC8FA" style={{ marginLeft: wp('-35%') }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('-15%') }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000' }}>Ruby</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71' }}>+ ₹ 20.00</Text>
                            </View>
                            <View style={{ marginRight: hp('3%'), width: 30, height: 30, marginTop: hp('2%'), alignItems: 'center', justifyContent: 'center', borderRadius: hp('7%'), backgroundColor: '#0F74C8' }}>
                                <Text style={{ color: '#FFFFFF' }}>5</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.RUBYCHATSCREEN) }} style={styles.chatview}>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ color: '#999999', fontSize: hp('1.5%'), marginRight: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image source={require('../../assets/images/profile.png')} style={{ marginTop: hp('-0%'), width: 70, height: 70, borderRadius: hp('7%'), marginLeft: hp('3%'), }} />
                            <FontAwesome name="circle" size={21} color="#5AC8FA" style={{ marginLeft: wp('-4%') }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('5%') }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', color: '#000000' }}>Maria</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#04DE71' }}>+ ₹ 20.00</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: hp('10%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default chatHistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    chatview: {
        width: wp('90%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('1%'),
        height: hp('15%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1
    },
    categoryIcon: {
        width: wp("7%"),
        height: wp("7%"),
        borderRadius: hp('6%'),
        marginLeft: wp('5%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
})