import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import MenuButton from '../../components/ProfileMenuButton/ProfileMenuButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
// import * as SCREEN from '../../context/screen/screenName';
import * as STYLES from './styles';

export default class myProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showModalVisible: false,
            showMessageModalVisible: false,
            showModeVisible: false,
            showMessageModeVisible: false,
        };
    }
    showModalVisible = (visible) => {
        this.setState({ showModalVisible: visible });
    }

    showModalVisibleSubmit = (visible) => {
        this.setState({ showModalVisible: visible });
        this.showMessageModalVisible(true);
    }

    showMessageModalVisible = (visible) => {
        this.setState({ showMessageModalVisible: visible });
    }
    showModeVisible = (visible) => {
        this.setState({ showModeVisible: visible });
    }

    showModeVisibleSubmit = (visible) => {
        this.setState({ showModeVisible: visible });
        this.showMessageModeVisible(true);
    }

    showMessageModeVisible = (visible) => {
        this.setState({ showMessageModeVisible: visible });
    }

    render() {
        const { showModalVisible, showMessageModalVisible, showModeVisible, showMessageModeVisible } = this.state;
        return (
            <SafeAreaView style={STYLES.styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ marginTop: hp('5%'), justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }} >
                            <View style={{ marginRight: hp('2%') }}>
                                <MenuButton onPress={() => { this.props.navigation.navigate("homeScreen") }} />
                            </View>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("notificationScreen") }}>
                                <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 30, width: 25 }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: hp('7%'), width: wp('35%'), backgroundColor: '#FFFFFF', flexDirection: 'row', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center', marginLeft: wp('20%') }}>
                                <Text style={{ fontSize: hp('2.8%'), color: '#04DE71' }}>₹5,000</Text>
                                <View style={{ marginLeft: hp('2%'), justifyContent: 'center' }}>
                                    <MaterialIcons name="account-balance-wallet" size={25} color='#04DE71' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={STYLES.styles.centerView}>
                        <View style={STYLES.styles.cardview}>
                            <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: hp('3%') }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: hp('3%'), marginLeft: wp('5%'), marginRight: wp('10%') }}>Protima Bannerjee</Text>
                                    <Text style={{ marginLeft: wp('5%'), color: '#000000' }}>#protima123</Text>
                                </View>
                                <Image source={require('../../assets/Images/Ellipse4.png')}
                                    style={STYLES.styles.profileImage}
                                />
                            </View>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("editScreen") }}
                                style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                                <Image source={require('../../assets/Images/profileicon.png')} style={{ height: 30, width: 30, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>My Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.showModeVisible(true)}
                                style={{ flexDirection: 'row', marginTop: hp('3.5%') }}>
                                <Image source={require('../../assets/Images/modeicon.png')} style={{ height: 30, width: 30, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>Mode Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("recentchatScreen") }}
                                style={{ flexDirection: 'row', marginTop: hp('3.5%') }} >
                                <Image source={require('../../assets/Images/conversation.png')} style={{ height: 30, width: 30, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>My conversations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: hp('3.5%') }}
                                onPress={() => { this.props.navigation.navigate("myspendsScreen") }}>
                                <Image source={require('../../assets/Images/Group.png')} style={{ height: 20, width: 29, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>My Spends</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: hp('4%') }}
                                onPress={() => { this.props.navigation.navigate("myWalletScreen") }}>
                                <Image source={require('../../assets/Images/walleticon.png')} style={{ height: 30, width: 30, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>My Wallet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: hp('3.5%') }} onPress={() => this.showModalVisible(true)}>
                                <Image source={require('../../assets/Images/Help.png')} style={{ height: 30, width: 30, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>Help & Support</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: hp('3.5%') }} onPress={() => { this.props.navigation.navigate("inviteScreen") }}>
                                <Image source={require('../../assets/Images/invite.png')} style={{ height: 30, width: 30, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>Invite a Friend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: hp('3.5%') }} onPress={() => { this.props.navigation.navigate("disputesScreen") }}>
                                <Image source={require('../../assets/Images/disputesicon.png')} style={{ height: 30, width: 30, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>My Disputes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: hp('3.5%') }} onPress={() => { this.props.navigation.navigate('loginScreen') }}>
                                <Image source={require('../../assets/Images/logout.png')} style={{ height: 25, width: 30, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%') }}>LogOut</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: hp('3.5%'), alignItems: 'center' }} onPress={() => { }}>
                                <Image source={require('../../assets/Images/2.png')} style={{ height: 40, width: 45, marginLeft: hp('3%') }} />
                                <Text style={{ marginLeft: wp('4%'), color: '#4D4D4D', fontSize: hp('2.5%'), fontWeight: 'bold' }}>Vervitude</Text>
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('0.5%'), marginRight: hp('2%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>© Copyright 2020</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>E-Quest Counsulting Solutions Pvt. Ltd.</Text>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>All Rights Reserved</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: hp('5%') }}></View>
                </ScrollView>

                {/* Moad setting */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModeVisible}
                    onRequestClose={() => { this.showModeVisible(!showModeVisible) }}
                >

                    <View style={STYLES.styles.centerView}>
                        <View style={STYLES.styles.modeView}>
                            <View style={{ marginTop: hp('5%'), flexDirection: 'row', justifyContent: 'space-around', }}>
                                <Text style={{ fontSize: hp('3%') }}>Bright Moad</Text>
                                <TouchableOpacity>
                                    <Fontisto name="toggle-on" size={30} color='#5AC8FA' style={{ marginLeft: hp('4%') }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }}></View>
                            </View>
                            <View style={{ marginTop: hp('5%'), flexDirection: 'row', justifyContent: 'space-around', }}>
                                <Text style={{ fontSize: hp('3%') }}>Dark Moad</Text>
                                <TouchableOpacity>
                                    <Fontisto name="toggle-on" size={30} color='#5AC8FA' style={{ marginLeft: hp('4%') }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#000000' }}></View>
                            </View>
                            <View style={{ marginTop: hp('5%'), flexDirection: 'row', justifyContent: 'space-around', }}>
                                <Text style={{ fontSize: hp('3%') }}>System Default</Text>
                                <TouchableOpacity>
                                    <Fontisto name="toggle-off" size={30} color='#5AC8FA' style={{ marginLeft: hp('0%') }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { this.showModeVisibleSubmit(!showModalVisible) }}
                                style={STYLES.styles.savebtn}>
                                <Text style={{ fontSize: hp('2%'), color: '#FFFFFF' }}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.showModeVisible(!showModalVisible) }}
                                style={STYLES.styles.cancelbtn}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Help & Support model Pop */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModalVisible}
                    onRequestClose={() => { this.showModalVisible(!showModalVisible) }}
                >

                    <View style={STYLES.styles.centerView}>
                        <View style={STYLES.styles.modalView}>
                            <View style={{ marginTop: hp('5%') }}></View>
                            <View style={STYLES.styles.inputView}>
                                <TextInput
                                    style={STYLES.styles.TextInput}
                                    placeholder="Subject"
                                    type='clear'
                                    returnKeyType="next"
                                    placeholderTextColor="#999999"
                                />
                            </View>

                            <View style={STYLES.styles.textAreainputView}>
                                <TextInput
                                    style={STYLES.styles.TextareaInput}
                                    placeholder="Write Your Descripation"
                                    type='clear'
                                    returnKeyType="done"
                                    placeholderTextColor="#999999"
                                    blurOnSubmit={false}
                                    numberOfLines={3}
                                    multiline={true}
                                />
                            </View>

                        </View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { this.showModalVisibleSubmit(!showModalVisible) }}
                                style={STYLES.styles.savebtn}>
                                <Text style={{ fontSize: hp('2%'), color: '#FFFFFF' }}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.showModalVisible(!showModalVisible) }}
                                style={STYLES.styles.cancelbtn}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* message model Pop */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showMessageModalVisible}
                    onRequestClose={() => { this.showMessageModalVisible(!showMessageModalVisible) }}
                >
                    <View style={STYLES.styles.centerView}>
                        <View style={STYLES.styles.msgModalView}>
                            <Image source={require('../../assets/Images/smileicon.png')} style={{ marginTop: hp('2%'), height: 40, width: 40 }} />
                            <Text style={{ marginTop: hp('2%'), fontSize: hp('2%') }}>Sorry to hear about the issue</Text>
                            <Text style={{ fontSize: hp('2%') }}>Your quiry has been Submit</Text>
                            <Text style={{ marginTop: hp('2%'), fontSize: hp('2%') }}>You will hear from us very soon</Text>
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: hp('2%') }}>
                            <TouchableOpacity onPress={() => { }}
                                style={STYLES.styles.cancelbtn}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}
