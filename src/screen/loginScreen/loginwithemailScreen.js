import React, { Component } from 'react'
import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, ScrollView, ToastAndroid, Platform } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import LoginService from '../../services/LoginService/LoginService'
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader';
import OtpInputs from 'react-native-otp-inputs';

export default class loginwithemailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            usererror: null,
            mobile_number: null,
            mobile_numbererror: null,
            loading: false,
            showModalVisible: false,
            showMessageModalVisible: false,
            verifyOtpNumber: null,
            inputOtpNumber: null,
            userDetails: null,
            verifybtnDisable: true
        };
        this.setEmail = this.setEmail.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    //check email validation
    setEmail(email) {
        if (!email || email <= 0) {
            return this.setState({ usererror: 'User Name cannot be empty' });
        }
        return this.setState({ username: email, usererror: null });
    }

    //check mobile number validation
    setMobileNumber(mobile) {
        if (!mobile || mobile.length <= 0) {
            return this.setState({ mobile_numbererror: 'Mobile Number cannot be empty' });
        }
        return this.setState({ mobile_number: mobile, mobile_numbererror: null });
    }

    //clear Field up data
    resetScreen() {
        this.setState({
            username: null,
            usererror: null,
            mobile_number: null,
            mobile_numbererror: null,
            loading: false,
            verifybtnDisable: true
        });
    }

    //add local storage Records
    authenticateUser = (user) => (
        AsyncStorage.setItem(AUTHUSER, JSON.stringify(user))
    )

    //user input Code set
    handleChange(code) {
        const { verifyOtpNumber } = this.state;
        this.setState({ inputOtpNumber: code })
        if (Number(code) === Number(verifyOtpNumber)) {
            this.setState({ verifybtnDisable: false })
        }
    }

    //OTP verify function
    otpVerify() {
        const { inputOtpNumber, verifyOtpNumber, userDetails } = this.state;
        if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
            if (Platform.OS === 'android') {
                ToastAndroid.show("SignIn Success!", ToastAndroid.LONG);
            } else {
                alert("SignIn Success!");
            }
            let token = userDetails._id;
            //set header auth user key
            axiosConfig(token);
            this.authenticateUser(userDetails);
            return this.props.navigation.navigate('homeScreen');
        } else {
            this.setState({ loading: false });
            if (Platform.OS === 'android') {
                ToastAndroid.show("User not exits!", ToastAndroid.LONG)
            } else {
                alert("User not exits!");
            }
            this.resetScreen();
            return;
        }
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    onPressSubmit = () => {
        const { username, mobile_number } = this.state;
        if (!username && !mobile_number) {
            this.setEmail(username);
            this.setMobileNumber(mobile_number);
            return;
        }
        const body = {
            email: username,
            mobile: mobile_number
        }
        this.setState({ loading: true });

        try {
            LoginService(body)
                .then(response => {
                    if (response && response.data != null && response.data != 'undefind') {
                        let userDetails = response.data[0];
                        if (userDetails == null && userDetails == undefined) {
                            if (Platform.OS === 'android') {
                                ToastAndroid.show("User not exits!", ToastAndroid.LONG);
                            } else {
                                alert("User not exits!");
                            }
                            this.resetScreen();
                            return;
                        } else {
                            const verifyOtpNumber = Math.floor(1000 + Math.random() * 9000);
                            this.setState({
                                loading: false,
                                verifyOtpNumber: verifyOtpNumber,
                                userDetails: userDetails
                            });
                            return;
                        }
                    }
                })
        }
        catch (error) {
            this.setState({ loading: false });
            this.resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show("User not exits!", ToastAndroid.LONG);
            } else {
                alert("User not exits!");
            }
        };
    }

    render() {
        const { loading, usererror, mobile_numbererror } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#00CFC7" hidden barStyle="light-content" />
                <ImageBackground source={require('../../assets/Images/background.png')} style={styles.backgroundImage}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <View style={styles.circle}>
                            <Image source={require('../../assets/Images/icon1.png')} style={styles.imageView} />
                        </View>
                        <View style={styles.centeView}>
                            <View style={styles.boxView}>
                                <View style={{ marginTop: hp('4%') }}>
                                    <View style={usererror == null ? styles.inputView : styles.inputErrorView}>
                                        <TextInput
                                            defaultValue={this.state.username}
                                            style={styles.TextInput}
                                            placeholder="Email Address"
                                            type='clear'
                                            returnKeyType="done"
                                            placeholderTextColor="#B5B5B5"
                                            onSubmitEditing={() => this.onPressSubmit()}
                                            onChangeText={(email) => this.setEmail(email)}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                                        <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>OR</Text>
                                    </View>
                                    <View style={mobile_numbererror == null ? styles.inputView : styles.inputErrorView}>
                                        <TextInput
                                            style={styles.TextInput}
                                            defaultValue={this.state.mobile_number}
                                            placeholder="Phone Number"
                                            type='clear'
                                            returnKeyType="done"
                                            placeholderTextColor="#B5B5B5"
                                            onSubmitEditing={() => this.onPressSubmit()}
                                            onChangeText={(mobile_number) => this.setMobileNumber(mobile_number)}
                                        />
                                    </View>

                                    <View style={{ flex: 0.5, marginTop: hp('3%'), marginLeft: hp('1%'), marginRight: hp('1%') }}>
                                        <OtpInputs
                                            handleChange={(code) => this.handleChange(code)}
                                            numberOfInputs={4}
                                            inputStyles={styles.inputView1}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('8%') }}>
                                        <TouchableOpacity style={this.state.verifybtnDisable ? styles.otpBtndisable : styles.otpBtn} disabled={this.state.verifybtnDisable} onPress={() => this.otpVerify()}>
                                            <Text style={styles.otpbtnText}>Verify OTP</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text>{this.state.verifyOtpNumber}</Text>
                                </View>
                            </View>
                            <View style={styles.centeView} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('registerScreen')}>
                                    <Text style={styles.createText}>Don't have an Account?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    {loading ? <Loader /> : null}
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

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
        height: hp('48%'),
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
        marginTop: hp('20%')
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: wp('0%'),
        borderColor: '#555555',
        width: wp('80%'),
        height: hp('6%'),
        margin: hp('1%'),
        borderWidth: wp('0.2%'),
    },
    inputErrorView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: wp('0%'),
        borderColor: 'red',
        width: wp('80%'),
        height: hp('6%'),
        margin: hp('1%'),
        borderWidth: wp('0.2%'),
    },
    inputView1: {
        marginTop: hp('4%'),
        backgroundColor: "#FFFFFF",
        borderColor: '#555555',
        width: wp('10%'),
        height: hp('6%'),
        borderWidth: wp('0.2%'),
        textAlign: 'center',
        fontSize: hp('3%')
    },
    otpBtn: {
        flexDirection: 'row',
        width: wp('80%'),
        backgroundColor: "#00D9CE",
        borderRadius: 50,
        height: hp('6%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    otpBtndisable: {
        flexDirection: 'row',
        width: wp('80%'),
        backgroundColor: "#99fffa",
        borderRadius: 50,
        height: hp('6%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    otpbtnText: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
        fontWeight: 'bold'
    },
    createText: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
        marginTop: hp('2%'),
        fontWeight: '900'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: hp('100%'),
        width: wp('100%')
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
    }
})