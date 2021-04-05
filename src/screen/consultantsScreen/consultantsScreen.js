import React from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const consultantsScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('3%'), marginRight: wp('2%') }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                    <AntDesign name="arrowleft" color="#FFFFFF" size={24} style={{ marginLeft: wp('3%'), }} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('4%'), fontWeight: 'bold', color: '#FFFFFF' }}>Consultant</Text>
                <TouchableOpacity onPress={() => { props.navigation.navigate("recentchatScreen") }}>
                    <Image source={require('../../assets/Images/chaticon.png')}
                        style={{ width: 26, height: 25 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('chatScreen')}
                    style={{ width: wp('30%'), height: hp('5%'), backgroundColor: '#FFFFFF', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: hp('2%'), color: '#5AC8FA' }}>Start Chat</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={styles.counsultantview}>
                        <View style={styles.cauve}>
                            <FontAwesome name="circle" size={110} color='#FFB629' />
                            <Image source={require('../../assets/Images/medal1.png')}
                                style={{ width: 45, height: 37, position: 'absolute', right: 40, top: hp('7%') }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp('-6%'), alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ width: 100, height: 100, borderColor: '#D1E8EA', borderRadius: hp('15%'), borderWidth: hp('1%') }}
                            />
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('3.5%'), color: '#000000', fontWeight: 'bold' }}>Ranjan</Text>
                                <Text style={{ fontSize: hp('2.5%'), color: '#000000' }}>Design Coach</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>Mumbai, India</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: hp('3%'), justifyContent: 'space-between', marginRight: hp('2%'), marginLeft: hp('2%') }}>
                            <View>
                                <Text style={{ fontSize: hp('2%'), textAlign: 'center', color: '#000000' }}>23</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#999999' }}>Happy Users</Text>
                            </View>
                            <View style={styles.verticleLine}></View>
                            <View>
                                <Text style={{ fontSize: hp('2%'), textAlign: 'center', color: '#000000' }}>25</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#999999' }}>Charges Per Minute </Text>
                            </View>
                            <View style={styles.verticleLine}></View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={10}
                                        rating={3}
                                        fullStarColor={'#F1C40E'}
                                        emptyStarColor={'#000000'}
                                    />
                                </View>
                                <Text style={{ fontSize: hp('2.5%'), textAlign: 'center', color: '#000000' }}>4.5</Text>
                                <Text style={{ fontSize: hp('1.5%'), color: '#000000' }}>1.2K Ratings</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <View style={styles.counsultantdetail}>
                                <Text style={{ fontSize: hp('2%'), marginTop: hp('2%'), marginLeft: wp('2%') }}>Ranjan, comes with 20 years of experience as UX and VIsual Designers. </Text>
                                <Text style={{ fontSize: hp('2%'), marginTop: hp('2%'), marginLeft: wp('2%') }}>Helping Clients all over the world. Ranjan has been Helping brands create great user experience centered products.</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('2%'), }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }} />
                                </View>
                                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#000000', marginTop: hp('2%'), marginLeft: wp('2%') }}>It has been Great Experience using Vervitude, I have helped more then 1000’s of people learn new technologies, while I made a passive income. Kudos to Vervitude Team</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' }}>Brands</Text>
                            <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: '#ADADAD' }}>The Consultant has helped 50+ Brands</Text>
                        </View>
                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: hp('2%'), }}>
                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/a.png')} style={{
                                    width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%')
                                }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }}>
                                <AntDesign name="closecircleo" size={24} color='#000000' />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/b.png')} style={{ width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%') }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }}>
                                <AntDesign name="closecircleo" size={24} color='#000000' />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/c.png')} style={{ width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%') }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }}>
                                <AntDesign name="closecircleo" size={20} color='#000000' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: hp('2%'), }}>
                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/d.png')} style={{
                                    width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%')
                                }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }}>
                                <AntDesign name="closecircleo" size={24} color='#000000' />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/e.png')} style={{ width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%') }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }} >
                                <AntDesign name="closecircleo" size={24} color='#000000' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/c.png')} style={{ width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%') }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }} >
                                <AntDesign name="closecircleo" size={24} color='#000000' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: hp('2%'), }}>
                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/d.png')} style={{
                                    width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%')
                                }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }}>
                                <AntDesign name="closecircleo" size={24} color='#000000' />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/e.png')} style={{ width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%') }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }} >
                                <AntDesign name="closecircleo" size={24} color='#000000' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.brandstyle}>
                                <Image source={require('../../assets/Images/c.png')} style={{ width: 80, height: 80, borderRadius: hp('15%'), borderColor: '#AAAAAA', borderWidth: hp('0.3%') }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('-11%') }} >
                                <AntDesign name="closecircleo" size={24} color='#000000' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: hp('3%') }}></View>
                    </View>
                </View>
                <View style={{ marginBottom: hp('3%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default consultantsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5AC8FA'
    },
    counsultantview: {
        flex: 1,
        //    height: hp('%'),
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
        overflow: 'hidden'
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
    counsultantdetail: {
        height: hp('35%'),
        width: wp('80%'),
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
    cauve: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: hp('-5%'),
        marginTop: hp('-6%'),
        overflow: 'hidden',
        backgroundColor: 'transparent'
    }
})