import React, { useEffect, useState } from 'react';
import {
    StatusBar, View, Text, SafeAreaView, Image, BackHandler,
    TouchableOpacity, ImageBackground, ScrollView, Platform, ToastAndroid
} from 'react-native'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import registerServices from '../../services/RegisterService/RegisterService';
import * as SCREEN from '../../context/screen/screenName';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import * as STYLES from './styles';

function loginScreen(props) {
    const [loading, setloading] = useState(false);

    useEffect(() => {
        // Initial configuration
        GoogleSignin.configure({
            // Mandatory method to call before calling signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId
            // Generated from Firebase console
            webClientId: '909517140999-ip9cpvc7gak7kemvlcoq06b3dpt6ckcq.apps.googleusercontent.com',
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

    //OTP verify function
    const onPressSubmit = async (res) => {
        axiosConfig('5e899bb161eb802d6037c4d7');
        setloading(true);

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
                    ToastAndroid.show('SignIn Success!', ToastAndroid.LONG);
                } else {
                    alert('SignIn Success!');
                }
                setloading(false);
                this.props.navigation.navigate(SCREEN.LOGINSCREEN);
            }
        }
        catch (error) {
            setloading(false);
            if (Platform.OS === 'android') {
                ToastAndroid.show('SignIn Failed!', ToastAndroid.LONG);
            } else {
                alert('SignIn Failed!');
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
            <StatusBar hidden barStyle='light-content' />
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
                </ScrollView>
            </ImageBackground>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default loginScreen

