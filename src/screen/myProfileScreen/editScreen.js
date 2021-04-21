import React from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as STYLE from './styles';

export default function editScreen(props) {
    return (
        <SafeAreaView style={STYLE.Editstyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => { props.navigation.goBack(null) }}>
                            <AntDesign name='arrowleft' size={24} color='#FFFFFF' style={{ marginLeft: 15 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('myProfileScreen')}
                            style={STYLE.Editstyles.submitbtn}>
                            <Text style={{ fontSize: 14, color: '#00D9CE' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLE.Editstyles.profileview}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/Images/Ellipse4.png')}
                                style={{ marginTop: -50, width: 100, height: 100, borderRadius: 100 }} />
                            <TouchableOpacity onPress={() => { }}
                                style={{ marginTop: -60 }}>
                                <Feather name='camera' size={24} color='#FFFFFF' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60, marginBottom: 15 }}>
                            <TouchableOpacity style={STYLE.Editstyles.generalinfitext}>
                                <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>General Information</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 12 }}>First Name</Text>
                        </View>
                        <View style={STYLE.Editstyles.inputView}>
                            <TextInput
                                style={STYLE.Editstyles.TextInputbold}
                                placeholder='First Name'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue='Ranjan'
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 12 }}>Last Name</Text>
                        </View>
                        <View style={STYLE.Editstyles.inputView}>
                            <TextInput
                                style={STYLE.Editstyles.TextInputbold}
                                placeholder='Last Name'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue='Pathak'
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 12 }}>User Tag</Text>
                        </View>
                        <View style={STYLE.Editstyles.inputView}>
                            <TextInput
                                style={STYLE.Editstyles.TextInput}
                                placeholder='User Tag'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue='#pathak'
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 12 }}>Phone Number</Text>
                        </View>
                        <View style={STYLE.Editstyles.inputView}>
                            <TextInput
                                style={STYLE.Editstyles.TextInput}
                                placeholder='Phone Number'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue='+91 9923719601'
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 12 }}>Email Address</Text>
                        </View>
                        <View style={STYLE.Editstyles.inputView}>
                            <TextInput
                                style={STYLE.Editstyles.TextInput}
                                placeholder='exmple@gmail.com'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue='ranjanpathak@gmail.com'
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 12 }}>Location</Text>
                        </View>
                        <View style={STYLE.Editstyles.inputView}>
                            <TextInput
                                style={STYLE.Editstyles.TextInput}
                                placeholder='Location'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue='Mumbai'
                            />
                            <Ionicons name='location' size={24} color='#000000' />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 12 }}>About</Text>
                        </View>
                        <View style={STYLE.Editstyles.textAreainputView}>
                            <TextInput
                                style={STYLE.Editstyles.TextareaInput}
                                placeholder='Write Description'
                                type='clear'
                                returnKeyType='done'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                numberOfLines={3}
                                multiline={true}
                                defaultValue={'Ranjan is UX Designer working with clients all over the world from last 10 years. Ranjan has worked with more then 100 brands.'}
                            />
                        </View>
                        <View style={{ marginBottom: 50 }}></View>
                    </View>
                    <View style={{ marginBottom: 20 }}></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


