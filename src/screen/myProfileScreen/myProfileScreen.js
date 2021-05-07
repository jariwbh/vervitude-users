import React, { useState, useEffect } from 'react';
import {
    Text, View, SafeAreaView, Image, TouchableOpacity,
    ScrollView, Modal, TextInput, Switch, Pressable,
    ToastAndroid, Platform, Linking, StatusBar
} from 'react-native';
import HelpSupportService from '../../services/HelpSupportService/HelpSupportService';
import MenuButton from '../../components/ProfileMenuButton/ProfileMenuButton';
import WallateButton from '../../components/WallateButton/WallateButton';
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import Loader from '../../components/loader/index';
import { useIsFocused } from '@react-navigation/native';
import * as STYLES from './styles';

const myProfileScreen = (props) => {
    const isFocused = useIsFocused();
    const [loading, setloading] = useState(false);
    const [userDetails, setuserDetails] = useState(null);
    const [showModalVisible, setshowModalVisible] = useState(false);
    const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
    const [showdarkModeVisible, setshowdarkModeVisible] = useState(false);
    const [vervitudeModalVisible, setvervitudeModalVisible] = useState(false);
    const [toggleSwitchAll, settoggleSwitchAll] = useState(false);
    const [subject, setsubject] = useState(null);
    const [subjecterror, setsubjecterror] = useState(null);
    const [description, setdescription] = useState(null);
    const [descriptionerror, setdescriptionerror] = useState(null);
    const secondTextInputRef = React.createRef();

    useEffect(() => {
        getUserData();
    }, []);

    const showVervitudeModal = (visible) => {
        setvervitudeModalVisible(visible);
    }

    const showModal = (visible) => {
        setshowModalVisible(visible);
    }

    const showModalVisibleSubmit = (visible) => {
        setshowModalVisible(visible);
        setshowMessageModalVisible(true);
    }

    const showMessageModal = (visible) => {
        setshowMessageModalVisible(visible);
    }

    const showModeVisible = (visible) => {
        setshowdarkModeVisible(visible);
    }

    const toggleSwitch = (toggle) => {
        if (toggle == true) {
            settoggleSwitchAll(false);
        }

        if (toggle == false) {
            settoggleSwitchAll(true);
        }
    }

    //view profile function
    const onTouchViewProfile = () => {
        let userProfileImage = userDetails && userDetails.profilepic ? userDetails.profilepic : 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png'
        props.navigation.navigate(SCREEN.VIEWPROFILESCREEN, { userProfileImage });
    }

    //get AsyncStorage current user Details
    const getUserData = async () => {
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        if (getUser == null) {
            setTimeout(() => {
                props.navigation.replace(SCREEN.LOGINSCREEN)
            }, 3000);;
        } else {
            var UserInfo = JSON.parse(getUser);
            setuserDetails(UserInfo);
        }
    }

    //LogOut Button click to call 
    const onPressLogout = () => {
        AsyncStorage.removeItem(AUTHUSER);
        if (Platform.OS === 'android') {
            ToastAndroid.show('Log Out Success!', ToastAndroid.SHORT);
        } else {
            alert('Log Out Success!');
        }
        props.navigation.replace(SCREEN.LOGINSCREEN);
    }

    //check validation of subject
    const setSubject = (subject) => {
        if (!subject || subject <= 0) {
            return setsubjecterror('subject cannot be empty');
        }
        setsubject(subject);
        setsubjecterror(null);
        return;
    }

    //check validation of description
    const setDescription = (description) => {
        if (!description || description <= 0) {
            return setdescriptionerror('description cannot be empty');
        }
        setdescription(description);
        setdescriptionerror(null);
        return;
    }

    //help model pop up cancel button touch to called
    const onPressCancel = () => {
        setsubject(null);
        setdescription(null);
        setsubjecterror(null);
        setdescriptionerror(null);
        setshowModalVisible(false);
    }

    //help model pop up submit button touch to called
    const onPressSubmit = async () => {
        if (!description || !subject) {
            setSubject(subject);
            setDescription(description);
            return;
        }
        const body = {
            'status': 'Requested',
            'subject': subject,
            'customerid': userDetails._id,
            'onModel': 'Member',
            'category': 'System Enhancements',
            'content': description

        }
        console.log(`body`, body);
        //setloading(true);
        try {
            const response = await HelpSupportService(body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                setloading(false);
                setshowModalVisible(false);
                setshowMessageModalVisible(true);
            }
        }
        catch (error) {
            setloading(false);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Message Sending Failed!', ToastAndroid.SHORT);
            } else {
                alert('Message Sending Failed!');
            }
            onPressCancel();
        }
    }

    return (
        <SafeAreaView style={STYLES.styles.container}>
            <StatusBar hidden backgroundColor='#00D9CE' barStyle='light-content' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 30, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                    <View style={{ justifyContent: 'flex-start' }}>
                        <MenuButton onPress={() => props.navigation.navigate('homeScreen')} />
                    </View>

                    <View style={{ marginLeft: -80, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('notificationScreen')}>
                            <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 25, width: 20 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'flex-end' }}>
                        <WallateButton onPress={() => props.navigation.navigate('myWalletScreen')} />
                    </View>
                </View>

                <View style={STYLES.styles.centerView}>
                    <View style={STYLES.styles.cardview}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ justifyContent: 'flex-start', marginLeft: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, textTransform: 'capitalize' }}>{userDetails ? userDetails.fullname : null}</Text>
                                <Text style={{ fontSize: 14, color: '#000000' }}>{userDetails ? userDetails.property.usertag && userDetails.property.usertag : null}</Text>
                            </View>

                            <View style={{ justifyContent: 'flex-end', marginRight: 20 }}>
                                <Pressable onPress={() => onTouchViewProfile()}
                                    style={STYLES.styles.profileImageView}>
                                    <Image source={{ uri: userDetails ? userDetails.profilepic !== null && userDetails.profilepic ? userDetails.profilepic : 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png' : null }}
                                        style={STYLES.styles.profileImage}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => props.navigation.navigate('editScreen')}
                            style={{ flexDirection: 'row', paddingLeft: 20 }}>
                            <Image source={require('../../assets/Images/profileicon.png')} style={{ height: 30, width: 30 }} />
                            <Text style={STYLES.styles.icontextView}>My Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => showModeVisible(true)}
                            style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 20 }}>
                            <Image source={require('../../assets/Images/modeicon.png')} style={{ height: 30, width: 30 }} />
                            <Text style={STYLES.styles.icontextView}>Mode Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('recentchatScreen')}
                            style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 20 }} >
                            <Image source={require('../../assets/Images/conversation.png')} style={{ height: 30, width: 30 }} />
                            <Text style={STYLES.styles.icontextView}>My conversations</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 20, marginBottom: 5 }}
                            onPress={() => props.navigation.navigate('myspendsScreen')}>
                            <Image source={require('../../assets/Images/Group.png')} style={{ height: 20, width: 29 }} />
                            <Text style={STYLES.styles.icontextView}>My Spends</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }}
                            onPress={() => props.navigation.navigate('myWalletScreen')}>
                            <Image source={require('../../assets/Images/walleticon.png')} style={{ height: 30, width: 30 }} />
                            <Text style={STYLES.styles.icontextView}>My Wallet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }} onPress={() => showModal(true)}>
                            <Image source={require('../../assets/Images/Help.png')} style={{ height: 30, width: 30 }} />
                            <Text style={STYLES.styles.icontextView}>Help & Support</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }} onPress={() => props.navigation.navigate('inviteScreen')}>
                            <Image source={require('../../assets/Images/invite.png')} style={{ height: 30, width: 30 }} />
                            <Text style={STYLES.styles.icontextView}>Invite a Friend</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }} onPress={() => props.navigation.navigate('disputesScreen')}>
                            <Image source={require('../../assets/Images/disputesicon.png')} style={{ height: 30, width: 30 }} />
                            <Text style={STYLES.styles.icontextView}>My Disputes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }} onPress={() => onPressLogout()}>
                            <Image source={require('../../assets/Images/logout.png')} style={{ height: 25, width: 30 }} />
                            <Text style={STYLES.styles.icontextView}>Logout</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 20, alignItems: 'center' }} onPress={() => showVervitudeModal(true)}>
                            <Image source={require('../../assets/Images/2.png')} style={{ height: 30, width: 35 }} />
                            <Text style={{ paddingLeft: 15, color: '#4D4D4D', fontSize: 14, fontWeight: 'bold' }}>Vervitude</Text>
                        </TouchableOpacity>

                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20 }}>
                            <Text style={{ fontSize: 12, color: '#000000', marginBottom: 3 }}>© Copyright 2020</Text>
                            <Text style={{ fontSize: 12, color: '#000000', marginBottom: 3 }}>E-Quest Counsulting Solutions Pvt. Ltd.</Text>
                            <Text style={{ fontSize: 12, color: '#000000' }}>All Rights Reserved</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingBottom: 10 }}></View>
            </ScrollView>

            {/* Moad setting */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showdarkModeVisible}
                onRequestClose={() => showModeVisible(!showdarkModeVisible)}
            >
                <View style={STYLES.styles.centerView}>
                    <View style={STYLES.styles.modeView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <Text style={{ textAlign: 'center', color: '#000000' }}>Bright Mode</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Switch
                                    trackColor={{ false: '#C4C4C4', true: '#00D9CE' }}
                                    onValueChange={() => toggleSwitch(toggleSwitchAll)}
                                    value={toggleSwitchAll} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#999999' }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <Text style={{ textAlign: 'center', color: '#000000' }}>Dark Mode</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Switch
                                    trackColor={{ false: '#C4C4C4', true: '#00D9CE' }}
                                    onValueChange={() => toggleSwitch(toggleSwitchAll)}
                                    value={toggleSwitchAll} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#999999' }}></View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <Text style={{ textAlign: 'center', color: '#000000' }}>System Default</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Switch
                                    trackColor={{ false: '#C4C4C4', true: '#00D9CE' }}
                                    onValueChange={() => toggleSwitch(toggleSwitchAll)}
                                    value={toggleSwitchAll} />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => showModeVisible(!showdarkModeVisible)}
                            style={STYLES.styles.savebtn}>
                            <Text style={{ fontSize: 14, color: '#FFFFFF' }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showModeVisible(!showdarkModeVisible)}
                            style={STYLES.styles.cancelbtn}>
                            <Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Help & Support model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showModalVisible}
                onRequestClose={() => showModal(!showModalVisible)}
            >
                <View style={STYLES.styles.centerView}>
                    <View style={STYLES.styles.modalView}>
                        <View style={{ marginTop: 20 }}></View>
                        <View style={subjecterror == null ? STYLES.styles.inputView : STYLES.styles.inputViewError}>
                            <TextInput
                                style={STYLES.styles.TextInput}
                                placeholder='Subject'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#999999'
                                defaultValue={subject}
                                blurOnSubmit={false}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(subject) => setSubject(subject)}
                            />
                        </View>
                        <View style={descriptionerror == null ? STYLES.styles.textAreainputView : STYLES.styles.textAreainputViewError}>
                            <TextInput
                                style={STYLES.styles.TextareaInput}
                                placeholder='Write Your Descripation'
                                type='clear'
                                returnKeyType='done'
                                placeholderTextColor='#999999'
                                blurOnSubmit={false}
                                numberOfLines={3}
                                multiline={true}
                                defaultValue={description}
                                ref={secondTextInputRef}
                                onChangeText={(description) => setdescription(description)}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => onPressSubmit()}
                            style={STYLES.styles.savebtn}>
                            <Text style={{ fontSize: 14, color: '#FFFFFF' }}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressCancel()}
                            style={STYLES.styles.cancelbtn}>
                            <Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* message model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={showMessageModalVisible}
                onRequestClose={() => showMessageModal(!showMessageModalVisible)}
            >
                <View style={STYLES.styles.centerView}>
                    <View style={STYLES.styles.msgModalView}>
                        <Image source={require('../../assets/Images/smileicon.png')} style={{ marginTop: 15, height: 40, width: 40 }} />
                        <Text style={{ marginTop: 15, fontSize: 14, color: '#000000' }}>Sorry to hear about the issue</Text>
                        <Text style={{ fontSize: 14, color: '#000000' }}>Your quiry has been Submit</Text>
                        <Text style={{ marginTop: 15, fontSize: 14, color: '#000000' }}>You will hear from us very soon</Text>
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
                        <TouchableOpacity onPress={() => showMessageModal(!showMessageModalVisible)}
                            style={STYLES.styles.cancelbtn}>
                            <Text style={{ fontSize: 14, color: '#000000' }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Vervitude model Pop */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={vervitudeModalVisible}
                onRequestClose={() => showVervitudeModal(!vervitudeModalVisible)}
            >
                <View style={STYLES.styles.centerView}>
                    <View style={STYLES.styles.vervitudemodalView}>
                        <Text
                            onPress={() => Linking.openURL('https://www.vervitude.co/')}
                            style={{ padding: 15, textAlign: 'center', color: '#000000', fontSize: 14 }}>About Us</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                        </View>

                        <Text
                            onPress={() => Linking.openURL('https://www.vervitude.co/')}
                            style={{ padding: 15, textAlign: 'center', color: '#000000', fontSize: 14 }}>Terms of use</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                        </View>

                        <Text
                            onPress={() => Linking.openURL('https://www.vervitude.co/')}
                            style={{ padding: 15, textAlign: 'center', color: '#000000', fontSize: 14 }}>Privacy Policy</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                        </View>

                        <Text
                            onPress={() => Linking.openURL('https://www.vervitude.co/')}
                            style={{ padding: 15, textAlign: 'center', color: '#000000', fontSize: 14 }}>Contact & Legas</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                        </View>

                        <Text style={{ padding: 15, textAlign: 'center', color: '#000000', fontSize: 14 }}>Copyright @2021</Text>
                    </View>

                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => showVervitudeModal(!vervitudeModalVisible)}
                            style={STYLES.styles.cancelbtn}>
                            <Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default myProfileScreen;
