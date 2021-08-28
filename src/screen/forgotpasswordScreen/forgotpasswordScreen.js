import React, { useState, useEffect } from 'react';
import {
    StatusBar, View, Text, SafeAreaView, TextInput, Image, TouchableOpacity,
    ImageBackground, ScrollView, ToastAndroid, Platform, Keyboard, Modal
} from 'react-native';
import SendEmailandSmsService from '../../services/SendEmailandSmsService/SendEmailandSmsService';
import { CheckUser } from '../../services/UserService/UserService';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import OtpInputs from 'react-native-otp-inputs';
import * as STYLE from './styles';
import SendSmsService from '../../services/SendSmsService/SendSmsService';
import HelpSupportService from '../../services/HelpSupportService/HelpSupportService';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
//import OrganizationSetting from '../../services/OrganizationSetting/OrganizationSetting';

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
    const [showModalVisible, setshowModalVisible] = useState(false);
    const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
    const [subject, setsubject] = useState(null);
    const [subjecterror, setsubjecterror] = useState(null);
    const [description, setdescription] = useState(null);
    const [descriptionerror, setdescriptionerror] = useState(null);
    const secondTextInputRef = React.createRef();
    const [spinner, setspinner] = useState(false);
    //const [smsMessage, setsmsMessage] = useState(null);

    // useEffect(() => {
    //     getsmsMessage();
    // }, []);

    useEffect(() => {
    }, [username, loading, usererror, mobile_number, mobile_numbererror, verifyOtpNumber,
        inputOtpNumber, verifybtnDisable, sendbtnDisable, sendEmailbtnDisable, showModalVisible,
        showMessageModalVisible, spinner]);

    // const getsmsMessage = async () => {
    //     const response = await OrganizationSetting();
    //     setsmsMessage(response.data[0].property);
    // }

    const showModal = (visible) => {
        setshowModalVisible(visible);
    }

    const showMessageModal = (visible) => {
        setshowMessageModalVisible(visible);
    }

    //help model pop up cancel button touch to called
    const onPressCancel = () => {
        setsubject(null);
        setdescription(null);
        setsubjecterror(null);
        setdescriptionerror(null);
        setshowModalVisible(false);
    }

    //check validation of subject
    const setSubject = (subject) => {
        if (!subject || subject <= 0) {
            return setsubjecterror('subject cannot be empty');
        }
        setsubject(subject);
        setsubjecterror(null);
        return;
    }

    //check validation of description
    const setDescription = (description) => {
        if (!description || description <= 0) {
            return setdescriptionerror('description cannot be empty');
        }
        setdescription(description);
        setdescriptionerror(null);
        return;
    }

    //help model pop up submit button touch to called
    const onPressSubmitModel = async () => {
        if (!description || !subject) {
            setSubject(subject);
            setDescription(description);
            return;
        }

        const body = {
            'status': 'Requested',
            'subject': subject,
            'customerid': '5e899bb161eb802d6037c4d7',
            'onModel': 'Member',
            'category': 'System Enhancements',
            'content': description
        }
        setspinner(true);
        try {
            const response = await HelpSupportService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setspinner(false);
                setshowMessageModalVisible(true);
                onPressCancel();
            }
        }
        catch (error) {
            setspinner(false);
            firebase.crashlytics().recordError(error);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Message Sending Failed!', ToastAndroid.SHORT);
            } else {
                alert('Message Sending Failed!');
            }
            onPressCancel();
        }
    }

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
        if (!username && !mobile_number) {
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
                onPressSubmit(verifyOtpNumber, CheckUserResponse.data.property);
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
            //console.log(`error`, error)
            firebase.crashlytics().recordError(error);
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
            //console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('User not exits!', ToastAndroid.LONG);
            } else {
                alert('User not exits!');
            }
        };
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async (verifyOtpNumber, member) => {
        axiosConfig('5e899bb161eb802d6037c4d7');
        let mobilebody;
        let emailbody;
        // let smscontent;
        // smsMessage.otpmessages.forEach(element => {
        //     if (element.otptype === 'password')
        //         smscontent = element.message
        // });

        if (member && member.mobile) {
            mobilebody = {
                "messagetype": "SMS",
                "message": {
                    "content": `Dear User, Use this 4 digit OTP ${verifyOtpNumber} to reset your password for Vervitude app. Please note this code is valid for 2 minutes. A brand by E-QUEST CONSULTING SOLUTIONS.`,
                    "to": member.mobile,
                    "subject": "Password Reset OTP - Vervitude | Find a Consultant"
                }
            }
        }

        if (member && member.primaryemail) {
            emailbody = {
                "messagetype": "EMAIL",
                "message": {
                    "content": `Dear User, 

                    Your One Time Password(OTP) is ${verifyOtpNumber} Use this to reset your password for Vervitude app. 
                    
                    Please note this OTP is valid for 2 minutes.Do not share your otp with anyone. For any queries or clarifications please write to us at info@vervitude.co 
                    
                    With Regards, 
                    Team Vervitude`,
                    "to": member.primaryemail,
                    "subject": "Password Reset OTP - Vervitude | Find a Consultant"
                }
            }
        }

        setloading(true);
        try {
            if (member && member.primaryemail) {
                const response = await SendEmailandSmsService(emailbody);
                console.log(`response email`, response);
                if (response.data != 'undefind' && response.status == 200) {
                    setloading(false);
                }
            }

            if (member && member.mobile) {
                console.log(`response sms`, response1);
                const response1 = await SendSmsService(mobilebody);
                if (response1.data != 'undefind' && response1.status == 200) {
                    setloading(false);
                }
            }
        }
        catch (error) {
            //console.log(`error`, error);
            firebase.crashlytics().recordError(error);
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
            <GeneralStatusBarColor hidden={false} translucent={true} backgroundColor="transparent" barStyle="dark-content" />
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
                                <View style={{ flex: 0.5, marginTop: 30, marginLeft: 5, marginRight: 5 }}>
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
                            <TouchableOpacity onPress={() => { props.navigation.goBack(null), resetScreen() }} style={{ marginTop: -5, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ color: '#000000', fontSize: 14, textTransform: 'capitalize', fontWeight: 'bold' }}>{`<< Back`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <View style={{ marginLeft: 15 }} >
                            <TouchableOpacity onPress={() => { resetScreen(), props.navigation.navigate(SCREEN.REGISTERSCREEN) }}>
                                <Text style={STYLE.Forgetpasswordstyle.createText}>Don't have an Account?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginRight: 15 }} >
                            <TouchableOpacity onPress={() => showModal(true)} >
                                <Text style={STYLE.Forgetpasswordstyle.createText}>Need Help?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }} />
                </ScrollView>
                {loading ? <Loader /> : null}

                {/* Help & Support model Pop */}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showModalVisible}
                    onRequestClose={() => showModal(!showModalVisible)}
                >
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <View style={{ position: 'absolute', bottom: 20 }}>
                            <View style={STYLE.styles.modalView}>
                                <View style={{ marginTop: 20 }}></View>
                                <View style={subjecterror == null ? STYLE.styles.modelInputView : STYLE.styles.modelInputViewError}>
                                    <TextInput
                                        style={STYLE.styles.modelTextInput}
                                        placeholder='Subject'
                                        type='clear'
                                        returnKeyType='next'
                                        placeholderTextColor='#999999'
                                        defaultValue={subject}
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => secondTextInputRef.current.focus()}
                                        onChangeText={(subject) => setSubject(subject)}
                                    />
                                </View>
                                <View style={descriptionerror == null ? STYLE.styles.modelTextAreainputView : STYLE.styles.modelTextAreainputViewError}>
                                    <TextInput
                                        style={STYLE.styles.modelTextareaInput}
                                        placeholder='Write Your Descripation'
                                        type='clear'
                                        returnKeyType='done'
                                        placeholderTextColor='#999999'
                                        blurOnSubmit={false}
                                        numberOfLines={3}
                                        multiline={true}
                                        defaultValue={description}
                                        ref={secondTextInputRef}
                                        onChangeText={(description) => setdescription(description)}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => onPressSubmitModel()}
                                    style={STYLE.styles.savebtn}>
                                    <Text style={{ fontSize: 14, color: '#FFFFFF' }}>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onPressCancel()}
                                    style={STYLE.styles.cancelbtn}>
                                    <Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* message model Pop */}
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showMessageModalVisible}
                    onRequestClose={() => showMessageModal(!showMessageModalVisible)}
                >
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <View style={{ position: 'absolute', bottom: 20 }}>
                            <View style={STYLE.styles.msgModalView}>
                                <Image source={require('../../assets/Images/smileicon.png')} style={{ marginTop: 15, height: 40, width: 40 }} />
                                <Text style={{ marginTop: 15, fontSize: 14, color: '#000000' }}>Thank you for your feedback</Text>
                                <Text style={{ fontSize: 14, color: '#000000' }}>we will get back to you shortly</Text>
                            </View>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
                                <TouchableOpacity onPress={() => showMessageModal(!showMessageModalVisible)}
                                    style={STYLE.styles.cancelbtn}>
                                    <Text style={{ fontSize: 14, color: '#000000' }}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default forgotpasswordScreen;