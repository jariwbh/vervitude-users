import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function selectCategoryScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('5%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("myProfileScreen") }}>
                        <AntDesign name="arrowleft" color="#5AC8FA" size={24} style={{ marginLeft: hp('3%') }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('3%'), color: '#5AC8FA', marginLeft: hp('0%') }}>Categories</Text>
                    <TouchableOpacity
                        style={{ height: hp('7'), width: wp('35%'), backgroundColor: '#FFFFFF', flexDirection: 'row', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', marginLeft: wp('15') }}>
                        <Text style={{ fontSize: hp('2.8%'), color: '#5AC8FA' }}>5324.00</Text>
                        <View style={{ marginLeft: hp('2%'), justifyContent: 'center' }}>
                            <MaterialIcons name="account-balance-wallet" size={25} color='#5AC8FA' />
                        </View>
                    </TouchableOpacity>
                </View>
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

                <View style={{ marginTop: hp('3%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View >
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/icoutline-design-services.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>DESIGN</Text>
                        </View>


                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/icround-business-center.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>BUSINESS</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/entypoarea-graph.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>MARKETING</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/entypoarea-graph.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>MARKETING</Text>
                    </View>
                </View>
                <View style={{ marginTop: hp('5%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View >
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/grommet-iconstechnology.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>TECHNOLOGY</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/icround-business-center.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>BUSINESS</Text>
                    </View>
                    <View >
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/icoutline-design-services.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>DESIGN</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/entypoarea-graph.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>MARKETING</Text>
                    </View>
                </View>
                <View style={{ marginTop: hp('5%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View >
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/grommet-iconstechnology.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>TECHNOLOGY</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/icround-business-center.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>BUSINESS</Text>
                    </View>
                    <View >
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/icoutline-design-services.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>DESIGN</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: wp('15%'), height: hp('7%'), backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/entypoarea-graph.png')} style={{
                                marginTop: hp('0%'), width: 30, height: 30, borderRadius: hp('1%'), marginLeft: hp('0%'),
                            }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('1.8%'), textAlign: 'center', marginTop: hp('1%') }}>MARKETING</Text>
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
                <View style={{ marginBottom: hp('15%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default selectCategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE",
    },
    submit: {
        flexDirection: 'row',
        marginRight: hp('2%'),
        width: wp('25%'),
        height: hp('5%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: hp('2%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 4,
    },
    graficview: {
        flexDirection: 'row',

        width: wp('90%'),
        height: hp('10%'),
        backgroundColor: '#04DE71',
        borderRadius: hp('3%'),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    uxview: {
        flexDirection: 'row',
        width: wp('90%'),
        height: hp('10%'),
        backgroundColor: '#FFE620',
        borderRadius: hp('3%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('2%')
    },
    interiorview: {
        flexDirection: 'row',
        width: wp('90%'),
        height: hp('10%'),
        backgroundColor: '#96D3FF',
        borderRadius: hp('3%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('2%')
    },
    category: {
        width: wp('15%'),
        height: hp('10%'),
        backgroundColor: '#FFFFFF',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyview: {
        flexDirection: 'row',
        width: wp('90%'),
        height: hp('10%'),
        backgroundColor: '#5AC8FA',
        borderRadius: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center'
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