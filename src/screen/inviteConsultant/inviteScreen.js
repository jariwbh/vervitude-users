import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, ToastAndroid, Platform, Image } from 'react-native'
import * as STYLES from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const inviteScreen = (props) => {
    function onPressSubmit() {
        if (Platform.OS === 'android') {
            ToastAndroid.show("User invited!", ToastAndroid.SHORT);
        } else {
            alert("User invited!");
        }
        props.navigation.replace('myProfileScreen');
    }
    return (
        <SafeAreaView style={STYLES.styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'space-between', alignItems: "center", flexDirection: 'row', marginTop: 30 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center", marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                            <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                            <Text style={{ fontSize: 28, color: '#FFFFFF', fontWeight: 'bold' }}>Invite</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'flex-start', marginRight: 20 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('homeScreen')}>
                            <Image source={require('../../assets/Images/homeicon.png')} style={{ height: 35, width: 35 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={STYLES.styles.centeView}>
                    <View style={STYLES.styles.boxView}>
                        <Text style={STYLES.styles.invitetitle}>Invite</Text>
                        <View >
                            <Text style={STYLES.styles.fieldtitle}>Email Address</Text>
                            <View style={STYLES.styles.inputView}>
                                <TextInput
                                    style={STYLES.styles.TextInput}
                                    placeholder="Email Address"
                                    type='clear'
                                    returnKeyType="next"
                                    placeholderTextColor="#999999"
                                />
                            </View>

                            <Text style={STYLES.styles.fieldtitle}>Phone Number</Text>
                            <View style={STYLES.styles.inputView}>
                                <TextInput
                                    style={STYLES.styles.TextInput}
                                    placeholder="Phone Number"
                                    type='clear'
                                    returnKeyType="next"
                                    placeholderTextColor="#999999"
                                />
                            </View>

                            <Text style={STYLES.styles.fieldtitle}>Full Name</Text>
                            <View style={STYLES.styles.inputView}>
                                <TextInput
                                    style={STYLES.styles.TextInput}
                                    placeholder="Full Name"
                                    type='clear'
                                    returnKeyType="next"
                                    placeholderTextColor="#999999"
                                />
                            </View>

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity style={STYLES.styles.submitBtn} onPress={() => onPressSubmit()} >
                                <Text style={STYLES.styles.submitbtnText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default inviteScreen;
