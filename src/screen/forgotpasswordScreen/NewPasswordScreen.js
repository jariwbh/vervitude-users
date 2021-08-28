import React, { useState, useEffect } from 'react';
import { StatusBar, View, TextInput, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView, Platform, ToastAndroid } from 'react-native'
import ForgetPasswordService from '../../services/ForgetPasswordService/ForgetPasswordService';
import * as SCREEN from '../../context/screen/screenName';
import Loader from '../../components/loader/index';
import * as STYLES from './styles';
import axiosConfig from '../../helpers/axiosConfig';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";

const NewPasswordScreen = (props) => {
    const userName = props.route.params.userValue;
    const [newPassword, setNewPassword] = useState(null);
    const [newPassworderror, setNewPassworderror] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [rePassworderror, setRePassworderror] = useState(null);
    const [loading, setloading] = useState(false);
    const secondTextInputRef = React.createRef();

    useEffect(() => {
    }, [newPassword, newPassworderror, rePassword, rePassworderror, loading])

    //check password validation
    const setNewPasswordCheck = (password) => {
        if (!password || password.length <= 0) {
            setNewPassworderror('Password cannot be empty');
            return;
        }
        setNewPassword(password);
        setNewPassworderror(null);
        return;
    }

    //check password validation
    const setRePasswordCheck = (repassword) => {
        if (!repassword || repassword.length <= 0) {
            setRePassworderror('Re-Password cannot be empty');
            return;
        }
        setRePassword(repassword);
        setRePassworderror(null);
        return;
    }

    //clear Field up data
    const resetScreen = () => {
        setloading(false);
        setNewPassword(null);
        setNewPassworderror(null);
        setRePassword(null);
        setRePassworderror(null);
    }

    //SIGN IN BUTTON ONPRESS TO PROCESS
    const onPressSubmit = async () => {
        axiosConfig(null)
        if (!newPassword || !rePassword) {
            setNewPassword(newPassword);
            setRePassword(rePassword);
            return;
        }

        if (newPassword != rePassword) {
            setRePassworderror('Cant Match Re-Password');
            setNewPassworderror('Cant Match Password');
            return;
        }

        const body = {
            "newpassword": newPassword,
            "username": userName
        }

        //console.log(`body`, body);
        setloading(true);
        try {
            const response = await ForgetPasswordService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setloading(false);
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Your Password is Reset', ToastAndroid.LONG);
                } else {
                    alert('Your Password is Reset');
                }
                props.navigation.navigate(SCREEN.LOGINWITHPASSWORDSCREEN);
            }
        } catch (error) {
            //console.log(`error`, error);
            firebase.crashlytics().recordError(error);
            resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show('Something wrong, try again letter!', ToastAndroid.LONG);
            } else {
                alert('Something wrong, try again letter!');
            }
        };
    }

    return (
        <SafeAreaView style={STYLES.styles.container}>
            <GeneralStatusBarColor hidden={false} translucent={true} backgroundColor="transparent" barStyle="dark-content" />
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
                                    <View style={newPassworderror == null ? STYLES.Loginemailstyle.inputView : STYLES.Loginemailstyle.inputErrorView}>
                                        <TextInput
                                            style={STYLES.Loginemailstyle.TextInput}
                                            placeholder='New Password'
                                            type='clear'
                                            returnKeyType='next'
                                            placeholderTextColor='#B5B5B5'
                                            secureTextEntry={true}
                                            defaultValue={newPassword}
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => secondTextInputRef.current.focus()}
                                            onChangeText={(password) => setNewPasswordCheck(password)}
                                        />
                                    </View>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <View style={rePassworderror == null ? STYLES.Loginemailstyle.inputView : STYLES.Loginemailstyle.inputErrorView}>
                                        <TextInput
                                            style={STYLES.Loginemailstyle.TextInput}
                                            placeholder='Re Password'
                                            type='clear'
                                            returnKeyType='done'
                                            placeholderTextColor='#B5B5B5'
                                            secureTextEntry={true}
                                            defaultValue={rePassword}
                                            blurOnSubmit={false}
                                            ref={secondTextInputRef}
                                            onSubmitEditing={() => onPressSubmit()}
                                            onChangeText={(repassword) => setRePasswordCheck(repassword)}
                                        />
                                    </View>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={STYLES.Loginpasswordstyle.loginBtn} onPress={() => onPressSubmit()}>
                                        <Text style={STYLES.Loginpasswordstyle.loginBtnText}>Reset Password</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={STYLES.styles.centeView} >
                            <TouchableOpacity onPress={() => { props.navigation.navigate(SCREEN.REGISTERSCREEN), resetScreen() }} >
                                <Text style={STYLES.styles.createText}>Don't have an Account?</Text>
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

export default NewPasswordScreen;
