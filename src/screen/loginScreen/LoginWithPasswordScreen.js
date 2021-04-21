import React from 'react'
import { StatusBar, View, TextInput, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import * as STYLES from './styles';

function LoginWithPasswordScreen(props) {
    return (
        <SafeAreaView style={STYLES.styles.container}>
            <StatusBar backgroundColor='#00CFC7' hidden barStyle='light-content' />
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
                                    <View style={STYLES.Loginemailstyle.inputView}>
                                        <TextInput
                                            style={STYLES.Loginemailstyle.TextInput}
                                            placeholder='Email/Mobile Number'
                                            type='clear'
                                            returnKeyType='next'
                                            placeholderTextColor='#B5B5B5'
                                        />
                                    </View>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <View style={STYLES.Loginemailstyle.inputView}>
                                        <TextInput
                                            style={STYLES.Loginemailstyle.TextInput}
                                            placeholder='Password'
                                            type='clear'
                                            returnKeyType='done'
                                            placeholderTextColor='#B5B5B5'
                                            secureTextEntry={true}
                                        />
                                    </View>
                                </View>

                                <View style={STYLES.styles.centeView} >
                                    <TouchableOpacity onPress={() => props.navigation.navigate('forgotpasswordScreen')}>
                                        <Text style={STYLES.Loginpasswordstyle.loginText}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={STYLES.Loginpasswordstyle.loginBtn} onPress={() => { }}>
                                        <Text style={STYLES.Loginpasswordstyle.loginBtnText}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={STYLES.styles.centeView} >
                            <TouchableOpacity onPress={() => props.navigation.navigate('loginwithemailScreen')} >
                                <Text style={STYLES.styles.createText}>Login With OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginVertical: 50 }} />
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginWithPasswordScreen

