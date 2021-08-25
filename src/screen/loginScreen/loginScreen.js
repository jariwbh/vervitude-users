import React, { useEffect, useState } from 'react';
import {
    StatusBar, View, Text, SafeAreaView, Image, BackHandler,
    TouchableOpacity, ImageBackground, ScrollView, Platform, ToastAndroid
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { CheckUser } from '../../services/UserService/UserService';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as STYLES from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor'
function loginScreen(props) {
    const [loading, setloading] = useState(false);

    useEffect(() => {
        // Initial configuration
        GoogleSignin.configure({
            // Mandatory method to call before calling signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId
            // Generated from Firebase console
            webClientId: '79264411371-ipd84mi57slncv18r1004j5ql5i1osfk.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
        // Check if user is already signed in
        // _isSignedIn();
        props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        });
        return props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton,
            );
        });
    }, [])

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const info = await GoogleSignin.signIn();
            onPressSubmit(info.user);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                setloading(false);
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                setloading(false);
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                setloading(false);
                // play services not available or outdated
            } else {
                setloading(false);
                // some other error happened
                console.log(`error`, error);
            }
        }
    };

    //add local storage Records
    const authenticateUser = (user) => (
        AsyncStorage.setItem(AUTHUSER, JSON.stringify(user))
    )

    //OTP verify function
    const onPressSubmit = async (username) => {
        axiosConfig('5e899bb161eb802d6037c4d7');
        let body
        try {
            if (username) {
                body = {
                    "username": username.email
                }
            }
            setloading(true);
            const CheckUserResponse = await CheckUser(body);
            if (Object.keys(CheckUserResponse.data).length !== 0 && CheckUserResponse.data != null && CheckUserResponse.data != 'undefind' && CheckUserResponse.status == 200) {
                setloading(false);
                if (CheckUserResponse.data.property.mobile) {
                    let token = CheckUserResponse.data._id;
                    axiosConfig(token);
                    authenticateUser(CheckUserResponse.data);
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('SignIn Success', ToastAndroid.LONG);
                        props.navigation.navigate(SCREEN.HOMESCREEN);
                    }
                }
                else {
                    props.navigation.navigate(SCREEN.VERIFYMOBILESCREEN, { user: CheckUserResponse.data });
                }
            }
        }
        catch (error) {
            setloading(false);
            if (Platform.OS === 'android') {
                ToastAndroid.show('User Not Valid', ToastAndroid.LONG);
            } else {
                alert('User Not Valid');
            }
        };
    }

    //mobile back press to call
    const handleBackButton = () => {
        BackHandler.exitApp()
        return true;
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
                            <View style={STYLES.styles.boxView}>
                                <View style={{ marginTop: 15 }}>
                                    <TouchableOpacity onPress={() => googleSignIn()}
                                        style={STYLES.styles.inputView}>
                                        <Text style={STYLES.styles.TextInput}>Sign in with Google</Text>
                                        <Image source={require('../../assets/Images/googleicon.png')} style={{ height: 25, width: 25, marginLeft: 20 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={STYLES.styles.inputView1} onPress={() => props.navigation.navigate(SCREEN.LOGINWITHPASSWORDSCREEN)}>
                                        <Text style={STYLES.styles.TextInput1}>Login with Mobile or Email</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={STYLES.styles.centeView} >
                                    <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.FORGOTPASSWORDSCREEN)}>
                                        <Text style={STYLES.styles.loginText}>Can't Login?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={STYLES.styles.centeView} >
                            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.REGISTERSCREEN)} >
                                <Text style={STYLES.styles.createText}>Create An account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }} />
                </ScrollView>
            </ImageBackground>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default loginScreen

