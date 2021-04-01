import React from 'react'
import { View, Text, SafeAreaView, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import ChatMenu from '../../components/ChatMenu/ChatMenu'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const recentchatScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#FFB629', width: wp('100%'), height: hp('22%'), flexDirection: 'column', marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp('3%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                        <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%'), }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('4%'), marginLeft: hp('-25%'), color: '#FFFFFF' }}>My Wallet</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%'), }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { props.navigation.navigate("newchatsScreen") }}
                    style={{ width: wp('35%'), height: hp('6%'), backgroundColor: '#FFFFFF', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', margin: hp('4%') }}>
                    <Text style={{ fontSize: hp('2%'), color: '#FFB629' }}>Find a Consultant</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statusbar}>
                <TouchableOpacity >
                    <AntDesign name="search1" size={20} color='#FFB629' style={{ marginLeft: hp('2%') }} />
                </TouchableOpacity>
                <TextInput
                    style={styles.statInput}
                    placeholder="Search Chats"
                    type='clear'
                    placeholderTextColor="#737373"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}

                />
            </View>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('1%'), marginRight: wp('2%') }}>
                            <Text>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 100, height: 100, borderRadius: hp('15%'), }}
                            />
                            <FontAwesome name="circle" size={21} color="#FFFFFF" style={{ marginTop: wp('-16%'), marginLeft: hp('-3'), borderRadius: 12, borderColor: '#000000', borderWidth: 1 }} />
                            <View style={{ marginLeft: hp('3%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Ranjan</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Design / UX Design</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('1%'), marginRight: wp('2%') }}>
                            <Text>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), }}>
                            <Image source={require('../../assets/Images/user4.png')}
                                style={{ width: 100, height: 100, borderRadius: hp('15%'), }}
                            />
                            <FontAwesome name="circle" size={21} color="#00D9CE" style={{ marginTop: wp('-16%'), marginLeft: hp('-3'), }} />
                            <View style={{ marginLeft: hp('2%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Ruby</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('1%'), marginRight: wp('2%') }}>
                            <Text>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), }}>
                            <Image source={require('../../assets/Images/user1.png')}
                                style={{ width: 100, height: 100, borderRadius: hp('15%'), }}
                            />
                            <FontAwesome name="circle" size={21} color="#00D9CE" style={{ marginTop: wp('-16%'), marginLeft: hp('-3'), }} />
                            <View style={{ marginLeft: hp('2%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Michele</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('1%'), marginRight: wp('2%') }}>
                            <Text>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), }}>
                            <Image source={require('../../assets/Images/Ellipse32.png')}
                                style={{ width: 100, height: 100, borderRadius: hp('15%'), }}
                            />
                            <FontAwesome name="circle" size={21} color="#00D9CE" style={{ marginTop: wp('-16%'), marginLeft: hp('-3'), }} />
                            <View style={{ marginLeft: hp('2%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Maria</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('1%'), marginRight: wp('2%') }}>
                            <Text>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 100, height: 100, borderRadius: hp('15%'), }}
                            />
                            <FontAwesome name="circle" size={21} color="#FFFFFF" style={{ marginTop: wp('-16%'), marginLeft: hp('-3'), borderRadius: 12, borderColor: '#000000', borderWidth: 1 }} />
                            <View style={{ marginLeft: hp('2%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Ranjan</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('1%'), marginRight: wp('2%') }}>
                            <Text>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), }}>
                            <Image source={require('../../assets/Images/user4.png')}
                                style={{ width: 100, height: 100, borderRadius: hp('15%'), }}
                            />
                            <FontAwesome name="circle" size={21} color="#00D9CE" style={{ marginTop: wp('-16%'), marginLeft: hp('-3'), }} />
                            <View style={{ marginLeft: hp('2%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Ruby</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('1%'), marginRight: wp('2%') }}>
                            <Text>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), }}>
                            <Image source={require('../../assets/Images/user1.png')}
                                style={{ width: 100, height: 100, borderRadius: hp('15%'), }}
                            />
                            <FontAwesome name="circle" size={21} color="#00D9CE" style={{ marginTop: wp('-16%'), marginLeft: hp('-3'), }} />
                            <View style={{ marginLeft: hp('2%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Michele</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default recentchatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    counsultantview: {

        height: hp('25%'),
        width: wp('90%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('5%'),
        shadowOpacity: 10,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderColor: '#737373',
        borderRadius: hp('2%'),
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: hp('3%'),
        width: wp('90%'),
        height: hp('6.5%'),
        marginLeft: hp('2.5%'),
        alignItems: "center",
        justifyContent: 'center',
    },
    statInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        marginLeft: hp('2%'),
        alignItems: "center",
    },
})