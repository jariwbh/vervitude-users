import React, { useEffect, useCallback, useState } from 'react';
import {
    View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable,
    TouchableOpacity, Image, TextInput, Modal, Dimensions, StatusBar, Platform, ToastAndroid, Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import { AUTHUSER } from '../../context/actions/type';
import StarRating from 'react-native-star-rating';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Loader from '../../components/loader/index';
import FeedBackService from '../../services/FeedBackService/FeedBackService';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const RateingScreen = (props) => {
    const consultanDetails = props.route.params.consultanDetails;
    const formdataDetails = props.route.params.formdataDetails;
    const [loading, setloading] = useState(false);
    const [rate, setrate] = useState(false);
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [userID, setuserId] = useState(null);

    // chat portion
    useEffect(
        () => {
            AsyncStorage.getItem(AUTHUSER).then((res) => {
                let memberid = JSON.parse(res)._id;
                setuserId(memberid);
            });
        }, []);

    useEffect(() => {
    }, [rating, feedback, userID, rate, loading])

    //call feedback form open
    const feedBack = async () => {
        const body = {
            formid: '60939df914f2d062cc132d68',
            contextid: formdataDetails.property.consultantid._id,
            addedby: userID,
            property: {
                rating: rating,
                feedback: feedback
            }
        }
        if (rating || feedback) {
            try {
                const response = await FeedBackService(body);
                if (response.data != null && response.data != 'undefind' && response.status == 200) {
                    setrate(false);
                    setRating(null);
                    setFeedback(null);
                    props.navigation.navigate(SCREEN.HOMESCREEN);
                }
            } catch (error) {
                firebase.crashlytics().recordError(error);
                console.log(`error`, error);
            }
        } else {
            props.navigation.navigate(SCREEN.HOMESCREEN);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GeneralStatusBarColor hidden={false} translucent={true} backgroundColor="transparent" barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                <View style={styles.centerView}>
                    <View style={styles.EndChatModalView}>
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.messageModalView}>
                            <Text style={{ marginTop: 10, fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' }}>Thank You</Text>
                            <Text style={{ marginTop: 10, fontSize: 14, color: '#FFFFFF' }}>Your chat with {consultanDetails.fullname},</Text>
                            <Text style={{ fontSize: 14, color: '#FFFFFF' }}>ended. I hope it was nice</Text>
                            <Text style={{ fontSize: 14, color: '#FFFFFF' }}> experience for you.</Text>
                        </View>

                        <View style={{ margin: 7, alignItems: 'center' }} >
                            <Text style={{ fontSize: 12, color: '#4D4D4D' }}> Your feedback can help {consultanDetails.fullname},all other </Text>
                            <Text style={{ fontSize: 12, color: '#4D4D4D' }}> people who have same questions like you.</Text>
                        </View>

                        <Pressable
                            style={styles.profileImageView}>
                            <Image source={{ uri: consultanDetails ? consultanDetails.profilepic !== null && consultanDetails.profilepic ? consultanDetails.profilepic : noProfile : null }}
                                style={styles.profileImage}
                            />
                        </Pressable>

                        <View style={{ margin: 10, alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#000000', textTransform: 'capitalize', fontWeight: 'bold' }}> {consultanDetails.fullname} </Text>
                            <Text style={{ fontSize: 12, color: '#000000' }}>{formdataDetails && formdataDetails.property && formdataDetails.property.consultantid && formdataDetails.property.consultantid.property && formdataDetails.property.consultantid.property.usertag}</Text>
                        </View>

                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={20}
                            rating={rating}
                            fullStarColor={'#C4C4C4'}
                            emptyStarColor={'#000000'}
                            selectedStar={(rating) => setRating(rating)}
                        />

                        <View style={styles.commectView}>
                            <TextInput
                                style={styles.TextareaInput}
                                placeholder='Your Comments'
                                type='clear'
                                returnKeyType='done'
                                placeholderTextColor='#999999'
                                blurOnSubmit={false}
                                numberOfLines={3}
                                multiline={true}
                                defaultValue={feedback}
                                onChangeText={(val) => setFeedback(val)}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <TouchableOpacity
                                onPress={() => feedBack()}
                                style={styles.doneBtn}
                            >
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RateingScreen;
const styles = StyleSheet.create({
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    EndChatModalView: {
        marginTop: 10,
        height: HEIGHT - 80,
        width: WIDTH - 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    messageModalView: {
        marginTop: 10,
        height: 130,
        width: WIDTH - 90,
        borderRadius: 40,
        backgroundColor: '#5AC8FA',
        alignItems: 'center',
        shadowColor: '#000000',
    },
    profileImageView: {
        marginTop: 5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: 80,
        height: 80,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderRadius: 100,
        borderColor: '#000000'
    },
    profileImage: {
        borderRadius: 100,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: 90,
        height: 90
    },
    commectView: {
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderWidth: 0.5,
        borderColor: '#000000',
        width: WIDTH - 120,
        height: HEIGHT / 7,
        borderRadius: 5
    },
    doneBtn: {
        width: WIDTH / 2,
        height: 45,
        backgroundColor: '#5AC8FA',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#5EA2FC',
        borderWidth: 0.5
    },
    TextareaInput: {
        fontSize: 14,
        flex: 1,
        backgroundColor: '#F4F4F4',
        marginLeft: 5
    },
});
