import React from 'react'
import { View, Text, SafeAreaView, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const newchatsScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#5AC8FA', width: wp('100%'), height: hp('20%'), flexDirection: 'column', borderBottomLeftRadius: hp('3%'), borderBottomRightRadius: hp('3%') }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: hp('5%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("recentchatScreen") }}>
                        <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%') }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('4%'), marginLeft: hp('-25%'), color: '#FFFFFF', fontWeight: 'bold' }}>New Chats</Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("homeScreen") }}>
                        <Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%') }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ width: wp('35%'), height: hp('5%'), backgroundColor: '#FFFFFF', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', margin: hp('3%') }}>
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

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginLeft: wp('5%'), marginTop: hp('3%') }}>
                    <Text style={{ fontSize: hp('2.5%') }}>Top Consultants</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.counsultantview}>
                        <View style={styles.cauve}>
                            <FontAwesome name="circle" size={110} color='#FFB629' />
                            <Image source={require('../../assets/Images/medal1.png')}
                                style={{ width: 45, height: 37, position: 'absolute', right: 40, top: hp('7%') }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('-5%'), flex: 1 }}>
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
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', marginTop: hp('-2%') }}>Ravindra</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: hp('1.8%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={15} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.counsultantview}>
                        <View style={styles.cauve}>
                            <FontAwesome name="circle" size={110} color='#999999' />
                            <Image source={require('../../assets/Images/medal2.png')}
                                style={{ width: 45, height: 37, position: 'absolute', right: 40, top: hp('7%') }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('-5%'), flex: 1 }}>
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
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', marginTop: hp('-2%') }}>Ruby</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: hp('1.8%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={15} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.counsultantview}>
                        <View style={styles.cauve}>
                            <FontAwesome name="circle" size={110} color='#FFB629' />
                            <Image source={require('../../assets/Images/medal1.png')}
                                style={{ width: 45, height: 37, position: 'absolute', right: 40, top: hp('7%') }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('-5%'), flex: 1 }}>
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
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', marginTop: hp('-2%') }}>Sofia</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: hp('1.8%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={15} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.counsultantview}>
                        <View style={styles.cauve}>
                            <FontAwesome name="circle" size={110} color='#999999' />
                            <Image source={require('../../assets/Images/medal2.png')}
                                style={{ width: 45, height: 37, position: 'absolute', right: 40, top: hp('7%') }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('-5%'), flex: 1 }}>
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
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', marginTop: hp('-2%') }}>Miranda</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: hp('1.8%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={15} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.counsultantview}>
                        <View style={styles.cauve}>
                            <FontAwesome name="circle" size={110} color='#9DF9FF' />
                            <Image source={require('../../assets/Images/medal3.png')}
                                style={{ width: 45, height: 37, position: 'absolute', right: 40, top: hp('7%') }}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginTop: hp('-5%'), flex: 1 }}>
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
                                <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold', marginTop: hp('-2%') }}>Miranda</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#999999' }}>Business Counsultant</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%') }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), color: '#999999' }}>Speciliazition</Text>
                                <Text style={{ fontSize: hp('1.8%'), marginTop: hp('1%') }}>CRM,Digital Marketing,Marketing</Text>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), color: '#6ABF81', fontWeight: 'bold' }}>₹ 25 per min</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#5AC8FA' }}>
                                            <FontAwesome5 name="edit" size={15} color='#FFFFFF' style={{ marginLeft: hp('0%') }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: hp('2%'), color: '#000000', marginTop: hp('0%') }}>chat</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: hp('5%') }} />
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
        height: hp('30%'),
        width: wp('92%'),
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
        overflow: 'hidden',
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: '#999999',
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
    cauve: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: hp('-5%'),
        marginTop: hp('-6%'),
        overflow: 'hidden',
        backgroundColor: 'transparent'
    }
})