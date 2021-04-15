import { StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00D9CE'
    },
    cardview: {
        width: WIDTH - 15,
        height: HEIGHT + 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modeView: {
        marginTop: 400,
        height: HEIGHT / 4,
        width: WIDTH - 60,
        borderRadius: 20,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalView: {
        marginTop: 300,
        height: HEIGHT / 3,
        width: WIDTH - 60,
        borderRadius: 20,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    // msgModalView: {
    //     marginTop: hp('40%'),
    //     height: hp('25%'),
    //     width: wp('80%'),
    //     borderRadius: 20,
    //     backgroundColor: "white",
    //     alignItems: "center",
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 2
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 5
    // },
    profileImage: {
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: 100,
        height: 100,
        marginTop: -5,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginRight: 17
    },
    savebtn: {
        flexDirection: 'row',
        marginRight: 70,
        width: 120,
        height: 35,
        backgroundColor: '#00D9CE',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    cancelbtn: {
        flexDirection: 'row',
        width: 120,
        height: 35,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    // inputView: {
    //     flexDirection: 'row',
    //     backgroundColor: "#F4F4F4",
    //     borderWidth: 1,
    //     borderColor: '#000000',
    //     width: wp('35%'),
    //     height: hp('6%'),
    //     borderRadius: hp('0.5%'),
    //     marginBottom: hp('3%')
    // },
    // TextInput: {
    //     fontSize: hp('2%'),
    //     flex: 1,
    //     backgroundColor: '#F4F4F4',
    //     marginLeft: hp('1%')
    // },
    textAreainputView: {
        flexDirection: 'row',
        backgroundColor: "#F4F4F4",
        borderWidth: wp('0.1%'),
        borderColor: '#000000',
        width: wp('70%'),
        height: hp('15%'),
        borderRadius: hp('0.5%')
    },
    TextareaInput: {
        fontSize: hp('2%'),
        flex: 1,
        backgroundColor: '#F4F4F4',
        marginLeft: hp('1%'),
    },
    icontextView: {
        paddingLeft: 17,
        color: '#4D4D4D',
        fontSize: 14
    }
})
