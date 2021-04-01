import React from 'react'
import { Text, View, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';



const disputesScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#FA114F', width: wp('100%'), height: hp('15%'), alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', borderBottomLeftRadius: hp('3%'), borderBottomRightRadius: hp('3%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                    <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%') }} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('4%'), fontWeight: 'bold', marginLeft: hp('3%'), color: '#FFFFFF' }}>Chat Disputes</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.chatdisputeview}>
                    <View onPress={() => { }}
                        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('0%'), }}>
                        <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                            <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>The Consultant Did not Respond </Text>
                            <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%') }}>14/02/2021 , 2:30 PM</Text>
                        </View>
                        <TouchableOpacity style={{ width: wp('27%'), height: hp('4%'), backgroundColor: '#C4C4C4', marginRight: hp('3%'), borderRadius: wp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp('2%'), color: '#303030' }}>In Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.chatdisputeview}>
                    <View onPress={() => { }}
                        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('0%'), }}>
                        <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                            <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Chat did not go thorugh </Text>
                            <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%') }}>28/02/2021 , 2:30 PM</Text>
                        </View>
                        <TouchableOpacity style={{ width: wp('27%'), height: hp('4%'), backgroundColor: '#04DE71', marginRight: hp('3%'), borderRadius: wp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp('2%'), color: '#FFFFFF' }} >Dipute Won </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.chatdisputeview}>
                    <View onPress={() => { }}
                        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('0%'), }}>
                        <View style={{ flexDirection: 'column', marginLeft: wp('0%') }}>
                            <Text style={{ fontSize: hp('2%'), color: '#000000', marginLeft: hp('2%') }}>Chat did not go thorugh </Text>
                            <Text style={{ fontSize: hp('2%'), color: '#999999', marginLeft: hp('2%') }}>14/02/2021 , 2:30 PM</Text>
                        </View>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("disputesdetailsScreen") }}
                            style={{ width: wp('27%'), height: hp('4%'), backgroundColor: '#FA114F', marginRight: hp('3%'), borderRadius: wp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp('2%'), color: '#FFFFFF' }}>Dipute Lost</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default disputesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    chatdisputeview: {
        height: hp('10%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('2.5%'),
        marginTop: hp('2%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 3,
        justifyContent: 'center'
    },
})