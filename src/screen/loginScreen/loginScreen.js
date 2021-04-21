import React from 'react'
import { StatusBar, View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import * as STYLES from './styles';

function loginScreen(props) {
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
                            <View style={STYLES.styles.boxView}>
                                <View style={{ marginTop: 15 }}>
                                    <TouchableOpacity style={STYLES.styles.inputView}>
                                        <Text style={STYLES.styles.TextInput}>Sign in with Google</Text>
                                        <Image source={require('../../assets/Images/googleicon.png')} style={{ height: 25, width: 25, marginLeft: 20 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={STYLES.styles.inputView1} onPress={() => props.navigation.navigate('LoginWithPasswordScreen')}>
                                        <Text style={STYLES.styles.TextInput1}>Login with Mobile or Email</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={STYLES.styles.centeView} >
                                    <TouchableOpacity onPress={() => props.navigation.navigate('forgotpasswordScreen')}>
                                        <Text style={STYLES.styles.loginText}>Can't Login?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={STYLES.styles.centeView} >
                            <TouchableOpacity onPress={() => props.navigation.navigate('registerScreen')} >
                                <Text style={STYLES.styles.createText}>Create An account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default loginScreen

