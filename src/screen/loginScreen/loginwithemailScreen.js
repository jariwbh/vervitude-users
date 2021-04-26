import React, { Component } from 'react'
import { StatusBar, View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ImageBackground, ScrollView, ToastAndroid, Platform } from 'react-native'
import { LoginService, LoginWithMobileService } from '../../services/LoginService/LoginService'
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import OtpInputs from 'react-native-otp-inputs';
import * as STYLE from './styles';

export default class loginwithemailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            loading: false,
            usererror: null,
            mobile_number: null,
            mobile_numbererror: null,
            verifyOtpNumber: null,
            inputOtpNumber: null,
            verifybtnDisable: true,
            sendbtnDisable: true
        };
        this.setEmail = this.setEmail.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    //check email validation
    setEmail(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usererror: 'Email Id can not be empty', username: null });
        }
        if (!re.test(email)) {
            return this.setState({ usererror: 'Ooops! We need a valid email address', username: null });
        }
        this.setState({ username: email, usererror: null });
        return;
    }

    //check mobile number validation
    setMobileNumber(mobile) {
        const reg = /^\d{10}$/;
        if (!mobile || mobile.length <= 0) {
            return this.setState({ mobile_numbererror: 'Mobile Number cannot be empty', mobile_number: null });
        }
        if (!reg.test(mobile)) {
            return this.setState({ mobile_numbererror: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobile_number: mobile, sendbtnDisable: false, mobile_numbererror: null })
    }

    //clear Field up data
    resetScreen() {
        this.setState({
            loading: false,
            username: null,
            usererror: null,
            mobile_number: null,
            sendbtnDisable: true,
            inputOtpNumber: null,
            verifybtnDisable: true,
            mobile_numbererror: null

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

    // generate OTP function 
    createOtp = async () => {
        const { mobile_number } = this.state;
        axiosConfig('606abd8799e17f1678300c12')
        this.setState({ loading: true });
        try {
            await LoginWithMobileService(mobile_number)
                .then(response => {
                    if (response.data[0] != null && response.data[0] != 'undefind' && response.status == 200) {
                        let token = response.data[0]._id;
                        //set header auth user key
                        axiosConfig(token);
                        this.authenticateUser(response.data[0]);
                        const verifyOtpNumber = Math.floor(1000 + Math.random() * 9000);
                        this.setState({ verifyOtpNumber: verifyOtpNumber, loading: false, verifybtnDisable: false });
                        if (Platform.OS === 'android') {
                            ToastAndroid.show('OTP Sending', ToastAndroid.LONG);
                        } else {
                            alert('OTP Sending!');
                        }
                    }
                    else {
                        if (response.data[0] == null && response.data[0] == undefined) {
                            if (Platform.OS === 'android') {
                                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
                            } else {
                                alert('User not exits!');
                            }
                            this.resetScreen();
                            return;
                        }
                    }
                })
        }
        catch (error) {
            this.resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };

    }

    //OTP verify function
    otpVerify = async () => {
        const { inputOtpNumber, verifyOtpNumber } = this.state;
        axiosConfig('606abd8799e17f1678300c12')
        this.setState({ loading: true });
        try {
            if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('SignIn Success!', ToastAndroid.LONG);
                } else {
                    alert('SignIn Success!');
                }
                this.setState({ loading: false });
                return this.props.navigation.navigate(SCREEN.MAINSCREEN);
            } else {
                this.setState({ inputOtpNumber: null, loading: false });
                if (Platform.OS === 'android') {
                    ToastAndroid.show('OTP not Match!', ToastAndroid.LONG)
                } else {
                    alert('OTP not Match!');
                }
                return;
            }
        }
        catch (error) {
            this.resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };

    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    onPressSubmit = async () => {
        const { username, mobile_number } = this.state;
        if (!username && !mobile_number) {
            this.setEmail(username);
            return;
        }
        axiosConfig('606abd8799e17f1678300c12')
        this.setState({ loading: true });
        try {
            await LoginService(username)
                .then(response => {
                    if (response.data[0] != null && response.data[0] != 'undefind' && response.status == 200) {
                        let token = response.data[0]._id;
                        //set header auth user key
                        axiosConfig(token);
                        this.authenticateUser(response.data[0]);
                        if (Platform.OS === 'android') {
                            ToastAndroid.show('SignIn Success!', ToastAndroid.LONG);
                        } else {
                            alert('SignIn Success!');
                        }
                        return this.props.navigation.navigate(SCREEN.MAINSCREEN);
                    }
                    else {
                        if (response.data[0] == null && response.data[0] == undefined) {
                            if (Platform.OS === 'android') {
                                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
                            } else {
                                alert('User not exits!');
                            }
                            this.resetScreen();
                            return;
                        }
                    }
                })
        }
        catch (error) {
            this.resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };
    }

    render() {
        const { loading, usererror, mobile_numbererror } = this.state;
        return (
            <SafeAreaView style={STYLE.Loginemailstyle.container}>
                <StatusBar translucent backgroundColor='transparent' />
                <ImageBackground source={require('../../assets/Images/background.png')} style={STYLE.Loginemailstyle.backgroundImage}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <View style={STYLE.Loginemailstyle.circle}>
                            <Image source={require('../../assets/Images/icon1.png')} style={STYLE.Loginemailstyle.imageView} />
                        </View>
                        <View style={STYLE.Loginemailstyle.centeView}>
                            <View style={STYLE.Loginemailstyle.boxView}>
                                <View style={{ marginTop: 30 }}>
                                    <View style={usererror == null ? STYLE.Loginemailstyle.inputView : STYLE.Loginemailstyle.inputErrorView}>
                                        <TextInput
                                            defaultValue={this.state.username}
                                            style={STYLE.Loginemailstyle.TextInput}
                                            placeholder='Email Address'
                                            type='clear'
                                            returnKeyType='done'
                                            placeholderTextColor='#B5B5B5'
                                            onSubmitEditing={() => this.onPressSubmit()}
                                            onChangeText={(email) => this.setEmail(email)}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, fontWeight: '900' }}>OR</Text>

                                    </View>
                                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                        <View style={mobile_numbererror == null ? STYLE.Loginemailstyle.inputView2 : STYLE.Loginemailstyle.inputErrorView2}>
                                            <TextInput
                                                style={STYLE.Loginemailstyle.TextInput}
                                                defaultValue={this.state.mobile_number}
                                                placeholder='Phone Number'
                                                type='clear'
                                                returnKeyType='done'
                                                keyboardType='number-pad'
                                                placeholderTextColor='#B5B5B5'
                                                onSubmitEditing={() => this.createOtp()}
                                                onChangeText={(mobile_number) => this.setMobileNumber(mobile_number)}
                                            />
                                        </View>
                                        <TouchableOpacity style={this.state.sendbtnDisable ? STYLE.Loginemailstyle.otpBtndisable1 : STYLE.Loginemailstyle.otpBtn1} disabled={this.state.sendbtnDisable} onPress={() => this.createOtp()}>
                                            <Text style={STYLE.Loginemailstyle.otpbtnText1}>Send OTP</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text>{this.state.verifyOtpNumber}</Text>
                                    <View style={{ flex: 0.5, marginTop: 20, marginLeft: 5, marginRight: 5 }}>
                                        <OtpInputs
                                            handleChange={(code) => this.handleChange(code)}
                                            numberOfInputs={4}
                                            inputStyles={STYLE.Loginemailstyle.inputView1}
                                            defaultValue={this.state.inputOtpNumber}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                                        <TouchableOpacity style={this.state.verifybtnDisable ? STYLE.Loginemailstyle.otpBtndisable : STYLE.Loginemailstyle.otpBtn} disabled={this.state.verifybtnDisable} onPress={() => this.otpVerify()}>
                                            <Text style={STYLE.Loginemailstyle.otpbtnText}>Verify OTP</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                            <View style={STYLE.Loginemailstyle.centeView} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(SCREEN.REGISTERSCREEN)}>
                                    <Text style={STYLE.Loginemailstyle.createText}>Don't have an Account?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginVertical: 80 }} />
                    </ScrollView>
                    {loading ? <Loader /> : null}
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
