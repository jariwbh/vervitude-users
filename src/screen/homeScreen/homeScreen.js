import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import SliderScreen from "../../components/slider/sliderScreen"
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

const homeScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.statusbar}>
                <TouchableOpacity >
                    <AntDesign name="search1" size={20} color='#808080' style={{ marginLeft: hp('2%') }} />
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
            <ScrollView>
                <View style={{ marginTop: hp('5%') }}>
                    <SliderScreen />
                </View>
                <TouchableOpacity style={{ marginTop: hp('3%'), marginLeft: wp('5%') }}>
                    <Text style={{ fontSize: hp('3%') }}>Cetegories</Text>
                </TouchableOpacity>
                <View style={{ marginTop: hp('0%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/entypoarea-graph.png')}
                                style={{ marginRight: wp('0%'), height: 40, width: 40 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text>Marketing</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/grommet-iconstechnology.png')}
                                style={{ marginRight: wp('0%'), height: 40, width: 40 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text >Tecnology</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/icoutline-design-services.png')}
                                style={{ marginRight: wp('0%'), height: 40, width: 40 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text>Design</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/icround-business-center.png')}
                                style={{ marginRight: wp('0%'), height: 40, width: 40 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: hp('1%') }}>
                            <Text>Business</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: hp('5%'), }}>
                            <Image source={require('../../assets/Images/icround-business-center.png')}
                                style={{ marginRight: wp('0%'), height: 40, width: 40 }} />
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
                                    style={{ alignItems: 'center', borderColor: '#FFFFFF', borderWidth: hp('0.2%'), height: 120, width: 120, marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Ranjan</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={15}

                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse32.png')}
                                    style={{ alignItems: 'center', height: 120, width: 120, borderColor: '#FFFFFF', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Maria</Text>
                                {/* <StarRating
                                    disabled={false}
                                    maxStars={3}
                                    starSize={15}
                                /> */}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse4.png')}
                                    style={{ alignItems: 'center', height: 120, width: 120, borderColor: '#FFFFFF', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Sunita</Text>
                                {/* <StarRating
                                    disabled={false}
                                    maxStars={3}
                                    starSize={15}
                                /> */}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse32.png')}
                                    style={{ alignItems: 'center', height: 120, width: 120, borderColor: '#FFFFFF', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Georgle</Text>
                                {/* <StarRating
                                    disabled={false}
                                    maxStars={3}
                                    starSize={15}
                                /> */}
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
        backgroundColor: "#00ff99",
    },
    statusbar: {
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
        marginTop: hp('10%'),
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