import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from "../screen/loginScreen/loginScreen";
import registerScreen from "../screen/registerScreen/registerScreen"
import forgotpasswordScreen from "../screen/forgotpasswordScreen/forgotpasswordScreen"
import homeScreen from "../screen/homeScreen/homeScreen"
import myProfileScreen from "../screen/myProfileScreen/myProfileScreen"
import editScreen from "../screen/myProfileScreen/editScreen"
import inviteScreen from "../screen/inviteConsultant/inviteScreen"
import notificationScreen from "../screen/notificationScreen/notificationScreen"
import myWalletScreen from '../screen/myWalletScreen/myWalletScreen'
import rechargedetailScreen from '../screen/myWalletScreen/rechargedetailScreen'
import selectCategoryScreen from '../screen/selectCategoryScreen/selectCategoryScreen'
import rechargepaymentScreen from '../screen/myWalletScreen/rechargepaymentScreen'
import loginwithemailScreen from '../screen/loginScreen/loginwithemailScreen';
import promocodeScreen from '../screen/promocodeScreen/promocodeScreen';
import disputesScreen from '../screen/disputesScreen/disputesScreen';
import disputesdetailsScreen from '../screen/disputesScreen/disputesdetailsScreen'
import myspendsScreen from '../screen/myspendsScreen/myspendsScreen'
import recentchatScreen from '../screen/chatScreen/recentchatScreen'
import newchatsScreen from '../screen/chatScreen/newchatsScreen'
import subcategoryScreen from '../screen/selectCategoryScreen/subcategoryScreen'
import ranjanchatScreen from '../screen/chatScreen/ranjanchatScreen'

const Stack = createStackNavigator();

const navigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName={loginScreen}>
                <Stack.Screen name="loginScreen" component={loginScreen} />
                <Stack.Screen name="registerScreen" component={registerScreen} />
                <Stack.Screen name="forgotpasswordScreen" component={forgotpasswordScreen} />
                <Stack.Screen name="homeScreen" component={homeScreen} />
                <Stack.Screen name="myProfileScreen" component={myProfileScreen} />
                <Stack.Screen name="editScreen" component={editScreen} />
                <Stack.Screen name="inviteScreen" component={inviteScreen} />
                <Stack.Screen name="notificationScreen" component={notificationScreen} />
                <Stack.Screen name="myWalletScreen" component={myWalletScreen} />
                <Stack.Screen name="rechargedetailScreen" component={rechargedetailScreen} />
                <Stack.Screen name="selectCategoryScreen" component={selectCategoryScreen} />
                <Stack.Screen name="rechargepaymentScreen" component={rechargepaymentScreen} />
                <Stack.Screen name="loginwithemailScreen" component={loginwithemailScreen} />
                <Stack.Screen name="promocodeScreen" component={promocodeScreen} />
                <Stack.Screen name="disputesScreen" component={disputesScreen} />
                <Stack.Screen name="disputesdetailsScreen" component={disputesdetailsScreen} />
                <Stack.Screen name="myspendsScreen" component={myspendsScreen} />
                <Stack.Screen name="recentchatScreen" component={recentchatScreen} />
                <Stack.Screen name="newchatsScreen" component={newchatsScreen} />
                <Stack.Screen name="subcategoryScreen" component={subcategoryScreen} />
                <Stack.Screen name="ranjanchatScreen" component={ranjanchatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default navigationsApp