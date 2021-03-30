import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    abalanceview: {
        height: hp('25%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        marginTop: hp('3%'),
        borderRadius: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 3
    },
    gamountview: {
        height: hp('40%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('3%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    bankview: {
        height: hp('10%'),
        width: wp('95%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('3%'),
        marginTop: hp('3%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        justifyContent: 'center',
    }
})