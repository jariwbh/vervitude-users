import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import StarRating from 'react-native-star-rating'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'

function selectCategoryScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#2094FA', width: wp('100%'), height: hp('25%'), borderBottomLeftRadius: hp('3%'), borderBottomRightRadius: hp('3%') }}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: hp('5%') }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("homeScreen") }}>
                            <AntDesign name="arrowleft" color="#66ccff" size={24} style={{ marginLeft: hp('3%') }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('4%'), color: '#5AC8FA', marginLeft: wp('-12%'), fontWeight: 'bold', color: '#FFFFFF' }}>Categories</Text>
                        <TouchableOpacity style={styles.category}>
                            <Text style={{ fontSize: hp('2.8%'), color: '#04DE71' }}>₹5,000</Text>
                            <View style={{ marginLeft: hp('2%'), justifyContent: 'center' }}>
                                <MaterialIcons name="account-balance-wallet" size={25} color='#04DE71' />
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
                            placeholderTextColor="#999999"
                            returnKeyType="done"
                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        <TouchableOpacity >
                            <Image source={require('../../assets/Images/filter.png')} style={{ width: 18, height: 20, marginRight: hp('2%') }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: hp('3%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/grommeticonstechnology.png')} style={{ width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>TECHNOLOGY</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/icoutlinedesignservices.png')} style={{
                                marginTop: hp('0%'), width: 70, height: 70, borderRadius: hp('1%'), marginLeft: hp('0%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>DESIGN</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter.png')} style={{ width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>BUSINESS</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/entypoareagraph.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>MARKETING</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: hp('5%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View >
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/grommeticonstechnology.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>TECHNOLOGY</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>BUSINESS</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/icoutlinedesignservices.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>DESIGN</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/entypoareagraph.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>MARKETING</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: hp('5%'), justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View >
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/grommeticonstechnology.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>TECHNOLOGY</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>BUSINESS</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/icoutlinedesignservices.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>DESIGN</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.categoryview} onPress={() => { props.navigation.navigate("subcategoryScreen") }}>
                            <Image source={require('../../assets/Images/entypoareagraph.png')} style={{
                                width: 70, height: 70, borderRadius: hp('1%'), borderColor: '#EEEEEE', borderWidth: 1
                            }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('1.8%'), textAlign: 'center' }}>MARKETING</Text>
                            <TouchableOpacity >
                                <Foundation name="info" size={15} color='#3399ff' style={{ marginLeft: hp('1%') }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ marginTop: hp('3%'), marginLeft: wp('5%') }}>
                    <Text style={{ fontSize: hp('3%'), color: '#3399ff' }}>Top Consultants</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => props.navigation.navigate("myProfileScreen")}>
                                <Image source={require('../../assets/Images/Ellipse4.png')}
                                    style={{ alignItems: 'center', borderColor: '#3399ff', borderWidth: hp('0.2%'), height: 80, width: 80, marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Ranjan</Text>
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%') }}>
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
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse32.png')}
                                    style={{ alignItems: 'center', height: 80, width: 80, borderColor: '#3399ff', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Maria</Text>
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%') }}>
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
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse4.png')}
                                    style={{ alignItems: 'center', height: 80, width: 80, borderColor: '#3399ff', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Sunita</Text>
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%') }}>
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
                        </View>
                        <View style={{ flexDirection: 'column', marginBottom: hp('5%') }}>
                            <TouchableOpacity style={{ margin: hp('2%') }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/Ellipse32.png')}
                                    style={{ alignItems: 'center', height: 80, width: 80, borderColor: '#3399ff', borderWidth: hp('0.2%'), marginTop: hp('2%'), borderRadius: hp('20%') }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ flex: 1, fontSize: hp('2%'), color: '#000000', textAlign: 'center', marginTop: hp('-1%') }}>Georgle</Text>
                                <View style={{ marginTop: hp('-1%'), padding: wp('3%') }}>
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
        backgroundColor: '#FFFFFF'
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
        marginRight: hp('2%')
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
        justifyContent: 'center'
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
    }
})