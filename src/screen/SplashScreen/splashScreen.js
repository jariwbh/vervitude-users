import React, { useEffect } from 'react';
import MyPermissionController from '../../helpers/appPermission';
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import { StatusBar, SafeAreaView } from 'react-native';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';

function SplashScreen(props) {
  // check AuthController use to Login Or Not Login
  useEffect(() => {
    async function AuthController() {
      var getUser = await AsyncStorage.getItem(AUTHUSER)
      var userData = JSON.parse(getUser);
      if (userData) {
        //set header auth user key
        let token = userData._id;
        axiosConfig(token);
        return props.navigation.navigate(SCREEN.MAINSCREEN)
      } else {
        props.navigation.navigate(SCREEN.LOGINSCREEN)
      }
    }
    AuthController();
    checkPermission();
  }, []);

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

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <StatusBar hidden backgroundColor='#00D9CE' barStyle='light-content' />
    </SafeAreaView>
  );
}

export default SplashScreen;
