import { StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    invitetitle: {
        fontSize: hp('3'),
        fontWeight: 'bold',
        color: '#000000',
        marginTop: hp('10%'),
        textAlign: 'center',
        marginBottom: hp('5%')
    },
    fieldtitle: {
        fontSize: hp('2'),
        color: '#666666',
        marginLeft: hp('3%'),
        marginBottom: hp('1%')
    },
    boxView: {
        height: hp('75%'),
        width: wp('95%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        marginTop: hp('5%')
    },
    submitBtn: {
        flexDirection: 'row',
        width: wp('40%'),
        backgroundColor: "#5AC8FA",
        borderRadius: 50,
        height: hp('5%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    submitbtnText: {
        color: '#FFFFFF',
        fontSize: hp('2%')
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#F4F4F4",
        borderWidth: wp('0.1%'),
        borderColor: '#000000',
        width: wp('80%'),
        height: hp('6%'),
        marginLeft: hp('3%'),
        borderRadius: hp('0.5%'),
        marginBottom: hp('3%')
    },
    TextInput: {
        fontSize: hp('2%'),
        flex: 1,
        backgroundColor: '#F4F4F4',
        marginLeft: hp('1%')
    }
})
