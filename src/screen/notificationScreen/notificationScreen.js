import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


const notificationScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('5%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                        <AntDesign name="arrowleft" size={24} color='#FFFFFF' style={{ marginLeft: hp('3%') }} />
                    </TouchableOpacity>
                    <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 30, width: 25, marginLeft: hp('-18%') }} />
                    <TouchableOpacity
                        style={styles.submitbtn}>
                        <Text style={{ fontSize: hp('2%'), color: '#00D9CE' }}>Clear</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%') }}>
                    <View style={styles.notificationview}>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), marginRight: hp('3%'), color: '#999999' }}>Just now</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: hp('-5%'), marginLeft: hp('2%'), alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: 'red', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="rupee" size={25} color='#FFFFFF' />
                            </View>
                            <View style={{ flex: 1, marginLeft: hp('2%') }}>
                                <Text style={{ color: '#F67742' }} >#Transaction</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>Your balance is low please rechatge to continue talking to the consultant</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%') }}>
                    <View style={styles.notificationview}>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), marginRight: hp('3%'), color: '#999999' }}>Just now</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: hp('-5%'), marginLeft: hp('2%'), alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#EEEEEE', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="rupee" size={25} color='#04DE71' />
                            </View>
                            <View style={{ flex: 1, marginLeft: hp('2%') }}>
                                <Text style={{ color: '#F67742' }} >#Transaction</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>Your Feb transaction have been completed please check your account</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.notificationview}>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), marginRight: hp('3%'), color: '#999999' }}>Yesterday</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginTop: hp('-5%'), marginLeft: hp('2%'), alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#EEEEEE', borderRadius: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome name="rupee" size={25} color='#04DE71' />
                            </View>
                            <View style={{ flex: 1, marginLeft: hp('2%') }}>
                                <Text style={{ color: '#F67742' }} >#Transaction</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>Your jan transaction have been completed please check your account</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default notificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5AC8FA",
    },
    notificationview: {
        height: hp('15%'),
        width: wp('90%'),
        backgroundColor: '#FFFFFF',
        marginTop: hp('2%'),
        borderRadius: hp('3%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 4,
    },
    submitbtn: {
        flexDirection: 'row',
        marginRight: hp('2%'),
        width: wp('25%'),
        height: hp('4%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: hp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})