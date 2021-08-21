import React, { Component } from 'react';
import { StatusBar, View, TextInput, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, Platform, ToastAndroid, Keyboard } from 'react-native'
import { LoginWithPasswordService } from '../../services/LoginService/LoginService';
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as STYLES from './styles';

export default class LoginWithPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            usererror: null,
            password: null,
            passworderror: null,
            loading: false
        };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
    }

    //check email validation
    setEmail = (email) => {
        if (!email || email.length <= 0) {
            return this.setState({ usererror: 'Username not be empty', username: null });
        }
        return this.setState({ username: email, usererror: null });
    }

    //check password validation
    setPassword = (password) => {
        if (!password || password.length <= 0) {
            return this.setState({ passworderror: 'Password cannot be empty' });
        }
        return this.setState({ password: password, passworderror: null });
    }

    //clear Field up data
    resetScreen() {
        this.setState({
            username: null,
            usererror: null,
            password: null,
            passworderror: null,
            loading: false
        });
    }

    //add local storage Records
    authenticateUser = (user) => (
        AsyncStorage.setItem(AUTHUSER, JSON.stringify(user))
    )

    //SIGN IN BUTTON ONPRESS TO PROCESS
    onPressSubmit = async () => {
        const { username, password } = this.state;
        if (!username || !password) {
            setEmail(username);
            setPassword(password);
            return;
        }
        const body = {
            username: username,
            password: password
        }
        this.setState({ loading: true });
        try {
            const response = await LoginWithPasswordService(body);
            if (response.data != null && response.data != 'undefind' && response.status === 200) {
                if (response.data.user.property.mobile) {
                    let token = response.data.user._id;
                    //set header auth user key
                    axiosConfig(token);
                    this.authenticateUser(response.data.user);
                    this.setState({ loading: false });
                    this.resetScreen();
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('SignIn Success', ToastAndroid.LONG);
                    } else {
                        alert('SignIn Success');
                    }
                    this.props.navigation.navigate(SCREEN.HOMESCREEN);
                }
                else {
                    this.props.navigation.navigate(SCREEN.VERIFYMOBILESCREEN, { user: response.data.user });
                }
            }
        } catch (error) {
            this.resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('Username and Password Invalid', ToastAndroid.LONG);
            } else {
                alert('Username and Password Invalid');
            }
        };
    }

    render() {
        const { loading, usererror, username, passworderror, password } = this.state;
        return (
            <SafeAreaView style={STYLES.styles.container} >
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
                                                onSubmitEditing={() => this.secondTextInputRef.current.focus()}
                                                onChangeText={(email) => this.setEmail(email)}
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
                                                ref={this.secondTextInputRef}
                                                onSubmitEditing={() => Keyboard.dismiss()}
                                                onChangeText={(password) => this.setPassword(password)}
                                            />
                                        </View>
                                    </View>

                                    <View style={STYLES.styles.centeView} >
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate(SCREEN.FORGOTPASSWORDSCREEN), this.resetScreen() }}>
                                            <Text style={STYLES.Loginpasswordstyle.loginText}>Forgot Password?</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity style={STYLES.Loginpasswordstyle.loginBtn} onPress={() => this.onPressSubmit()}>
                                            <Text style={STYLES.Loginpasswordstyle.loginBtnText}>Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={STYLES.styles.centeView} >
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate(SCREEN.LOGINWITHEMAILSCREEN), this.resetScreen() }} >
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
}


