import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxView: {
        height: 420,
        width: WIDTH - 30,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        marginTop: 18,
        alignItems: 'center'
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#555555',
        width: WIDTH - 80,
        height: 40,
        borderWidth: 0.5
    },
    inputViewError: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#FF0000',
        width: WIDTH - 80,
        height: 40,
        borderWidth: 0.5
    },
    inputView1: {
        marginTop: 25,
        backgroundColor: '#FFFFFF',
        borderColor: '#555555',
        width: 40,
        height: 40,
        borderWidth: 0.5,
        textAlign: 'center',
        fontSize: 18
    },
    otpBtn: {
        flexDirection: 'row',
        width: WIDTH - 80,
        backgroundColor: '#00D9CE',
        borderColor: '#5AC8FA',
        borderWidth: 0.5,
        borderRadius: 50,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpbtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    googleBtn: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderColor: '#00D9CE',
        width: WIDTH - 80,
        height: 45,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    googlebtnText: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    createText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 5,
        fontWeight: '900'
    },
    centerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: HEIGHT,
        width: WIDTH
    },
    imageView: {
        marginLeft: 70,
        marginTop: 260,
        height: 50,
        width: 200,
    },
    circle: {
        height: 350,
        width: 350,
        borderRadius: 200,
        backgroundColor: '#FFFFFF',
        marginTop: -250,
        marginLeft: -50
    },
    registertext: {
        fontSize: 27,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 20
    },
    TextInput: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10
    },
    inputView2: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#555555',
        width: WIDTH / 2 + 10,
        height: 40,
        borderWidth: 0.5,
        marginLeft: 5
    },
    inputErrorView2: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#FF0000',
        width: WIDTH / 2 + 10,
        height: 40,
        borderWidth: 0.5,
        marginLeft: 5
    },
    otpBtn1: {
        flexDirection: 'row',
        width: WIDTH / 4,
        backgroundColor: '#00D9CE',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpbtnText1: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    modelInputView: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderWidth: 0.5,
        borderColor: '#000000',
        width: WIDTH - 120,
        height: 40,
        borderRadius: 5,
        marginBottom: 20
    },
    modelInputViewError: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderWidth: 1,
        borderColor: '#FF0000',
        width: WIDTH - 120,
        height: 40,
        borderRadius: 5,
        marginBottom: 20
    },
    modelTextAreainputView: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderWidth: 0.5,
        borderColor: '#000000',
        width: WIDTH - 120,
        height: 100,
        borderRadius: 5
    },
    modelTextAreainputViewError: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderWidth: 1,
        borderColor: '#FF0000',
        width: WIDTH - 120,
        height: 100,
        borderRadius: 5
    },
    modelTextareaInput: {
        fontSize: 14,
        flex: 1,
        backgroundColor: '#F4F4F4',
        marginLeft: 5,
    },
    savebtn: {
        flexDirection: 'row',
        marginLeft: 20,
        width: 100,
        height: 35,
        backgroundColor: '#00D9CE',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
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
        marginRight: 20,
        width: 100,
        height: 35,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalView: {
        height: 200,
        width: WIDTH - 90,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    msgModalView: {
        marginTop: HEIGHT / 2 - 150,
        height: 200,
        width: WIDTH - 90,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modelTextInput: {
        fontSize: 14,
        flex: 1,
        backgroundColor: '#F4F4F4',
        marginLeft: 5
    }
})

/// lginwitheamiscreen
export const Loginemailstyle = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#00ff99',
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxView: {
        height: 350,
        width: WIDTH - 30,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginTop: 150
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#555555',
        width: WIDTH - 80,
        height: 40,
        margin: 5,
        borderWidth: 0.5
    },
    inputErrorView: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#FF0000',
        width: WIDTH - 80,
        height: 40,
        margin: 5,
        borderWidth: 0.5
    },
    inputView2: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#555555',
        width: WIDTH / 2 + 20,
        height: 40,
        marginLeft: 5,
        borderWidth: 0.5
    },
    inputErrorView2: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#FF0000',
        width: WIDTH / 2 + 20,
        height: 40,
        marginLeft: 5,
        borderWidth: 0.5
    },
    inputView1: {
        marginTop: 25,
        backgroundColor: '#FFFFFF',
        borderColor: '#555555',
        width: 40,
        height: 40,
        borderWidth: 0.5,
        textAlign: 'center',
        fontSize: 18
    },
    inputViewError1: {
        marginTop: 25,
        backgroundColor: '#FFFFFF',
        borderColor: '#FF0000',
        width: 40,
        height: 40,
        borderWidth: 0.5,
        textAlign: 'center',
        fontSize: 18
    },
    otpBtn: {
        flexDirection: 'row',
        width: WIDTH - 80,
        backgroundColor: '#00D9CE',
        borderColor: '#5EA2FC',
        borderRadius: 50,
        borderWidth: 0.5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpBtndisable: {
        flexDirection: 'row',
        width: WIDTH - 80,
        backgroundColor: '#00D9CE',
        borderColor: '#5EA2FC',
        borderRadius: 50,
        borderWidth: 0.5,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpbtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    otpBtn1: {
        flexDirection: 'row',
        width: WIDTH / 3 - 20,
        backgroundColor: '#00D9CE',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpBtndisable1: {
        flexDirection: 'row',
        width: WIDTH / 3 - 20,
        backgroundColor: '#00D9CE',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpbtnText1: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    createText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 20,
        fontWeight: '900'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: HEIGHT,
        width: WIDTH
    },
    imageView: {
        marginLeft: 60,
        marginTop: 260,
        height: 50,
        width: 200
    },
    circle: {
        height: 350,
        width: 350,
        borderRadius: 200,
        backgroundColor: '#FFFFFF',
        marginTop: -250,
        marginLeft: -50
    },
    TextInput: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10
    }
})