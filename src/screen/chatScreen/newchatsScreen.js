import React from 'react'
import { View, Text, SafeAreaView, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import ChatMenu from '../../components/ChatMenu/ChatMenu'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const newchatsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#5AC8FA', width: wp('100%'), height: hp('20%'), flexDirection: 'column', marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp('3%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                        <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%'), }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('3%'), marginLeft: hp('-25%'), color: '#FFFFFF' }}>New Chats</Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate(myProfileScreen) }}>
                        <Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%'), }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ width: wp('35%'), height: hp('6%'), backgroundColor: '#FFFFFF', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', margin: hp('4%') }}>
                    <Text style={{ fontSize: hp('2%'), color: '#5AC8FA' }}>Find a Consultant</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statusbar}>
                <TouchableOpacity >
                    <AntDesign name="search1" size={20} color='#5AC8FA' style={{ marginLeft: hp('2%') }} />
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

            <View style={{ marginLeft: wp('5%'), marginTop: hp('3%') }}>
                <Text style={{ fontSize: hp('2.5%') }}>Top Consultants</Text>
            </View>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('3%'), flex: 1 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Image source={require('../../assets/Images/Ellipse4.png')}
                                    style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: hp('15%'), borderWidth: hp('0.2%') }}
                                />
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%'), flexDirection: 'row' }}>
                                    <Text>4K</Text>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                        rating={3}
                                        fullStarColor={'#F1C40E'}
                                        emptyStarColor={'#000000'}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Ravindra</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), }}>Speciliazition</Text>
                                <Text le={{ fontSize: hp('2%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', marginTop: hp('3%') }}>
                                    <Text style={{ fontSize: hp('2.5%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View >
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={20} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2.5%'), color: '#000000', marginTop: hp('2%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: hp('2%'), marginTop: hp('1%'), }}>
                            <Image source={require('../../assets/Images/Group52.png')}
                                style={{ width: 10, height: 30 }}
                            />
                        </View> */}
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('3%'), flex: 1 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Image source={require('../../assets/Images/user1.png')}
                                    style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: hp('15%'), borderWidth: hp('0.2%') }}
                                />
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%'), flexDirection: 'row' }}>
                                    <Text>4K</Text>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                        rating={3}
                                        fullStarColor={'#F1C40E'}
                                        emptyStarColor={'#000000'}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Ruby</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), }}>Speciliazition</Text>
                                <Text le={{ fontSize: hp('2%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', marginTop: hp('3%') }}>
                                    <Text style={{ fontSize: hp('2.5%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View >
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={20} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2.5%'), color: '#000000', marginTop: hp('2%'), marginLeft: hp('0.5%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: hp('2%'), marginTop: hp('1%'), }}>
                            <Image source={require('../../assets/Images/Group52.png')}
                                style={{ width: 10, height: 30 }}
                            />
                        </View> */}
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('3%'), flex: 1 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Image source={require('../../assets/Images/user4.png')}
                                    style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: hp('15%'), borderWidth: hp('0.2%') }}
                                />
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%'), flexDirection: 'row' }}>
                                    <Text>4K</Text>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                        rating={3}
                                        fullStarColor={'#F1C40E'}
                                        emptyStarColor={'#000000'}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Sofia</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), }}>Speciliazition</Text>
                                <Text le={{ fontSize: hp('2%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', marginTop: hp('3%') }}>
                                    <Text style={{ fontSize: hp('2.5%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View >
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={20} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2.5%'), color: '#000000', marginTop: hp('2%'), marginLeft: hp('0.5%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <View style={styles.counsultantview}>
                        {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: hp('2%'), marginTop: hp('1%'), }}>
                            <Image source={require('../../assets/Images/Group52.png')}
                                style={{ width: 10, height: 30 }}
                            />
                        </View> */}
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('3%'), flex: 1 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Image source={require('../../assets/Images/user1.png')}
                                    style={{ width: 100, height: 100, borderColor: '#55BCEB', borderRadius: hp('15%'), borderWidth: hp('0.2%') }}
                                />
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%'), flexDirection: 'row' }}>
                                    <Text>4K</Text>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                        rating={3}
                                        fullStarColor={'#F1C40E'}
                                        emptyStarColor={'#000000'}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', }}>Miranda</Text>
                                <Text style={{ fontSize: hp('2.5%'), }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), }}>Speciliazition</Text>
                                <Text le={{ fontSize: hp('2%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', marginTop: hp('3%') }}>
                                    <Text style={{ fontSize: hp('2.5%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View >
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={20} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2.5%'), color: '#000000', marginTop: hp('2%'), marginLeft: hp('0.5%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default newchatsScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    counsultantview: {

        height: hp('35%'),
        width: wp('90%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('3%'),
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