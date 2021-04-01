import React from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather';

export default function editScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: hp('5%') }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('myProfileScreen') }}>
                        <AntDesign name="arrowleft" size={24} color='#FFFFFF' style={{ marginLeft: hp('2%') }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('myProfileScreen') }}
                        style={styles.submitbtn}>
                        <Text style={{ fontSize: hp('2%'), color: '#00D9CE' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.profileview}>
                        <View>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ marginTop: hp('-5%'), width: 95, height: 100, borderRadius: hp('7%'), marginLeft: hp('22%') }} />
                            <TouchableOpacity>
                                <Feather name="camera" size={24} color='#FFFFFF' style={{ marginLeft: hp('27%'), marginTop: hp('-10%') }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%'), marginBottom: hp('2%') }}>
                            <TouchableOpacity style={styles.generalinfitext}>
                                <Text style={{ fontSize: hp('2.5%'), textAlign: 'center', color: '#FFFFFF' }}>General Information</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginLeft: hp('2.5%'), marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%') }}>First Name</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInputbold}
                                placeholder="Ranjan"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                                blurOnSubmit={false}
                                defaultValue="Ranjan"
                            />
                        </View>

                        <View style={{ marginLeft: hp('2.5%'), marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Last Name</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInputbold}
                                placeholder="Pathak"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                                blurOnSubmit={false}
                                defaultValue="Pathak"
                            />
                        </View>

                        <View style={{ marginLeft: hp('2.5%'), marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%') }}>User Tag</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="#pathak"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                                blurOnSubmit={false}
                                defaultValue="#pathak"
                            />
                        </View>

                        <View style={{ marginLeft: hp('2.5%'), marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Phone Number</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="+91 9923719601"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                                blurOnSubmit={false}
                                defaultValue="+91 9923719601"
                            />
                        </View>

                        <View style={{ marginLeft: hp('2.5%'), marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Email Address</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="ranjanpathak@gmail.com"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                                blurOnSubmit={false}
                                defaultValue="ranjanpathak@gmail.com"
                            />
                        </View>

                        <View style={{ marginLeft: hp('2.5%'), marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Location</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Mumbai"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                                blurOnSubmit={false}
                                defaultValue="Mumbai"
                            />
                            <Ionicons name="location" size={20} color='#000000' style={{ marginRight: hp('1%') }} />
                        </View>

                        <View style={{ marginLeft: hp('2.5%'), marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%') }}>About</Text>
                        </View>
                        <View style={styles.textAreainputView}>
                            <TextInput
                                style={styles.TextareaInput}
                                placeholder="Ranjan is UX Designer working with clients"
                                type='clear'
                                returnKeyType="done"
                                placeholderTextColor="#000000"
                                blurOnSubmit={false}
                                numberOfLines={3}
                                multiline={true}
                                defaultValue="Ranjan is UX Designer working with clients all over the world from last 10 years. Ranjan has worked with more then 100 brands. "
                            />
                        </View>
                        <View style={{ marginBottom: hp('5%') }}></View>
                    </View>
                    <View style={{ marginBottom: hp('3%') }}></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00D9CE",
    },
    profileview: {
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        marginTop: hp('5%'),
        borderRadius: hp('3%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#EFEFEF",
        borderColor: '#FFFFFF',
        width: wp('85%'),
        height: hp('5%'),
        marginTop: hp('0.5%'),
        marginLeft: hp('2%'),
        alignItems: "center",
        borderRadius: 3
    },
    textAreainputView: {
        flexDirection: 'row',
        backgroundColor: "#EFEFEF",
        borderColor: '#FFFFFF',
        width: wp('85%'),
        height: hp('10%'),
        marginTop: hp('0.5%'),
        marginLeft: hp('2%'),
        alignItems: "center",
        borderRadius: 3
    },
    TextInput: {
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('1%')
    },
    TextInputbold: {
        fontSize: hp('3%'),
        flex: 1,
        padding: hp('1%'),
        fontWeight: 'bold'
    },
    TextareaInput: {
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('1%'),
        height: 150,
        justifyContent: "flex-start"
    },
    submitbtn: {
        flexDirection: 'row',
        marginRight: hp('2%'),
        width: wp('25%'),
        height: hp('5%'),
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
    },
    generalinfitext: {
        width: wp('90%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D9CE',
        borderRadius: hp('3%'),
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 3,
        shadowRadius: 2,
        elevation: 0,
    },
    brandstyle: {
        color: '#888888',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('15%'),
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2
    }
})

