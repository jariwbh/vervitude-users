import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
const forgotpasswordScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centeView}>
                <View style={styles.boxView}>
                    <View style={{ marginTop: hp('2%') }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email Address"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                            <Text style={{ fontSize: hp('3%') }}>OR</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Phone Number"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                            />
                        </View>

                        <View>
                            <Text>otp </Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                            <TouchableOpacity style={styles.otpBtn} onPress={() => { }} >
                                <Text style={styles.otpbtnText}>Verify OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.centeView} >
                    <TouchableOpacity onPress={() => props.navigation.navigate("homeScreen")} >
                        <Text style={styles.createText}>Don't have an Account?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}



export default forgotpasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00ff99",
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColor: {
        fontSize: hp('5%'),
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: wp('15%')
    },
    boxView: {
        height: hp('50%'),
        width: wp('95%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginTop: hp('5%')
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: wp('0%'),
        borderColor: '#5AC8FA',
        width: wp('80%'),
        height: hp('6%'),
        margin: hp('1%'),
        borderWidth: hp('0.2%')
    },
    otpBtn: {
        flexDirection: 'row',
        width: wp('80%'),
        backgroundColor: "#5AC8FA",
        borderRadius: 50,
        height: hp('6%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    otpbtnText: {
        color: '#FFFFFF',
        fontSize: hp('2%')
    },
    googleBtn: {
        flexDirection: 'row',
        width: wp('80%'),
        borderRadius: 50,
        height: hp('6%'),
        alignItems: "center",
        justifyContent: 'center',
        borderColor: '#00ff99',
        borderWidth: hp('0.1%')
    },
    googlebtnText: {
        color: '#000000',
        fontSize: hp('2%')
    },
    createText: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
        marginTop: hp('2%'),
        fontWeight: '900'
    },
    supportText: {
        color: '#4E4E4E',
        fontSize: hp('2%'),
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
})


