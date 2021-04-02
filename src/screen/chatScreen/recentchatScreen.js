import React from 'react'
import { View, Text, SafeAreaView, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const recentchatScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#FFB629', width: wp('100%'), height: hp('22%'), flexDirection: 'column', borderBottomLeftRadius: hp('3%'), borderBottomRightRadius: hp('3%') }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('5%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                        <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%') }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('4%'), marginLeft: hp('-20%'), color: '#FFFFFF', fontWeight: 'bold' }}>Recent Chats</Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('homeScreen') }}>
                        <Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%') }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { props.navigation.navigate("newchatsScreen") }}
                    style={{ width: wp('35%'), height: hp('5%'), backgroundColor: '#FFFFFF', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', margin: hp('3%') }}>
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
                    placeholderTextColor="#999999"
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: wp('2%') }}>
                            <Text style={{ color: "#999999", fontSize: hp('1.8%'), marginTop: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), marginTop: hp('-3%') }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 80, height: 80, borderRadius: hp('15%') }}
                            />
                            <FontAwesome name="circle" size={16} color="#EEEEEE" style={{ marginTop: wp('-14%'), marginLeft: hp('-2') }} />
                            <View style={{ marginLeft: hp('3%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: "#000000" }}>Ranjan</Text>
                                <Text style={{ fontSize: hp('2%'), color: "#999999" }}>Design / UX Design</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: wp('2%') }}>
                            <Text style={{ color: "#999999", fontSize: hp('1.8%'), marginTop: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), marginTop: hp('-3%') }}>
                            <Image source={require('../../assets/Images/user4.png')}
                                style={{ width: 80, height: 80, borderRadius: hp('15%') }}
                            />
                            <FontAwesome name="circle" size={16} color="#00D9CE" style={{ marginTop: wp('-14%'), marginLeft: hp('-2') }} />
                            <View style={{ marginLeft: hp('3%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: "#000000" }}>Ruby</Text>
                                <Text style={{ fontSize: hp('2%'), color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: wp('2%') }}>
                            <Text style={{ color: "#999999", fontSize: hp('1.8%'), marginTop: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), marginTop: hp('-3%') }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 80, height: 80, borderRadius: hp('15%') }}
                            />
                            <FontAwesome name="circle" size={16} color="#00D9CE" style={{ marginTop: wp('-14%'), marginLeft: hp('-2') }} />
                            <View style={{ marginLeft: hp('3%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: "#000000" }}>Michele</Text>
                                <Text style={{ fontSize: hp('2%'), color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: wp('2%') }}>
                            <Text style={{ color: "#999999", fontSize: hp('1.8%'), marginTop: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), marginTop: hp('-3%') }}>
                            <Image source={require('../../assets/Images/Ellipse32.png')}
                                style={{ width: 80, height: 80, borderRadius: hp('15%') }}
                            />
                            <FontAwesome name="circle" size={16} color="#EEEEEE" style={{ marginTop: wp('-14%'), marginLeft: hp('-2') }} />
                            <View style={{ marginLeft: hp('3%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: "#000000" }}>Maria</Text>
                                <Text style={{ fontSize: hp('2%'), color: "#999999" }}>Business Consultant/ Marketing</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={styles.counsultantview} onPress={() => { props.navigation.navigate("chatScreen") }}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: wp('2%') }}>
                            <Text style={{ color: "#999999", fontSize: hp('1.8%'), marginTop: hp('2%') }}>2:30 PM</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginLeft: hp('2%'), marginTop: hp('-3%') }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 80, height: 80, borderRadius: hp('15%') }}
                            />
                            <FontAwesome name="circle" size={16} color="#EEEEEE" style={{ marginTop: wp('-14%'), marginLeft: hp('-2') }} />
                            <View style={{ marginLeft: hp('3%'), flex: 1 }}>
                                <Text style={{ fontSize: hp('3%'), fontWeight: 'bold', color: "#000000" }}>Ranjan</Text>
                                <Text style={{ fontSize: hp('2%'), color: "#999999" }}>Design / UX Design</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: hp('5%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default recentchatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    counsultantview: {
        height: hp('15%'),
        width: wp('90%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('2%'),
        marginTop: hp('2%'),
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
        height: hp('7%'),
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