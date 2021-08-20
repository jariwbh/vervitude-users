import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SELECTCATEGORYSCREEN from '../screen/selectCategoryScreen/selectCategoryScreen';
import FORGOTPASSWORDSCREEN from '../screen/forgotpasswordScreen/forgotpasswordScreen';
import LOGINWITHPASSWORDSCREEN from '../screen/loginScreen/LoginWithPasswordScreen';
import NEWPASSWORDSCREEN from '../screen/forgotpasswordScreen/NewPasswordScreen';
import RECHARGEPAYMENTSCREEN from '../screen/myWalletScreen/rechargepaymentScreen';
import DISPUTESDETAILSSCREEN from '../screen/disputesScreen/disputesdetailsScreen';
import SUBCATEGORYSCREEN from '../screen/selectCategoryScreen/subcategoryScreen';
import NOTIFICATIONSCREEN from '../screen/notificationScreen/notificationScreen';
import RECHARGEDETAILSCREEN from '../screen/myWalletScreen/rechargedetailScreen';
import LOGINWITHEMAILSCREEN from '../screen/loginScreen/loginwithemailScreen';
import CONSULTANTSSCREEN from '../screen/consultantsScreen/consultantsScreen';
import VERIFYMOBILESCREEN from '../screen/registerScreen/VerifyMobileScreen';
import VIEWPROFILESCREEN from '../screen/myProfileScreen/ViewFullPicture';
import MYPROFILESCREEN from '../screen/myProfileScreen/myProfileScreen';
import PROMOCODESCREEN from '../screen/promocodeScreen/promocodeScreen';
import RECENTCHATSCREEN from '../screen/chatScreen/recentchatScreen';
import REGISTERSCREEN from '../screen/registerScreen/registerScreen';
import DISPUTESSCREEN from '../screen/disputesScreen/disputesScreen';
import MYWALLETSCREEN from '../screen/myWalletScreen/myWalletScreen';
import MYSPENDSSCREEN from '../screen/myspendsScreen/myspendsScreen';
import INVITESCREEN from '../screen/inviteConsultant/inviteScreen';
import RATEINGSCREEN from '../screen/RateingScreen/RateingScreen';
import WEBVIEWSCREEN from '../screen/WebViewScreen/WebViewScreen';
import NEWCHATSSCREEN from '../screen/chatScreen/newchatsScreen';
import SPLASHSCREEN from '../screen/SplashScreen/splashScreen';
import EDITSCREEN from '../screen/myProfileScreen/editScreen';
import LOGINSCREEN from '../screen/loginScreen/loginScreen';
import HOMESCREEN from '../screen/homeScreen/homeScreen';
import CHATSCREEN from '../screen/chatScreen/chatScreen';

const Stack = createStackNavigator();
export default navigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName='splashScreen'>
                <Stack.Screen name='LoginWithPasswordScreen' component={LOGINWITHPASSWORDSCREEN} />
                <Stack.Screen name='forgotpasswordScreen' component={FORGOTPASSWORDSCREEN} />
                <Stack.Screen name='loginwithemailScreen' component={LOGINWITHEMAILSCREEN} />
                <Stack.Screen name='registerScreen' component={REGISTERSCREEN} />
                <Stack.Screen name='VerifyMobileScreen' component={VERIFYMOBILESCREEN} />
                {/* <Stack.Screen name='MainScreen' component={MainNavigation} /> */}
                <Stack.Screen name='splashScreen' component={SPLASHSCREEN} />
                <Stack.Screen name='loginScreen' component={LOGINSCREEN} />
                <Stack.Screen name='homeScreen' component={HOMESCREEN} />
                <Stack.Screen name='rechargepaymentScreen' component={RECHARGEPAYMENTSCREEN} />
                <Stack.Screen name='disputesdetailsScreen' component={DISPUTESDETAILSSCREEN} />
                <Stack.Screen name='rechargedetailScreen' component={RECHARGEDETAILSCREEN} />
                <Stack.Screen name='selectCategoryScreen' component={SELECTCATEGORYSCREEN} />
                <Stack.Screen name='notificationScreen' component={NOTIFICATIONSCREEN} />
                <Stack.Screen name='consultantsScreen' component={CONSULTANTSSCREEN} />
                <Stack.Screen name='subcategoryScreen' component={SUBCATEGORYSCREEN} />
                <Stack.Screen name='recentchatScreen' component={RECENTCHATSCREEN} />
                <Stack.Screen name='ViewFullPicture' component={VIEWPROFILESCREEN} />
                <Stack.Screen name='myProfileScreen' component={MYPROFILESCREEN} />
                <Stack.Screen name='promocodeScreen' component={PROMOCODESCREEN} />
                <Stack.Screen name='myWalletScreen' component={MYWALLETSCREEN} />
                <Stack.Screen name='disputesScreen' component={DISPUTESSCREEN} />
                <Stack.Screen name='myspendsScreen' component={MYSPENDSSCREEN} />
                <Stack.Screen name='newchatsScreen' component={NEWCHATSSCREEN} />
                <Stack.Screen name='inviteScreen' component={INVITESCREEN} />
                <Stack.Screen name='editScreen' component={EDITSCREEN} />
                <Stack.Screen name='chatScreen' component={CHATSCREEN} />
                <Stack.Screen name='WebViewScreen' component={WEBVIEWSCREEN} />
                <Stack.Screen name='NewPasswordScreen' component={NEWPASSWORDSCREEN} />
                <Stack.Screen name='RateingScreen' component={RATEINGSCREEN} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// const HomeStack = createStackNavigator();
// function MainNavigation() {
//     return (
//         <HomeStack.Navigator headerMode='none' initialRouteName='homeScreen'>
//             <HomeStack.Screen name='homeScreen' component={HOMESCREEN} />
//             <HomeStack.Screen name='rechargepaymentScreen' component={RECHARGEPAYMENTSCREEN} />
//             <HomeStack.Screen name='disputesdetailsScreen' component={DISPUTESDETAILSSCREEN} />
//             <HomeStack.Screen name='rechargedetailScreen' component={RECHARGEDETAILSCREEN} />
//             <HomeStack.Screen name='selectCategoryScreen' component={SELECTCATEGORYSCREEN} />
//             <HomeStack.Screen name='notificationScreen' component={NOTIFICATIONSCREEN} />
//             <HomeStack.Screen name='consultantsScreen' component={CONSULTANTSSCREEN} />
//             <HomeStack.Screen name='subcategoryScreen' component={SUBCATEGORYSCREEN} />
//             <HomeStack.Screen name='recentchatScreen' component={RECENTCHATSCREEN} />
//             <HomeStack.Screen name='ViewFullPicture' component={VIEWPROFILESCREEN} />
//             <HomeStack.Screen name='myProfileScreen' component={MYPROFILESCREEN} />
//             <HomeStack.Screen name='promocodeScreen' component={PROMOCODESCREEN} />
//             <HomeStack.Screen name='myWalletScreen' component={MYWALLETSCREEN} />
//             <HomeStack.Screen name='disputesScreen' component={DISPUTESSCREEN} />
//             <HomeStack.Screen name='myspendsScreen' component={MYSPENDSSCREEN} />
//             <HomeStack.Screen name='newchatsScreen' component={NEWCHATSSCREEN} />
//             <HomeStack.Screen name='inviteScreen' component={INVITESCREEN} />
//             <HomeStack.Screen name='editScreen' component={EDITSCREEN} />
//             <HomeStack.Screen name='chatScreen' component={CHATSCREEN} />
//         </HomeStack.Navigator>
//     );
// };
