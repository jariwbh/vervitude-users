import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import ChatMenu from '../../components/ChatMenu/ChatMenu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ranjanchatScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#FFB629', width: wp('100%'), height: hp('22%'), flexDirection: 'column', marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('5%'), marginLeft: hp('1%') }}>
                        <TouchableOpacity style={styles.chatIcon} onPress={() => { props.navigation.navigate(SCREEN.CHATHISTORYSCREEN) }} >
                            <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        <Image source={require('../../assets/Images/Ellipse4.png')}
                            style={{ width: 50, height: 52, borderRadius: hp('7%'), marginLeft: hp('-25%') }} />

                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginLeft: wp('-38%') }}>
                            <Text style={{ fontSize: hp('3%'), color: '#FFFFFF' }}>Ranjan</Text>
                            <Text style={{ fontSize: hp('1.5%'), color: '#000000' }}>Online</Text>
                        </View>
                        <TouchableOpacity style={styles.categoryIcon} onPress={() => { props.navigation.navigate(SCREEN.CHATHISTORYSCREEN) }} >
                            <Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%'), }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>
                        <TouchableOpacity onPress={() => { }}
                            style={{ width: wp('35%'), height: hp('6%'), backgroundColor: '#FFFFFF', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', margin: hp('0%') }}>
                            <Text style={{ fontSize: hp('2%'), color: '#FFB629' }}>Start a Project</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}
                            style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <MaterialCommunityIcons name="dots-vertical-circle" size={30} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.chatview}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('65%') }}>
                        <View style={styles.inputview}>
                            <TouchableOpacity >
                                <Image source={require('../../assets/Images/addicon.png')} style={{ width: 25, height: 25, marginLeft: wp('4%') }} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.inputtext}
                                placeholder="Write Something here"
                                type='clear'
                                placeholderTextColor="#999999"
                                returnKeyType="done"
                            />
                            <TouchableOpacity >
                                <Image source={require('../../assets/Images/sendicon.png')} style={{ width: 25, height: 25, marginRight: wp('4%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: hp('10%') }}></View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default ranjanchatScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    chatview: {
        marginTop: hp('3%'),
        width: wp('100%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('5%'),
        height: hp('80%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 3
    },
    chatIcon: {
        width: wp("7%"),
        height: wp("7%"),
        borderRadius: hp('6%'),
        //  marginLeft: wp('10%'),
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    inputview: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderColor: '#737373',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        width: wp('90%'),
        height: hp('8%'),
        borderRadius: hp('2%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    inputtext: {
        fontSize: hp('2.5%'),
        flex: 1,
        marginLeft: wp('4%')
    }
})
