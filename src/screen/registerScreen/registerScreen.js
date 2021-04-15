import React from 'react'
import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import * as STYLES from './styles';

const registerScreen = (props) => {
    return (
        <SafeAreaView style={STYLES.styles.container}>
            <StatusBar backgroundColor="#00CFC7" hidden barStyle="light-content" />
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
                            <View style={{ marginTop: 15 }}>
                                <View style={STYLES.styles.inputView}>
                                    <TextInput
                                        style={STYLES.styles.TextInput}
                                        placeholder="Email Address"
                                        type='clear'
                                        returnKeyType="next"
                                        placeholderTextColor="#B5B5B5"
                                    />
                                </View>
                                <View style={STYLES.styles.inputView}>
                                    <TextInput
                                        style={STYLES.styles.TextInput}
                                        placeholder="Full Name"
                                        type='clear'
                                        returnKeyType="next"
                                        placeholderTextColor="#B5B5B5"
                                    />
                                </View>
                                <View style={STYLES.styles.inputView}>
                                    <TextInput
                                        style={STYLES.styles.TextInput}
                                        placeholder="Phone Number"
                                        type='clear'
                                        returnKeyType="done"
                                        placeholderTextColor="#B5B5B5"
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5, marginRight: 5 }}>
                                    <View style={STYLES.styles.inputView1}>
                                        <TextInput
                                            style={STYLES.styles.TextInput}
                                        />
                                    </View>

                                    <View style={STYLES.styles.inputView1}>
                                        <TextInput
                                            style={STYLES.styles.TextInput}
                                        />
                                    </View>

                                    <View style={STYLES.styles.inputView1}>
                                        <TextInput
                                            style={STYLES.styles.TextInput}
                                        />
                                    </View>

                                    <View style={STYLES.styles.inputView1}>
                                        <TextInput
                                            style={STYLES.styles.TextInput}
                                        />
                                    </View>

                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <TouchableOpacity style={STYLES.styles.otpBtn} onPress={() => { }} >
                                        <Text style={STYLES.styles.otpbtnText}>Verify OTP</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>OR</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity style={STYLES.styles.googleBtn} onPress={() => { }} >
                                        <Text style={STYLES.styles.googlebtnText}>Register with Google</Text>
                                        <Image source={require('../../assets/Images/googleicon.png')} style={{ height: 25, width: 25, marginLeft: 15 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={STYLES.styles.centeView} >
                            <TouchableOpacity onPress={() => props.navigation.navigate("forgotpasswordScreen")} >
                                <Text style={STYLES.styles.createText}>Already have an Account?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default registerScreen;

