import React from 'react'
import { StatusBar, View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

function loginScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#00CFC7" hidden barStyle="light-content" />
            <ImageBackground source={require('../../assets/Images/background.png')} style={styles.backgroundImage}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <View style={styles.circle}>
                        <Image source={require('../../assets/Images/icon1.png')} style={styles.imageView} />
                    </View>
                    <View>
                        <View style={{ marginTop: hp('5%') }}>
                            <Text style={styles.textColor}>Too many</Text>
                            <Text style={styles.textColor}>answers</Text>
                            <Text style={styles.textColor}>on Google?</Text>
                        </View>
                        <View style={{ marginTop: hp('2%') }}>
                            <Text style={styles.textColor}>Ask the</Text>
                            <Text style={styles.textColor}>Experts</Text>
                        </View>
                        <View style={styles.centeView}>
                            <View style={styles.boxView}>
                                <View style={{ marginTop: hp('2%') }}>
                                    <TouchableOpacity style={styles.inputView}>
                                        <Text style={styles.TextInput}>Sign in with Google</Text>
                                        <Image source={require('../../assets/Images/googleicon.png')} style={{ height: 25, width: 25, marginLeft: wp('5%') }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.inputView1} onPress={() => props.navigation.navigate('loginwithemailScreen')}>
                                        <Text style={styles.TextInput1}>Login with Mobile or Email</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.centeView} >
                                    <TouchableOpacity onPress={() => props.navigation.navigate('forgotpasswordScreen')}>
                                        <Text style={styles.loginText}>Can't Login?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.centeView} >
                            <TouchableOpacity onPress={() => props.navigation.navigate('registerScreen')} >
                                <Text style={styles.createText}>Create An account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default loginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageView: {
        marginLeft: ('20%'),
        marginTop: ('70%'),
        height: hp('10%'),
        width: wp('45%')
    },
    circle: {
        height: hp('50%'),
        width: hp('50%'),
        borderRadius: hp('50%'),
        backgroundColor: "#FFFFFF",
        marginTop: hp('-35'),
        marginLeft: wp('-10')
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: wp('10%'),
        borderColor: '#00D9CE',
        width: wp('80%'),
        height: hp('7%'),
        margin: hp('1%'),
        borderWidth: hp('0.2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        fontSize: hp('2%'),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    inputView1: {
        flexDirection: 'row',
        backgroundColor: "#00D9CE",
        borderRadius: wp('10%'),
        borderColor: '#00D9CE',
        width: wp('80%'),
        height: hp('7%'),
        margin: hp('1%'),
        borderWidth: hp('0.2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput1: {
        fontSize: hp('2%'),
        textAlign: 'center',
        fontWeight: '900',
        color: '#FFFFFF'
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
        height: hp('31%'),
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
    createText: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
        marginTop: hp('2%'),
        fontWeight: '900'
    },
    loginText: {
        marginTop: hp('3%'),
        color: '#4E4E4E',
        fontSize: hp('2%'),
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: hp('100%'),
        width: wp('100%')
    },
})