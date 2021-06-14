import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, ImageBackground, ScrollView, ToastAndroid, Platform, Keyboard } from 'react-native';
import SendEmailandSmsService from '../../services/SendEmailandSmsService/SendEmailandSmsService';
import { CheckUser } from '../../services/UserService/UserService';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import OtpInputs from 'react-native-otp-inputs';
import * as STYLE from './styles';

const forgotpasswordScreen = (props) => {
    const [username, setusername] = useState(null);
    const [loading, setloading] = useState(false);
    const [usererror, setusererror] = useState(null);
    const [mobile_number, setmobile_number] = useState(null);
    const [mobile_numbererror, setmobile_numbererror] = useState(null);
    const [verifyOtpNumber, setverifyOtpNumber] = useState(null);
    const [inputOtpNumber, setinputOtpNumber] = useState(null);
    const [verifybtnDisable, setverifybtnDisable] = useState(true);
    const [sendbtnDisable, setsendbtnDisable] = useState(true);
    const [sendEmailbtnDisable, setsendEmailbtnDisable] = useState(true);


    useEffect(() => {
    }, [username, loading, usererror, mobile_number, mobile_numbererror, verifyOtpNumber, inputOtpNumber, verifybtnDisable, sendbtnDisable, sendEmailbtnDisable])

    //check email validation
    const setEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            //setusername(null);
            setusererror('Email Id can not be empty');
            return;
        }
        if (!re.test(email)) {
            setusererror('Ooops! We need a valid email address');
            setusername(email);
            return;
        }
        setusername(email);
        setsendEmailbtnDisable(false);
        setusererror(null);
        return;
    }

    //check mobile number validation
    const setMobileNumber = (mobile) => {
        const reg = /^\d{10}$/;
        if (!mobile || mobile.length <= 0) {
            setmobile_numbererror('Mobile Number cannot be empty');
            setmobile_number(null);
            return;
        }
        if (!reg.test(mobile)) {
            setmobile_numbererror('Ooops! We need a valid Mobile Number');
            setmobile_number(mobile);
            return;
        }
        setmobile_number(mobile);
        setsendbtnDisable(false);
        setmobile_numbererror(null);
        return;
    }

    //clear Field up data
    const resetScreen = () => {
        setloading(false);
        setusername(null);
        setusererror(null);
        setmobile_number(null);
        setmobile_numbererror(null);
        setsendbtnDisable(true);
        setinputOtpNumber(null);
        setverifybtnDisable(true);
        setverifyOtpNumber(null);
        setsendEmailbtnDisable(true);
    }

    //user input Code set
    const handleChange = (code) => {
        setinputOtpNumber(code);
        if (Number(code) === Number(verifyOtpNumber)) {
            setverifybtnDisable(false);
        }
    }

    // generate OTP function 
    const createOtp = async () => {
        let body;
        if (username && mobile_number) {
            setMobileNumber(mobile_number);
            setEmail(username);
            return;
        }
        try {
            setloading(true);
            if (username) {
                body = {
                    "username": username
                }
            }
            if (mobile_number) {
                body = {
                    "username": mobile_number
                }
            }

            const CheckUserResponse = await CheckUser(body);
            if (Object.keys(CheckUserResponse.data).length !== 0 && CheckUserResponse.data != null && CheckUserResponse.data != 'undefind' && CheckUserResponse.status == 200) {
                const verifyOtpNumber = Math.floor(1000 + Math.random() * 9000);
                setverifyOtpNumber(verifyOtpNumber);
                setverifybtnDisable(false);
                onPressSubmit(verifyOtpNumber);
                if (Platform.OS === 'android') {
                    ToastAndroid.show('OTP Sending', ToastAndroid.LONG);
                } else {
                    alert('OTP Sending');
                }
                setloading(false);
            }
            else {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('User not exits!', ToastAndroid.LONG);
                } else {
                    alert('User not exits!');
                }
                resetScreen();
            }
        }
        catch (error) {
            console.log(`error`, error)
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };
    }

    //OTP verify function
    const otpVerify = async () => {
        if (username && mobile_number) {
            return;
        }
        setloading(true);
        try {
            if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
                setloading(false);
                let userValue;
                if (username) {
                    userValue = username
                }
                if (mobile_number) {
                    userValue = mobile_number
                }
                resetScreen();
                props.navigation.navigate(SCREEN.NEWPASSWORDSCREEN, { userValue });
            } else {
                setloading(false);
                setinputOtpNumber(null);
                if (Platform.OS === 'android') {
                    ToastAndroid.show('OTP not Match!', ToastAndroid.LONG)
                } else {
                    alert('OTP not Match!');
                }
            }
        }
        catch (error) {
            console.log(`error`, error);
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async (verifyOtpNumber) => {
        axiosConfig('606abd8799e17f1678300c12');
        let body;
        if (mobile_number) {
            body = {
                "messagetype": "SMS",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on E-QUEST CONSULTING. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": [mobile_number],
                    "subject": "Reset Password OTP"
                }
            }
        }

        if (username) {
            body = {
                "messagetype": "EMAIL",
                "message": {
                    "content": `${verifyOtpNumber} is the OTP for accessing on E-QUEST CONSULTING. Valid till 5 Minutes.Do not share this with anyone.`,
                    "to": [username],
                    "subject": "Reset Password OTP"
                }
            }
        }

        setloading(true);
        try {
            const response = await SendEmailandSmsService(body);
            if (response.data != 'undefind' && response.status == 200) {
                setloading(false);
            }
        }
        catch (error) {
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };
    }

    return (
        <SafeAreaView style={STYLE.Forgetpasswordstyle.container}>
            <StatusBar hidden translucent backgroundColor='transparent' />
            <ImageBackground source={require('../../assets/Images/background.png')} style={STYLE.Forgetpasswordstyle.backgroundImage}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <View style={STYLE.Forgetpasswordstyle.circle}>
                        <Image source={require('../../assets/Images/icon1.png')} style={STYLE.Forgetpasswordstyle.imageView} />
                    </View>
                    <View style={STYLE.Forgetpasswordstyle.centeView}>
                        <View style={STYLE.Forgetpasswordstyle.boxView}>
                            <View style={{ marginTop: 30 }}>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <View style={usererror == null ? STYLE.Forgetpasswordstyle.inputView2 : STYLE.Forgetpasswordstyle.inputErrorView2}>
                                        <TextInput
                                            defaultValue={username}
                                            style={STYLE.Forgetpasswordstyle.TextInput}
                                            placeholder='Email Address'
                                            type='clear'
                                            returnKeyType='done'
                                            placeholderTextColor='#B5B5B5'
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                            onChangeText={(email) => setEmail(email)}
                                        />
                                    </View>
                                    <TouchableOpacity style={STYLE.Forgetpasswordstyle.otpBtndisable1} disabled={sendEmailbtnDisable} onPress={() => createOtp()}>
                                        <Text style={STYLE.Forgetpasswordstyle.otpbtnText1}>Send OTP</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '900' }}>OR</Text>

                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    <View style={mobile_numbererror == null ? STYLE.Forgetpasswordstyle.inputView2 : STYLE.Forgetpasswordstyle.inputErrorView2}>
                                        <TextInput
                                            style={STYLE.Forgetpasswordstyle.TextInput}
                                            defaultValue={mobile_number}
                                            placeholder='Phone Number'
                                            type='clear'
                                            returnKeyType='done'
                                            keyboardType='numeric'
                                            placeholderTextColor='#B5B5B5'
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                            onChangeText={(mobile_number) => setMobileNumber(mobile_number)}
                                        />
                                    </View>
                                    <TouchableOpacity style={sendbtnDisable ? STYLE.Forgetpasswordstyle.otpBtndisable1 : STYLE.Forgetpasswordstyle.otpBtn1} disabled={sendbtnDisable} onPress={() => createOtp()}>
                                        <Text style={STYLE.Forgetpasswordstyle.otpbtnText1}>Send OTP</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <Text>{verifyOtpNumber}</Text> */}
                                <View style={{ flex: 0.5, marginTop: 20, marginLeft: 5, marginRight: 5 }}>
                                    <OtpInputs
                                        handleChange={(code) => handleChange(code)}
                                        numberOfInputs={4}
                                        inputStyles={STYLE.Forgetpasswordstyle.inputView1}
                                        defaultValue={inputOtpNumber}
                                    />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                                    <TouchableOpacity style={verifybtnDisable ? STYLE.Forgetpasswordstyle.otpBtndisable : STYLE.Forgetpasswordstyle.otpBtn} disabled={verifybtnDisable} onPress={() => otpVerify()}>
                                        <Text style={STYLE.Forgetpasswordstyle.otpbtnText}>Verify OTP</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <View style={STYLE.Forgetpasswordstyle.centeView} >
                            <TouchableOpacity onPress={() => { resetScreen(), props.navigation.navigate(SCREEN.REGISTERSCREEN) }}>
                                <Text style={STYLE.Forgetpasswordstyle.createText}>Don't have an Account?</Text>
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

export default forgotpasswordScreen;