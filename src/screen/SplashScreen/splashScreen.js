import React, { useEffect } from 'react';
import MyPermissionController from '../../helpers/appPermission';
import AsyncStorage from '@react-native-community/async-storage';
import * as SCREEN from '../../context/screen/screenName';
import { StatusBar, SafeAreaView } from 'react-native';
import { AUTHUSER } from '../../context/actions/type';
import axiosConfig from '../../helpers/axiosConfig';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';

function SplashScreen(props) {
  useEffect(() => {
    // check AuthController use to Login Or Not Login
    async function AuthController() {
      var getUser = await AsyncStorage.getItem(AUTHUSER)
      var userData = JSON.parse(getUser);
      if (userData) {
        //set header auth user key
        let token = userData._id;
        axiosConfig(token);
        return props.navigation.navigate(SCREEN.HOMESCREEN)
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
      <GeneralStatusBarColor hidden={'false'} translucent={'true'} backgroundColor="transparent" barStyle="dark-content" />
    </SafeAreaView>
  );
}

export default SplashScreen;
