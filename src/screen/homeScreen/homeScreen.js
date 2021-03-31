import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import SliderScreen from "../../components/slider/sliderScreen"
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import StarRating from 'react-native-star-rating'
import MenuButton from '../../components/ProfileMenuButton/ProfileMenuButton';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

const homeScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: '#00D9CE', width: wp('100%'), height: hp('22%'), marginTop: hp('0%'), marginRight: hp('0%'), borderBottomLeftRadius: hp('5%'), borderBottomRightRadius: hp('5%') }}>
                <View style={{ marginTop: hp('3%'), justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }} >
                    <View style={{ marginRight: hp('2%') }}>
                        <MenuButton onPress={() => { }} />
                    </View>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("notificationScreen") }}>
                        <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 30, width: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ height: hp('7'), width: wp('35%'), backgroundColor: '#FFFFFF', flexDirection: 'row', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', marginLeft: wp('20%') }}>
                        <Text style={{ fontSize: hp('2.8%'), color: '#00D9CE' }}>5324.00</Text>
                        <View style={{ marginLeft: hp('2%'), justifyContent: 'center' }}>
                            <MaterialIcons name="account-balance-wallet" size={30} color='#00D9CE' />
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
                </View>
            </View>
            <ScrollView>
                <View style={{ marginTop: hp('5%') }}>
                    <SliderScreen />
                </View>
                <TouchableOpacity style={{ marginTop: hp('3%'), marginLeft: wp('5%') }} onPress={() => { props.navigation.navigate("selectCategoryScreen") }}>
                    <Text style={{ fontSize: hp('3%') }}>Cetegories</Text>
                </TouchableOpacity>
                <View style={{ marginTop: hp('0%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/entypoareagraph.png')}
                                style={{ height: 70, width: 70 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text>Marketing</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/grommeticonstechnology.png')}
                                style={{ height: 70, width: 70 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text >Tecnology</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/icoutlinedesignservices.png')}
                                style={{ height: 70, width: 70 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text>Design</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter.png')}
                                style={{ height: 70, width: 70 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text>Business</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter.png')}
                                style={{ height: 70, width: 70 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text>All Cetegory</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ marginTop: hp('3%'), marginLeft: wp('5%') }}>
                    <Text style={{ fontSize: hp('3%') }}>Top Consultants</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginBottom: hp('5%') }}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => props.navigation.navigate("myProfileScreen")}>
                                <Image source={require('../../assets/Images/Ellipse4.png')}
                                    style={{ alignItems: 'center', borderColor: '#FFFFFF', borderWidth: hp('0.2%'), height: 100, width: 100, marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Ranjan</Text>
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%') }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse32.png')}
                                    style={{ alignItems: 'center', height: 100, width: 100, borderColor: '#FFFFFF', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Maria</Text>
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%') }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse4.png')}
                                    style={{ alignItems: 'center', height: 100, width: 100, borderColor: '#FFFFFF', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Sunita</Text>
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%') }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse32.png')}
                                    style={{ alignItems: 'center', height: 100, width: 100, borderColor: '#FFFFFF', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Georgle</Text>
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%') }}>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        starSize={15}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default homeScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    category: {
        height: hp('5'),
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