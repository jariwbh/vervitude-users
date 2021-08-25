import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, SafeAreaView, TouchableOpacity,
    TextInput, ScrollView, Platform, ToastAndroid, StatusBar, Keyboard
} from 'react-native';
import { UserPatchService, UserProfileService } from '../../services/UserService/UserService';
import MyPermissionController from '../../helpers/appPermission';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SCREEN from '../../context/screen/screenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { AUTHUSER, CLOUD_URL, UPLOAD_PRESET } from '../../context/actions/type';
import ImagePicker from 'react-native-image-picker';
import Loader from '../../components/loader/index';
import RNFetchBlob from 'rn-fetch-blob';
import * as STYLE from './styles';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';

const editScreen = (props) => {

    const [loading, setloading] = useState(false);
    const [userDetails, setuserDetails] = useState(null);
    const [newProfilePath, setnewProfilePath] = useState(null);

    const [first_name, setfirst_name] = useState(null);
    const [first_nameError, setfirst_nameError] = useState(null);

    const [last_name, setlast_name] = useState(null);
    const [last_nameError, setlast_nameError] = useState(null);

    const [mobile, setmobile] = useState(null);
    const [mobileError, setmobileError] = useState(null);

    const [primaryemail, setprimaryemail] = useState(null);
    const [primaryemailError, setprimaryemailError] = useState(null);

    const [usertag, setusertag] = useState(null);
    const [usertagError, setusertagError] = useState(null);

    const [location, setlocation] = useState(null);
    const [locationError, setlocationError] = useState(null);

    const [about, setabout] = useState(null);
    const [aboutError, setaboutError] = useState(null);

    const secondTextInputRef = React.createRef();
    const thirdTextInputRef = React.createRef();
    const fourTextInputRef = React.createRef();
    const fiveTextInputRef = React.createRef();
    const sixTextInputRef = React.createRef();
    const sevenTextInputRef = React.createRef();

    useEffect(() => {
    }, [userDetails, about, aboutError, newProfilePath, loading, first_name, first_nameError,
        last_name, last_nameError, mobile, mobileError, primaryemail, primaryemailError,
        usertag, usertagError, location, locationError
    ])

    //check validation of fullname
    const setFirstName = (firstname) => {
        if (!firstname || firstname <= 0) {
            return setfirst_nameError('First Name cannot be empty');
        }
        setfirst_name(firstname);
        setfirst_nameError(null);
        return;
    }

    //check validation of lastname
    const setLastName = (lastname) => {
        if (!lastname || lastname <= 0) {
            return setlast_nameError('Last Name cannot be empty');
        }
        setlast_name(lastname);
        setlast_nameError(null);
        return;
    }

    //check validation of lastname
    const setUserTag = (usertag) => {
        if (!usertag || usertag <= 0) {
            return setusertagError('UserTag cannot be empty');
        }
        setusertag(usertag);
        setusertagError(null);
        return;
    }

    //check validation of email
    const setEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            setprimaryemailError('Email Id can not be empty');
            return;
        }
        if (!re.test(email)) {
            setprimaryemailError('Ooops! We need a valid email address');
            return;
        }
        setprimaryemail(email);
        setprimaryemailError(null);
        return;
    }

    //check validation of mobile number
    const setMobile_number = (mobile_number) => {
        const reg = /^\d{10}$/;
        if (!mobile_number || mobile_number.length <= 0) {
            setmobileError('Mobile Number cannot be empty');
            return;
        }
        if (!reg.test(mobile_number)) {
            setmobileError('Ooops! We need a valid Mobile Number');
            return;
        }
        setmobile(mobile_number);
        setmobileError(null);
        return;
    }

    //check validation of lastname
    const setLocation = (location) => {
        if (!location || location <= 0) {
            return setlocationError('Location cannot be empty');
        }
        setlocation(location);
        setlocationError(null);
        return;
    }

    //check validation of lastname
    const setAbout = (about) => {
        if (!about || about <= 0) {
            return setaboutError('UserTag cannot be empty');
        }
        setabout(about);
        setaboutError(null);
        return;
    }

    //get AsyncStorage current user Details
    const getUserDetails = async () => {
        //get AsyncStorage current user Details
        var getUser = await AsyncStorage.getItem(AUTHUSER);
        if (getUser == null) {
            setTimeout(() => {
                props.navigation.replace(SCREEN.LOGINSCREEN)
            }, 3000);;
        } else {
            var UserInfo = JSON.parse(getUser);
            setuserDetails(UserInfo);
            setfirst_name(UserInfo.property.first_name);
            setlast_name(UserInfo.property.last_name);
            setmobile(UserInfo.property.mobile);
            setprimaryemail(UserInfo.property.primaryemail);
            setusertag(UserInfo.property.usertag);
            setlocation(UserInfo.property.location);
            setabout(UserInfo.property.about);
        }
    }

    //REPLACE AND ADD LOCAL STORAGE FUNCTION
    const authenticateUser = (user) => {
        AsyncStorage.setItem(AUTHUSER, JSON.stringify(user));
    }

    //check permission 
    const checkPermission = () => {
        setTimeout(
            () => {
                MyPermissionController.checkAndRequestStoragePermission()
                    .then((granted) => console.log('>Storage Permission Granted'))
                    .catch((err) => console.log(err))
            },
            500
        );
    }

    useEffect(() => {
        checkPermission();
        getUserDetails();
    }, []);

    //submit button click to called
    const onPressSubmit = async () => {
        if (!first_name || !last_name || !mobile || !usertag || !location || !primaryemail || !about) {
            setFirstName(first_name);
            setLastName(last_name);
            setMobile_number(mobile);
            setEmail(primaryemail);
            setUserTag(usertag);
            setLocation(location);
            setAbout(about);
            return;
        }

        const body = {
            _id: userDetails._id,
            property: {
                live: true,
                first_name: first_name,
                last_name: last_name,
                mobile: mobile,
                primaryemail: primaryemail,
                usertag: usertag,
                location: location,
                about: about,
                type: 'user'
            }
        }

        setloading(true);
        let user = userDetails;
        user.property = body.property;
        try {
            const response = await UserPatchService(userDetails._id, body);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                authenticateUser(response.data);
                getUserDetails();
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Your Profile Update', ToastAndroid.SHORT);
                } else {
                    alert('Profile Update');
                }
            }
            props.navigation.replace(SCREEN.MYPROFILESCREEN);
        }
        catch (error) {
            // console.log(`error`, error)
            setloading(false);
            if (Platform.OS === 'android') {
                ToastAndroid.show('Profile Not Update!', ToastAndroid.SHORT);
            } else {
                alert('Profile Not Update!');
            }
        }
    }

    //IMAGE CLICK TO GET CALL FUNCTION
    const handlePicker = () => {
        ImagePicker.showImagePicker({}, (response) => {
            if (response.didCancel) {
                setloading(false);
                // console.log('User cancelled image picker');
            } else if (response.error) {
                setloading(false);
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                setloading(false);
                //  console.log('User tapped custom button: ', response.customButton);
            } else {
                setloading(true);
                onPressUploadFile(response);
            }
        });
    };

    //Upload Cloud storage function
    const onPressUploadFile = async (fileObj) => {
        if (fileObj != null) {
            const realPath = Platform.OS === 'ios' ? fileObj.uri.replace('file://', '') : fileObj.uri;
            await RNFetchBlob.fetch('POST', CLOUD_URL, { 'Content-Type': 'multipart/form-data' },
                Platform.OS === 'ios' ?
                    [{ name: 'file', filename: fileObj.fileSize, type: fileObj.type, data: RNFetchBlob.wrap(decodeURIComponent(realPath)) },
                    { name: 'upload_preset', data: UPLOAD_PRESET }]
                    :
                    [{ name: 'file', filename: fileObj.fileName, type: fileObj.type, data: RNFetchBlob.wrap(fileObj.uri) },
                    { name: 'upload_preset', data: UPLOAD_PRESET }]
            )
                .then(response => response.json())
                .then(data => {
                    setloading(false);
                    if (data && data.url) {
                        setnewProfilePath(data.url);
                        UpdateProfileService(data.url);
                    }
                }).catch(error => {
                    alert("Uploading Failed!");
                })
        } else {
            alert('Please Select File');
        }
    }

    //PROFILE PICTURE CLICK TO CALL FUNCTION
    const onChangeProfilePic = () => {
        handlePicker();
    }

    //UPDATE PROFILE PICTURE API CALL
    const UpdateProfileService = async (profilepic) => {
        let user = userDetails;
        user.profilepic = profilepic;
        try {
            const response = await UserProfileService(user);
            if (response.data != null && response.data != 'undefind' && response.status == 200) {
                authenticateUser(user);
                getUserDetails();
                if (Platform.OS === 'android') {
                    ToastAndroid.show("Your Profile Update!", ToastAndroid.SHORT);
                } else {
                    alert('Your Profile Update!');
                }
            }
        }
        catch (error) {
            setloading(false);
            if (Platform.OS === 'android') {
                ToastAndroid.show("Your Profile Not Update!", ToastAndroid.SHORT);
            } else { alert('Your Profile Not Update!') }
        }
    }

    return (
        <SafeAreaView style={STYLE.Editstyles.container}>
            <GeneralStatusBarColor hidden={false} translucent={true} backgroundColor="transparent" barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => { props.navigation.replace(SCREEN.MYPROFILESCREEN) }}>
                            <AntDesign name='arrowleft' size={24} color='#FFFFFF' style={{ marginLeft: 15 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => onPressSubmit()}
                            style={STYLE.Editstyles.submitbtn}>
                            <Text style={{ fontSize: 14, color: '#00D9CE' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={STYLE.Editstyles.profileview}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={{ uri: userDetails ? userDetails.profilepic !== null && userDetails.profilepic ? userDetails.profilepic : 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png' : null }}
                                style={{ marginTop: -50, width: 100, height: 100, borderRadius: 100 }} />
                            <TouchableOpacity onPress={() => onChangeProfilePic()}
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
                        <View style={first_nameError == null ? STYLE.Editstyles.inputView : STYLE.Editstyles.inputViewError}>
                            <TextInput
                                style={STYLE.Editstyles.TextInputbold}
                                placeholder='First Name'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue={first_name}
                                onSubmitEditing={() => secondTextInputRef.current.focus()}
                                onChangeText={(first_name) => setFirstName(first_name)}
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 12 }}>Last Name</Text>
                        </View>
                        <View style={last_nameError == null ? STYLE.Editstyles.inputView : STYLE.Editstyles.inputViewError}>
                            <TextInput
                                style={STYLE.Editstyles.TextInputbold}
                                placeholder='Last Name'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue={last_name}
                                ref={secondTextInputRef}
                                onSubmitEditing={() => thirdTextInputRef.current.focus()}
                                onChangeText={(last_name) => setLastName(last_name)}
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 12 }}>User Tag</Text>
                        </View>
                        <View style={usertagError == null ? STYLE.Editstyles.inputView : STYLE.Editstyles.inputViewError}>
                            <TextInput
                                style={STYLE.Editstyles.TextInput}
                                placeholder='User Tag'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue={usertag}
                                ref={thirdTextInputRef}
                                onSubmitEditing={() => fourTextInputRef.current.focus()}
                                onChangeText={(usertag) => setUserTag(usertag)}
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 12 }}>Phone Number</Text>
                        </View>
                        <View style={mobileError == null ? STYLE.Editstyles.inputView : STYLE.Editstyles.inputViewError}>
                            <TextInput
                                style={STYLE.Editstyles.TextInput}
                                placeholder='Phone Number'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue={mobile}
                                ref={fourTextInputRef}
                                onSubmitEditing={() => fiveTextInputRef.current.focus()}
                                onChangeText={(mobile) => setMobile_number(mobile)}
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 12 }}>Email Address</Text>
                        </View>
                        <View style={primaryemailError == null ? STYLE.Editstyles.inputView : STYLE.Editstyles.inputViewError}>
                            <TextInput
                                style={STYLE.Editstyles.TextInput}
                                placeholder='exmple@gmail.com'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue={primaryemail}
                                ref={fiveTextInputRef}
                                onSubmitEditing={() => sixTextInputRef.current.focus()}
                                onChangeText={(primaryemail) => setEmail(primaryemail)}
                            />
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 12 }}>Location</Text>
                        </View>
                        <View style={locationError == null ? STYLE.Editstyles.inputView : STYLE.Editstyles.inputViewError}>
                            <TextInput
                                style={STYLE.Editstyles.TextInput}
                                placeholder='Location'
                                type='clear'
                                returnKeyType='next'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                defaultValue={location}
                                ref={sixTextInputRef}
                                onSubmitEditing={() => sevenTextInputRef.current.focus()}
                                onChangeText={(location) => setLocation(location)}
                            />
                            {/* <Ionicons name='location' size={24} color='#000000' /> */}
                        </View>

                        <View style={{ marginLeft: 10, marginTop: 10 }}>
                            <Text style={{ fontSize: 12 }}>About</Text>
                        </View>
                        <View style={aboutError == null ? STYLE.Editstyles.textAreainputView : STYLE.Editstyles.textAreainputViewError}>
                            <TextInput
                                style={STYLE.Editstyles.TextareaInput}
                                placeholder='Write Description'
                                type='clear'
                                returnKeyType='done'
                                placeholderTextColor='#000000'
                                blurOnSubmit={false}
                                numberOfLines={3}
                                multiline={true}
                                defaultValue={about}
                                ref={sevenTextInputRef}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                onChangeText={(about) => setAbout(about)}
                            />
                        </View>
                        <View style={{ marginBottom: 60 }}></View>
                    </View>
                    <View style={{ marginBottom: 20 }}></View>
                </View>
            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default editScreen;

