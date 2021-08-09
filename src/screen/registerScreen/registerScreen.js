import React, { Component } from 'react';
import {
    StatusBar, View, Text, SafeAreaView, TextInput,
    Image, TouchableOpacity, ImageBackground, ScrollView,
    ToastAndroid, Platform, Keyboard
} from 'react-native';
import registerServices from '../../services/RegisterService/RegisterService';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import OtpInputs from 'react-native-otp-inputs';
import * as STYLES from './styles';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import SendEmailandSmsService from '../../services/SendEmailandSmsService/SendEmailandSmsService';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';

export default class registerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            username: null,
            usererror: null,
            fullname: null,
            fullnameError: null,
            mobile_number: null,
            mobile_numbererror: null,
            verifyOtpNumber: null,
            inputOtpNumber: null,
            verifybtnDisable: true,
            sendbtnDisable: true
        };
        this.setFullName = this.setFullName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.secondTextInputRef = React.createRef();
        this.thirdTextInputRef = React.createRef();

        GoogleSignin.configure({
            // Mandatory method to call before calling signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId
            // Generated from Firebase console
            //step: authentication => select google => Web SDK configuration => Web client ID
            webClientId: '79264411371-ipd84mi57slncv18r1004j5ql5i1osfk.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }

    //check Fullname validation
    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'FullName can not be empty', fullname: null });
        }
        this.setState({ fullname: fullname, fullnameError: null });
        return;
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
            fullname: null,
            fullnameError: null,
            mobile_number: null,
            mobile_numbererror: null,
            verifyOtpNumber: null,
            inputOtpNumber: null,
            verifybtnDisable: true,
            sendbtnDisable: true
        });
    }

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
        const verifyOtpNumber = Math.floor(1000 + Math.random() * 9000);
        this.setState({ loading: true });
        axiosConfig('606abd8799e17f1678300c12');
        let body;
        if (mobile_number) {
            body = {
                "messagetype": "SMS",
                "message": {
                    "content": `Dear User, Use this 4-digit OTP ${verifyOtpNumber} to verify your mobile number with Vervitude app. Please note that this code is only valid for 2 minutes. A brand by E-QUEST CONSULTING SOLUTIONS.`,
                    "to": mobile_number,
                    "subject": "OTP For Mobile Number Verification E-QUEST CONSULTING"
                }
            }
        }

        try {
            try {
                const response = await SendEmailandSmsService(body);
                if (response.data != 'undefind' && response.status == 200) {
                    this.setState({ verifyOtpNumber: verifyOtpNumber, loading: false });
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('OTP Sending', ToastAndroid.LONG);
                    } else {
                        alert('OTP Sending');
                    }
                }
            }
            catch (error) {
                //console.log(`error`, error);              
                if (Platform.OS === 'android') {
                    ToastAndroid.show('User not exits', ToastAndroid.LONG);
                } else {
                    alert('User not exits');
                }
            };
        }
        catch (error) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('OTP Sending Failed', ToastAndroid.LONG);
            } else {
                alert('OTP Sending Failed');
            }
        };
    }

    onPressSignInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const info = await GoogleSignin.signIn();
            this.onPressSubmitGoogle(info.user);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                this.setState({ loading: false });
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                this.setState({ loading: false });
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                this.setState({ loading: false });
                // play services not available or outdated
            } else {
                this.setState({ loading: false });
                // some other error happened
                //console.log(`error`, error);
            }
        }
    };

    //OTP verify function
    onPressSubmitGoogle = async (res) => {
        axiosConfig('5e899bb161eb802d6037c4d7');
        this.setState({ loading: true });
        const body = {
            property: {
                live: false,
                fullname: res.name,
                primaryemail: res.email
            }
        }
        try {
            const response = await registerServices(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('SignIn Success', ToastAndroid.LONG);
                } else {
                    alert('SignIn Success');
                }
                this.setState({ loading: false });
                this.props.navigation.navigate(SCREEN.LOGINSCREEN);
            }
        }
        catch (error) {
            this.setState({ loading: false });
            if (Platform.OS === 'android') {
                ToastAndroid.show('UserName Not Valid', ToastAndroid.LONG);
            } else {
                alert('UserName Not Valid');
            }
        };
    }

    //add local storage Records
    authenticateUser = (user) => (
        AsyncStorage.setItem(AUTHUSER, JSON.stringify(user))
    )

    //OTP verify function
    otpVerify = async () => {
        const { inputOtpNumber, verifyOtpNumber, fullname, mobile_number, username } = this.state;
        axiosConfig('5e899bb161eb802d6037c4d7');
        if (!fullname || !username) {
            this.setEmail(username);
            this.setFullName(fullname);
            return;
        }
        this.setState({ loading: true });
        const body = {
            property: {
                live: false,
                fullname: fullname,
                mobile: mobile_number,
                primaryemail: username
            }
        }
        try {
            if (Number(inputOtpNumber) === Number(verifyOtpNumber)) {
                const response = await registerServices(body);
                if (response.data != null && response.data != 'undefind' && response.status == 200) {
                    let token = response.data._id;
                    axiosConfig(token);
                    this.authenticateUser(response.data);
                    this.resetScreen();
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('SignIn Success', ToastAndroid.LONG);
                    } else {
                        alert('SignIn Success');
                    }
                    this.setState({ loading: false });
                    return this.props.navigation.navigate(SCREEN.HOMESCREEN);
                }
            } else {
                this.setState({ inputOtpNumber: null, loading: false });
                if (Platform.OS === 'android') {
                    ToastAndroid.show('OTP not Match', ToastAndroid.LONG)
                } else {
                    alert('OTP not Match');
                }
                return;
            }
        }
        catch (error) {
            //console.log(`error`, error);
            this.resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('UserName Not Valid', ToastAndroid.LONG);
            } else {
                alert('UserName Not Valid');
            }
        };
    }

    render() {
        const { loading, usererror, mobile_numbererror, fullnameError } = this.state;
        return (
            <SafeAreaView style={STYLES.styles.container} >
                <StatusBar hidden translucent backgroundColor='transparent' />
                <ImageBackground source={require('../../assets/Images/background.png')} style={STYLES.styles.backgroundImage}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <View style={STYLES.styles.circle}>
                            <Image source={require('../../assets/Images/icon1.png')} style={STYLES.styles.imageView} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={STYLES.styles.registertext}>Register</Text>
                        </View>

                        <View style={STYLES.styles.centeView}>
                            <View style={STYLES.styles.boxView}>
                                <View>
                                    <View style={{ marginTop: 25, alignItems: 'center' }}>
                                        <View style={usererror == null ? STYLES.styles.inputView : STYLES.styles.inputViewError}>
                                            <TextInput
                                                defaultValue={this.state.username}
                                                style={STYLES.styles.TextInput}
                                                placeholder='Email Address'
                                                type='clear'
                                                returnKeyType='next'
                                                placeholderTextColor='#B5B5B5'
                                                blurOnSubmit={false}
                                                onSubmitEditing={() => this.secondTextInputRef.current.focus()}
                                                onChangeText={(email) => this.setEmail(email)}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 15, alignItems: 'center' }}>
                                        <View style={fullnameError == null ? STYLES.styles.inputView : STYLES.styles.inputViewError}>
                                            <TextInput
                                                defaultValue={this.state.fullname}
                                                style={STYLES.styles.TextInput}
                                                placeholder='Full Name'
                                                type='clear'
                                                returnKeyType='next'
                                                placeholderTextColor='#B5B5B5'
                                                ref={this.secondTextInputRef}
                                                blurOnSubmit={false}
                                                onSubmitEditing={() => this.thirdTextInputRef.current.focus()}
                                                onChangeText={(fullname) => this.setFullName(fullname)}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                        <View style={mobile_numbererror == null ? STYLES.styles.inputView2 : STYLES.styles.inputErrorView2}>
                                            <TextInput
                                                defaultValue={this.state.mobile_number}
                                                style={STYLES.styles.TextInput}
                                                placeholder='Phone Number'
                                                type='clear'
                                                returnKeyType='done'
                                                keyboardType='numeric'
                                                placeholderTextColor='#B5B5B5'
                                                ref={this.thirdTextInputRef}
                                                blurOnSubmit={false}
                                                onSubmitEditing={() => Keyboard.dismiss()}
                                                onChangeText={(mobile_number) => this.setMobileNumber(mobile_number)}
                                            />
                                        </View>
                                        <TouchableOpacity style={STYLES.styles.otpBtn1} disabled={this.state.sendbtnDisable} onPress={() => this.createOtp()}>
                                            <Text style={STYLES.styles.otpbtnText1}>Send OTP</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* <Text>{this.state.verifyOtpNumber}</Text> */}
                                    <View style={{ flex: 0.5, marginTop: 25, marginLeft: 5, marginRight: 5, marginBottom: 20 }}>
                                        <OtpInputs
                                            handleChange={(code) => this.handleChange(code)}
                                            numberOfInputs={4}
                                            inputStyles={STYLES.styles.inputView1}
                                            defaultValue={this.state.inputOtpNumber}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                                        <TouchableOpacity style={STYLES.styles.otpBtn} disabled={this.state.verifybtnDisable} onPress={() => this.otpVerify()} >
                                            <Text style={STYLES.styles.otpbtnText}>Verify OTP</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>OR</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                        <TouchableOpacity style={STYLES.styles.googleBtn} onPress={() => this.onPressSignInGoogle()} >
                                            <Text style={STYLES.styles.googlebtnText}>Register with Google</Text>
                                            <Image source={require('../../assets/Images/googleicon.png')} style={{ height: 25, width: 25, marginLeft: 15 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }} >
                            <View style={{ marginLeft: 15 }} >
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate(SCREEN.FORGOTPASSWORDSCREEN), this.resetScreen() }} >
                                    <Text style={STYLES.styles.createText}>Already have an Account?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginRight: 15 }} >
                                <TouchableOpacity >
                                    <Text style={STYLES.styles.createText}>Need Help?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginVertical: 20 }} />
                    </ScrollView>
                </ImageBackground>
                {loading ? <Loader /> : null}
            </SafeAreaView>
        )
    }
}


