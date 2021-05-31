// import firebase from 'react-native-firebase';

// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native'

// const PushNotification = () => {

//     useEffect(() => {
//         //this.checkPermission();
//         messageListener();
//     }, [])

//     // checkPermission = async () => {
//     //     const enabled = await firebase.messaging().hasPermission();
//     //     if (enabled) {
//     //         this.getFcmToken();
//     //     } else {
//     //         this.requestPermission();
//     //     }
//     // }

//     // getFcmToken = async () => {
//     //     const fcmToken = await firebase.messaging().getToken();
//     //     if (fcmToken) {
//     //         console.log(fcmToken);
//     //         this.showAlert('Your Firebase Token is:', fcmToken);
//     //     } else {
//     //         this.showAlert('Failed', 'No token received');
//     //     }
//     // }

//     // requestPermission = async () => {
//     //     try {
//     //         await firebase.messaging().requestPermission();
//     //         // User has authorised
//     //     } catch (error) {
//     //         // User has rejected permissions
//     //     }
//     // }

//     const messageListener = async () => {
//         const notificationListener = firebase.notifications().onNotification((notification) => {
//             const { title, body } = notification;
//             showAlert(title, body);
//         });

//         const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//             const { title, body } = notificationOpen.notification;
//             showAlert(title, body);
//         });

//         const notificationOpen = await firebase.notifications().getInitialNotification();
//         if (notificationOpen) {
//             const { title, body } = notificationOpen.notification;
//             showAlert(title, body);
//         }

//         this.messageListener = firebase.messaging().onMessage((message) => {
//             console.log(JSON.stringify(message));
//         });
//     }

//     const showAlert = (title, message) => {
//         Alert.alert(
//             title,
//             message,
//             [
//                 { text: 'OK', onPress: () => console.log('OK Pressed') },
//             ],
//             { cancelable: false },
//         );
//     }
// }

// export default PushNotification;
