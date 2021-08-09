import React, { useState, useEffect } from 'react';
import { StatusBar, View, TextInput, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, Platform, ToastAndroid, Keyboard } from 'react-native'
import { LoginWithPasswordService } from '../../services/LoginService/LoginService';
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as STYLES from './styles';

const LoginWithPasswordScreen = (props) => {
    const [username, setusername] = useState('9016353077');
    const [usererror, setusererror] = useState(null);
    const [password, setpassword] = useState('pass#123');
    const [passworderror, setpassworderror] = useState(null);
    const [loading, setloading] = useState(false);
    const secondTextInputRef = React.createRef();

    //check email validation
    const setEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            setusererror('Email Id can not be empty');
            return;
        }
        setusername(email);
        setusererror(null);
        return;
    }

    //check password validation
    const setPassword = (password) => {
        if (!password || password.length <= 0) {
            setpassworderror('Password cannot be empty');
            return;
        }
        setpassword(password);
        setpassworderror(null);
        return;
    }

    //clear Field up data
    const resetScreen = () => {
        setloading(false);
        setusername(null);
        setusererror(null);
        setpassword(null);
        setpassworderror(null);
    }

    //add local storage Records
    const authenticateUser = (user) => (
        AsyncStorage.setItem(AUTHUSER, JSON.stringify(user))
    )

    useEffect(() => {
    }, [username, password, passworderror, usererror])

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async () => {
        if (!username || !password) {
            setEmail(username);
            setPassword(password);
            return;
        }

        const body = {
            username: username,
            password: password
        }

        setloading(true);
        console.log(`body`, body);
        try {
            const response = await LoginWithPasswordService(body);
            console.log(`response`, response);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                let token = response.data.user._id;
                //set header auth user key
                axiosConfig(token);
                authenticateUser(response.data.user);
                setloading(false);
                resetScreen();
                if (Platform.OS === 'android') {
                    ToastAndroid.show('SignIn Success', ToastAndroid.LONG);
                } else {
                    alert('SignIn Success');
                }
                props.navigation.navigate(SCREEN.HOMESCREEN);
            }
        } catch (error) {
            console.log(`error`, error);
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('Username and Password Invalid', ToastAndroid.LONG);
            } else {
                alert('Username and Password Invalid');
            }
        };
    }

    return (
        <SafeAreaView style={STYLES.styles.container}>
            <StatusBar hidden translucent backgroundColor='transparent' />
            <ImageBackground source={require('../../assets/Images/background.png')} style={STYLES.styles.backgroundImage}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <View style={STYLES.styles.circle}>
                        <Image source={require('../../assets/Images/icon1.png')} style={STYLES.styles.imageView} />
                    </View>
                    <View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={STYLES.styles.textColor}>Too many</Text>
                            <Text style={STYLES.styles.textColor}>answers</Text>
                            <Text style={STYLES.styles.textColor}>on Google?</Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={STYLES.styles.textColor}>Ask the</Text>
                            <Text style={STYLES.styles.textColor}>Experts</Text>
                        </View>
                        <View style={STYLES.styles.centeView}>
                            <View style={STYLES.Loginpasswordstyle.boxView}>
                                <View style={{ marginTop: 20 }}>
                                    <View style={usererror == null ? STYLES.Loginemailstyle.inputView : STYLES.Loginemailstyle.inputErrorView}>
                                        <TextInput
                                            style={STYLES.Loginemailstyle.TextInput}
                                            placeholder='Email/Mobile Number'
                                            returnKeyType='next'
                                            placeholderTextColor='#B5B5B5'
                                            defaultValue={username}
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => secondTextInputRef.current.focus()}
                                            onChangeText={(email) => setEmail(email)}
                                        />
                                    </View>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <View style={passworderror == null ? STYLES.Loginemailstyle.inputView : STYLES.Loginemailstyle.inputErrorView}>
                                        <TextInput
                                            style={STYLES.Loginemailstyle.TextInput}
                                            placeholder='Password'
                                            returnKeyType='done'
                                            placeholderTextColor='#B5B5B5'
                                            secureTextEntry={true}
                                            defaultValue={password}
                                            blurOnSubmit={false}
                                            ref={secondTextInputRef}
                                            onSubmitEditing={() => Keyboard.dismiss()}
                                            onChangeText={(password) => setpassword(password)}
                                        />
                                    </View>
                                </View>

                                <View style={STYLES.styles.centeView} >
                                    <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.FORGOTPASSWORDSCREEN), resetScreen() }}>
                                        <Text style={STYLES.Loginpasswordstyle.loginText}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={STYLES.Loginpasswordstyle.loginBtn} onPress={() => onPressSubmit()}>
                                        <Text style={STYLES.Loginpasswordstyle.loginBtnText}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={STYLES.styles.centeView} >
                            <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.LOGINWITHEMAILSCREEN), resetScreen() }} >
                                <Text style={STYLES.styles.createText}>Login With OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }} />
                </ScrollView>
                {loading ? <Loader /> : null}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginWithPasswordScreen

