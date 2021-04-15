import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, Modal, TextInput, StatusBar, Switch } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import MenuButton from '../../components/ProfileMenuButton/ProfileMenuButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import * as STYLES from './styles';
// import * as SCREEN from '../../context/screen/screenName';

export default class myProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showModalVisible: false,
            showMessageModalVisible: false,
            showdarkModeVisible: false,
            showMessageModeVisible: false,
            vervitudeModalVisible: false,
            toggleSwitchAll: false
        };
    }

    showVervitudeModalVisible = (visible) => {
        this.setState({ vervitudeModalVisible: visible });
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
        this.setState({ showdarkModeVisible: visible });
    }

    showMessageModeVisible = (visible) => {
        this.setState({ showMessageModeVisible: visible });
    }

    toggleSwitchAll = (toggle) => {
        if (toggle == true) {
            this.setState({ toggleSwitchAll: false });
        }

        if (toggle == false) {
            this.setState({ toggleSwitchAll: true });
        }
    }

    render() {
        const { showModalVisible, showMessageModalVisible, showdarkModeVisible, vervitudeModalVisible, toggleSwitchAll } = this.state;
        return (
            <SafeAreaView style={STYLES.styles.container}>
                <StatusBar backgroundColor="#00CFC7" hidden barStyle="light-content" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ marginTop: 25, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }} >
                            <View style={{ paddingRight: 5 }}>
                                <MenuButton onPress={() => { this.props.navigation.navigate("homeScreen") }} />
                            </View>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("notificationScreen") }}>
                                <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 30, width: 25 }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: 45, width: 150, backgroundColor: '#FFFFFF', flexDirection: 'row', borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginLeft: 60 }}>
                                <Text style={{ fontSize: 20, color: '#04DE71' }}>₹5,000</Text>
                                <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
                                    <MaterialIcons name="account-balance-wallet" size={25} color='#04DE71' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={STYLES.styles.centerView}>
                        <View style={STYLES.styles.cardview}>
                            <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 20 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 20, paddingLeft: 20, paddingRight: 20 }}>Protima Bannerjee</Text>
                                    <Text style={{ paddingLeft: 20, color: '#000000' }}>#protima123</Text>
                                </View>
                                <Image source={require('../../assets/Images/Ellipse4.png')}
                                    style={STYLES.styles.profileImage}
                                />
                            </View>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("editScreen") }}
                                style={{ flexDirection: 'row', marginTop: 2, paddingLeft: 20 }}>
                                <Image source={require('../../assets/Images/profileicon.png')} style={{ height: 30, width: 30, }} />
                                <Text style={STYLES.styles.icontextView}>My Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.showModeVisible(true) }}
                                style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 20 }}>
                                <Image source={require('../../assets/Images/modeicon.png')} style={{ height: 30, width: 30, }} />
                                <Text style={STYLES.styles.icontextView}>Mode Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("recentchatScreen") }}
                                style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 20 }} >
                                <Image source={require('../../assets/Images/conversation.png')} style={{ height: 30, width: 30 }} />
                                <Text style={STYLES.styles.icontextView}>My conversations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 20 }}
                                onPress={() => { this.props.navigation.navigate("myspendsScreen") }}>
                                <Image source={require('../../assets/Images/Group.png')} style={{ height: 20, width: 29 }} />
                                <Text style={STYLES.styles.icontextView}>My Spends</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }}
                                onPress={() => { this.props.navigation.navigate("myWalletScreen") }}>
                                <Image source={require('../../assets/Images/walleticon.png')} style={{ height: 30, width: 30 }} />
                                <Text style={STYLES.styles.icontextView}>My Wallet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }} onPress={() => this.showModalVisible(true)}>
                                <Image source={require('../../assets/Images/Help.png')} style={{ height: 30, width: 30 }} />
                                <Text style={STYLES.styles.icontextView}>Help & Support</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }} onPress={() => { this.props.navigation.navigate("inviteScreen") }}>
                                <Image source={require('../../assets/Images/invite.png')} style={{ height: 30, width: 30 }} />
                                <Text style={STYLES.styles.icontextView}>Invite a Friend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }} onPress={() => { this.props.navigation.navigate("disputesScreen") }}>
                                <Image source={require('../../assets/Images/disputesicon.png')} style={{ height: 30, width: 30 }} />
                                <Text style={STYLES.styles.icontextView}>My Disputes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25, paddingLeft: 20 }} onPress={() => { this.props.navigation.navigate('loginScreen') }}>
                                <Image source={require('../../assets/Images/logout.png')} style={{ height: 25, width: 30 }} />
                                <Text style={STYLES.styles.icontextView}>LogOut</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, paddingLeft: 20, alignItems: 'center' }} onPress={() => { this.showVervitudeModalVisible(true) }}>
                                <Image source={require('../../assets/Images/2.png')} style={{ height: 40, width: 45 }} />
                                <Text style={{ paddingLeft: 17, color: '#4D4D4D', fontSize: 14, fontWeight: 'bold' }}>Vervitude</Text>
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5, paddingRight: 10 }}>
                                <Text style={{ fontSize: 12, color: '#000000' }}>© Copyright 2020</Text>
                                <Text style={{ fontSize: 12, color: '#000000' }}>E-Quest Counsulting Solutions Pvt. Ltd.</Text>
                                <Text style={{ fontSize: 12, color: '#000000' }}>All Rights Reserved</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 10 }}></View>
                </ScrollView>
                {/* Moad setting */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showdarkModeVisible}
                    onRequestClose={() => { this.showModeVisible(!showdarkModeVisible) }}
                >
                    <View style={STYLES.styles.centerView}>
                        <View style={STYLES.styles.modeView}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: hp('2%'), }}>
                                <Text style={{ textAlign: 'center', color: '#000000' }}>Bright Mode</Text>
                                <Switch
                                    style={{ marginLeft: wp('45%') }}
                                    trackColor={{ false: "#C4C4C4", true: "#00D9CE" }}
                                    onValueChange={() => this.toggleSwitchAll(toggleSwitchAll)}
                                    value={toggleSwitchAll} />
                            </View>
                            <View style={{ marginTop: hp('0%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#999999' }}></View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: hp('2%'), }}>
                                <Text style={{ textAlign: 'center', color: '#000000' }}>Dark Mode</Text>
                                <Switch
                                    style={{ marginLeft: wp('47%') }}
                                    trackColor={{ false: "#C4C4C4", true: "#00D9CE" }}
                                    onValueChange={() => this.toggleSwitchAll(toggleSwitchAll)}
                                    value={toggleSwitchAll} />
                            </View>
                            <View style={{ marginTop: hp('0%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#999999' }}></View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: hp('2%'), }}>
                                <Text style={{ textAlign: 'center', color: '#000000' }}>System Default</Text>
                                <Switch
                                    style={{ marginLeft: wp('41%') }}
                                    trackColor={{ false: "#C4C4C4", true: "#00D9CE" }}
                                    onValueChange={() => this.toggleSwitchAll(toggleSwitchAll)}
                                    value={toggleSwitchAll} />
                            </View>
                        </View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { this.showModeVisible(!showdarkModeVisible) }}
                                style={STYLES.styles.savebtn}>
                                <Text style={{ fontSize: hp('2%'), color: '#FFFFFF' }}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.showModeVisible(!showdarkModeVisible) }}
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
                            <TouchableOpacity onPress={() => { this.showMessageModalVisible(!showMessageModalVisible) }}
                                style={STYLES.styles.cancelbtn}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Vervitude model Pop */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={vervitudeModalVisible}
                    onRequestClose={() => { this.showVervitudeModalVisible(!vervitudeModalVisible) }}
                >
                    <View style={STYLES.styles.centerView}>
                        <View style={STYLES.styles.modalView}>
                            <TouchableOpacity onPress={() => { }}>
                                <Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>About Us</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                            </View>

                            <TouchableOpacity onPress={() => { }}>
                                <Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>Terms of use</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                            </View>

                            <TouchableOpacity onPress={() => { }}>
                                <Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>Privacy Policy</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                            </View>

                            <TouchableOpacity onPress={() => { }}>
                                <Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>Contact & Legas</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                            </View>

                            <TouchableOpacity onPress={() => { }}>
                                <Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>Copyright @2021</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }}></View>
                            </View>
                        </View>

                        <View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { this.showVervitudeModalVisible(!vervitudeModalVisible) }}
                                style={STYLES.styles.cancelbtn}>
                                <Text style={{ fontSize: hp('2%'), color: '#000000' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}
