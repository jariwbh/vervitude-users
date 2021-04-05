import React from 'react'
import { StatusBar, View, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import LoginService from '../../services/LoginService/LoginService'
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader';


export default class loginwithemailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            usererror: null,
            mobile_number: null,
            mobile_numbererror: null,
            loading: false,
            showModalVisible: false,
            showMessageModalVisible: false
        };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    //check email validation
    setEmail(email) {
        if (!email || email <= 0) {
            return this.setState({ usererror: 'User Name cannot be empty' });
        }
        return this.setState({ username: email, usererror: null });
    }

    //check mobile number validation
    setMobileNumber(mobile) {
        if (!mobile || mobile.length <= 0) {
            return this.setState({ mobile_numbererror: 'Mobile Number cannot be empty' });
        }
        return this.setState({ mobile_number: mobile, mobile_numbererror: null });
    }

    //clear Field up data
    resetScreen() {
        this.setState({
            username: null,
            usererror: null,
            mobile_number: null,
            mobile_numbererror: null,
            loading: false
        });
    }

    //add local storage Records
    authenticateUser = (user) => (
        AsyncStorage.setItem(AUTHUSER, JSON.stringify(user))
    )

    //SIGN IN BUTTON ONPRESS TO PROCESS
    onPressSubmit = () => {
        const { username, password } = this.state;
        if (!username || !password) {
            this.setEmail(username);
            this.setPassword(password);
            return;
        }
        const body = {
            username: username,
            password: password
        }
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
            if (Platform.OS === 'android') {
                ToastAndroid.show("Username and Password Invalid!", ToastAndroid.LONG)
            } else {
                alert("Username and Password Invalid!");
            }
            this.resetScreen();
            return;
        }, 6000);

        try {
            LoginService(body)
                .then(response => {
                    if (response.data.type && response.data.type == 'Error' && response.status == 500) {
                        this.setState({ loading: false })
                        if (Platform.OS === 'android') {
                            ToastAndroid.show("User not exits!", ToastAndroid.LONG)
                        } else {
                            alert("User not exits!");
                        }
                        this.resetScreen();
                        return;
                    }

                    if (response.data != null && response.data != 'undefind' && response.status == 200) {
                        let token = response.data.user._id;
                        //set header auth user key
                        axiosConfig(token);
                        this.authenticateUser(response.data.user);
                        this.setState({ loading: false })
                        if (Platform.OS === 'android') {
                            ToastAndroid.show("SignIn Success!", ToastAndroid.LONG);
                        } else {
                            alert("SignIn Success!");
                        }
                        this.props.navigation.navigate(MAINSCREEN);
                        return;
                    }
                })
        }
        catch (error) {
            console.log('error', error);
            this.setState({ loading: false });
            this.resetScreen();
            if (Platform.OS === 'android') {
                ToastAndroid.show("User not exits!", ToastAndroid.LONG);
            } else {
                alert("User not exits!");
            }
        };
    }

    render() {
        const { loading, usererror, mobile_numbererror } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#00CFC7" hidden barStyle="light-content" />
                <ImageBackground source={require('../../assets/Images/background.png')} style={styles.backgroundImage}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <View style={styles.circle}>
                            <Image source={require('../../assets/Images/icon1.png')} style={styles.imageView} />
                        </View>
                        <View style={styles.centeView}>
                            <View style={styles.boxView}>
                                <View style={{ marginTop: hp('4%') }}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="Email Address"
                                            type='clear'
                                            returnKeyType="next"
                                            placeholderTextColor="#B5B5B5"
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                                        <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>OR</Text>
                                    </View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={styles.TextInput}
                                            placeholder="Phone Number"
                                            type='clear'
                                            returnKeyType="done"
                                            placeholderTextColor="#B5B5B5"
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: wp('1.5'), marginRight: wp('1.5') }}>
                                        <View style={styles.inputView1}>
                                            <TextInput
                                                style={styles.TextInput}
                                            />
                                        </View>

                                        <View style={styles.inputView1}>
                                            <TextInput
                                                style={styles.TextInput}
                                            />
                                        </View>

                                        <View style={styles.inputView1}>
                                            <TextInput
                                                style={styles.TextInput}
                                            />
                                        </View>

                                        <View style={styles.inputView1}>
                                            <TextInput
                                                style={styles.TextInput}
                                            />
                                        </View>

                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('4%') }}>
                                        <TouchableOpacity style={styles.otpBtn} onPress={() => this.onPressSubmit()}>
                                            <Text style={styles.otpbtnText}>Verify OTP</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.centeView} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('registerScreen')}>
                                    <Text style={styles.createText}>Don't have an Account?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    {loading ? <Loader /> : null}
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

export default loginwithemailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00ff99",
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColor: {
        fontSize: hp('5%'),
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: wp('15%')
    },
    boxView: {
        height: hp('48%'),
        width: wp('95%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginTop: hp('20%')
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: wp('0%'),
        borderColor: '#555555',
        width: wp('80%'),
        height: hp('6%'),
        margin: hp('1%'),
        borderWidth: wp('0.1%'),
    },
    inputView1: {
        marginTop: hp('2%'),
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: '#555555',
        width: wp('10%'),
        height: hp('6%'),
        borderWidth: wp('0.1%')
    },
    otpBtn: {
        flexDirection: 'row',
        width: wp('80%'),
        backgroundColor: "#00D9CE",
        borderRadius: 50,
        height: hp('6%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    otpbtnText: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
        fontWeight: 'bold'
    },
    createText: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
        marginTop: hp('2%'),
        fontWeight: '900'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: hp('100%'),
        width: wp('100%')
    },
    imageView: {
        marginLeft: ('20%'),
        marginTop: ('70%'),
        height: hp('10%'),
        width: wp('45%')
    },
    circle: {
        height: hp('50%'),
        width: hp('50%'),
        borderRadius: hp('50%'),
        backgroundColor: "#FFFFFF",
        marginTop: hp('-35'),
        marginLeft: wp('-10')
    }
})