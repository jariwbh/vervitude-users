import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const subcategoryScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#2094FA', width: wp('100%'), height: hp('25%'), marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('5%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("selectCategoryScreen") }}>
                        <AntDesign name="arrowleft" color="#66ccff" size={24} style={{ marginLeft: hp('3%') }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('4%'), color: '#5AC8FA', marginLeft: hp('0%'), fontWeight: 'bold', color: '#FFFFFF' }}>Sub Category</Text>
                    <TouchableOpacity style={styles.category}>
                        <Text style={{ fontSize: hp('2.8%'), color: '#00ff00' }}>₹ 5000</Text>
                        <View style={{ marginLeft: hp('2%'), justifyContent: 'center' }}>
                            <MaterialIcons name="account-balance-wallet" size={25} color='#00ff00' />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.statusbar}>
                    <TouchableOpacity >
                        <AntDesign name="search1" size={20} color='#3399ff' style={{ marginLeft: hp('2%') }} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.statInput}
                        placeholder="Search App"
                        type='clear'
                        placeholderTextColor="#737373"
                        returnKeyType="done"
                        autoCapitalize="none"
                        autoCorrect={false}

                    />
                    <TouchableOpacity >
                        <Image source={require('../../assets/Images/filter.png')} style={{ width: 20, height: 22, marginRight: hp('2%') }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginLeft: wp('3%'), marginTop: hp('2%') }}>
                    <Text style={{ fontSize: hp('4%') }}>Technology</Text>
                </View>
                <View style={{ marginTop: hp('3%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/Group41.png')} style={{ width: 70, height: 70, borderRadius: hp('1%') }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>All - Tech</Text>
                        </View>
                    </View>
                    <View >
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/Group43.png')} style={{ width: 70, height: 70, borderRadius: hp('1%') }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>CRM</Text>
                        </View>
                    </View>
                    <View >
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/Group45.png')} style={{ width: 70, height: 70, borderRadius: hp('1%') }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>ERP</Text>
                        </View>
                    </View>
                    <View >
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/Group47.png')} style={{ width: 70, height: 70, borderRadius: hp('1%') }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%'), }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>web</Text>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}> Development</Text>
                        </View>
                    </View>
                    <View >
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
                            <FontAwesome name="circle" size={110} color='#EEEEEE' />
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
                            <FontAwesome name="circle" size={110} color='#EEEEEE' />
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
                <View style={{ marginBottom: hp('10%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default subcategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    category: {
        height: hp('7'),
        width: wp('35%'),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp('0%'),
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginRight: hp('2%'),

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
        marginTop: hp('2%'),
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
    categoryview: {
        justifyContent: 'center',
        alignItems: 'center',

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
    cauve: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: hp('-5%'),
        marginTop: hp('-6%'),
        overflow: 'hidden',
        backgroundColor: 'transparent'
    }
})