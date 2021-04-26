import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, ScrollView, TextInput, BackHandler,
    TouchableOpacity, Image, StyleSheet, LogBox, StatusBar
} from 'react-native';
import WallateButton from '../../components/WallateButton/WallateButton';
import MenuButton from '../../components/MenuButton/MenuButton';
import SliderScreen from '../../components/slider/sliderScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import * as STYLE from './styles';

import ActionButton from 'react-native-circular-action-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SCREEN from '../../context/screen/screenName';

const homeScreen = (props) => {
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        });
        return props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton,
            );
        });
    }, [])

    //mobile back press to call
    const handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }

    return (
        <SafeAreaView style={STYLE.styles.container}>
            <StatusBar backgroundColor='#00D9CE' barStyle='light-content' />
            <View style={STYLE.styles.headerstyle}>
                <View style={{ marginTop: 30, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                    <View style={{ justifyContent: 'flex-start' }}>
                        <MenuButton onPress={() => props.navigation.navigate('myProfileScreen')} />
                    </View>

                    <View style={{ marginLeft: -80, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('notificationScreen')}>
                            <Image source={require('../../assets/Images/notificationicon.png')} style={{ height: 25, width: 20 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'flex-end' }}>
                        <WallateButton />
                    </View>
                </View>

                <View style={STYLE.styles.centerView}>
                    <View style={STYLE.styles.statusbar}>
                        <TouchableOpacity >
                            <AntDesign name='search1' size={20} color='#00D9CE' style={{ marginLeft: 20 }} />
                        </TouchableOpacity>
                        <TextInput
                            style={STYLE.styles.statInput}
                            placeholder='Search App'
                            type='clear'
                            placeholderTextColor='#999999'
                            returnKeyType='done'
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <SliderScreen />
                <View style={STYLE.styles.categoriesText}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                        <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#00D9CE', fontWeight: 'bold' }}>Categories</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('subcategoryScreen')} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Image source={require('../../assets/Images/grommeticonstechnology1.png')}
                                style={{ height: 60, width: 60 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text>Technology</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('subcategoryScreen')} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Image source={require('../../assets/Images/icoutlinedesignservices1.png')}
                                style={{ height: 60, width: 60 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text>Design</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('subcategoryScreen')} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter1.png')}
                                style={{ height: 60, width: 60 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text>Business</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('subcategoryScreen')} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Image source={require('../../assets/Images/entypoareagraph1.png')}
                                style={{ height: 60, width: 60 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text>Marketing</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('selectCategoryScreen')} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Image source={require('../../assets/Images/allicon.png')}
                                style={{ height: 60, width: 60 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 5, alignItems: 'center' }}>
                            <Text>All Catgory</Text>
                        </View>
                    </View>
                </View>

                <View style={STYLE.styles.categoriesText}>
                    <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: '#00D9CE' }}>Top Consultants</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                    </ScrollView>
                </View>
            </ScrollView>

            <ActionButton
                buttonColor="#00D9CE"
                position="right"
                bgColor="transparent"
                autoInactive={true}
            // icon={renderImage()}
            >
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Chat" onPress={() => props.navigation.navigate(SCREEN.RECENTCHATSCREEN)}>
                    <Ionicons name="chatbubbles" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Find a counsultant" onPress={() => props.navigation.navigate(SCREEN.INVITESCREEN)}>
                    <MaterialCommunityIcons name="card-plus-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#00D9CE' size={60} title="Wallet Balance" onPress={() => props.navigation.navigate(SCREEN.MYWALLETSCREEN)}>
                    <FontAwesome name="rupee" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>

        </SafeAreaView>
    )
}

export default homeScreen;

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 20,
        color: '#FFFFFF',
    },
    actionbtn: {
        height: 100,
        width: 100,
        borderRadius: 200,
        backgroundColor: '#00D9CE',
        marginTop: 0,
        marginLeft: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const Consultants = (props) => {
    return (
        <View style={{ flexDirection: 'column', marginBottom: 30 }}>
            <TouchableOpacity style={{ margin: 20 }} onPress={props.onPress}>
                <Image source={require('../../assets/Images/Ellipse32.png')}
                    style={{ alignItems: 'center', height: 80, width: 80, borderColor: '#2294FA', borderWidth: 2, borderRadius: 100 }}
                />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 14, color: '#000000', fontWeight: '900', textAlign: 'center', marginTop: -10 }}>Maria</Text>
                <Text style={{ fontSize: 12, color: '#999999', textAlign: 'center' }}>DESIGN</Text>
                <View style={{ marginTop: -12, padding: 15, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#000000', textAlign: 'center', marginRight: 2 }}>2.3K</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        starSize={15}
                        rating={3}
                        fullStarColor={'#F1C40E'}
                        emptyStarColor={'#000000'}
                    />
                </View>
            </View>
        </View>
    )
}

