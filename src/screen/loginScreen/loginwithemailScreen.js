import React, { Component } from 'react'
import { StatusBar, View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ImageBackground, ScrollView, ToastAndroid, Platform } from 'react-native'
import LoginService from '../../services/LoginService/LoginService'
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader';
import OtpInputs from 'react-native-otp-inputs';
import * as STYLE from './styles';

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
            verifybtnDisable: false
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
        // const { inputOtpNumber, verifyOtpNumber, userDetails } = this.state;
        // if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
        if (Platform.OS === 'android') {
            ToastAndroid.show("SignIn Success!", ToastAndroid.LONG);
        } else {
            alert("SignIn Success!");
        }
        //     let token = userDetails._id;
        //     //set header auth user key
        //     axiosConfig(token);
        //     this.authenticateUser(userDetails);
        return this.props.navigation.navigate('homeScreen');
        // } else {
        //     this.setState({ loading: false });
        //     if (Platform.OS === 'android') {
        //         ToastAndroid.show("User not exits!", ToastAndroid.LONG)
        //     } else {
        //         alert("User not exits!");
        //     }
        //     this.resetScreen();
        //     return;
        // }
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
                    console.log(`response`, response);
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
            <SafeAreaView style={STYLE.Loginemailstyle.container}>
                <StatusBar backgroundColor="#00CFC7" hidden barStyle="light-content" />
                <ImageBackground source={require('../../assets/Images/background.png')} style={STYLE.Loginemailstyle.backgroundImage}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <View style={STYLE.Loginemailstyle.circle}>
                            <Image source={require('../../assets/Images/icon1.png')} style={STYLE.Loginemailstyle.imageView} />
                        </View>
                        <View style={STYLE.Loginemailstyle.centeView}>
                            <View style={STYLE.Loginemailstyle.boxView}>
                                <View style={{ marginTop: 15 }}>
                                    <View style={usererror == null ? STYLE.Loginemailstyle.inputView : STYLE.Loginemailstyle.inputErrorView}>
                                        <TextInput
                                            defaultValue={this.state.username}
                                            style={STYLE.Loginemailstyle.TextInput}
                                            placeholder="Email Address"
                                            type='clear'
                                            returnKeyType="done"
                                            placeholderTextColor="#B5B5B5"
                                            onSubmitEditing={() => this.onPressSubmit()}
                                            onChangeText={(email) => this.setEmail(email)}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>OR</Text>
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <View style={mobile_numbererror == null ? STYLE.Loginemailstyle.inputView : STYLE.Loginemailstyle.inputErrorView}>
                                            <TextInput
                                                style={STYLE.Loginemailstyle.TextInput}
                                                defaultValue={this.state.mobile_number}
                                                placeholder="Phone Number"
                                                type='clear'
                                                returnKeyType="done"
                                                placeholderTextColor="#B5B5B5"
                                                onSubmitEditing={() => this.onPressSubmit()}
                                                onChangeText={(mobile_number) => this.setMobileNumber(mobile_number)}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ flex: 0.5, marginTop: 30, marginLeft: 5, marginRight: 5 }}>
                                        <OtpInputs
                                            handleChange={(code) => this.handleChange(code)}
                                            numberOfInputs={4}
                                            inputStyles={STYLE.Loginemailstyle.inputView1}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                                        <TouchableOpacity style={this.state.verifybtnDisable ? STYLE.Loginemailstyle.otpBtndisable : STYLE.Loginemailstyle.otpBtn} disabled={this.state.verifybtnDisable} onPress={() => this.otpVerify()}>
                                            <Text style={STYLE.Loginemailstyle.otpbtnText}>Verify OTP</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text>{this.state.verifyOtpNumber}</Text>
                                </View>
                            </View>
                            <View style={STYLE.Loginemailstyle.centeView} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('registerScreen')}>
                                    <Text style={STYLE.Loginemailstyle.createText}>Don't have an Account?</Text>
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
