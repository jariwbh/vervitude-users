import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;



export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageView: {
        marginLeft: 60,
        marginTop: 245,
        height: 70,
        width: 200,
    },
    circle: {
        height: 360,
        width: 350,
        borderRadius: 200,
        backgroundColor: "#FFFFFF",
        marginTop: -250,
        marginLeft: -50
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        borderColor: '#5AC8FA',
        width: WIDTH - 80,
        height: 45,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    inputView1: {
        flexDirection: 'row',
        backgroundColor: "#00D9CE",
        borderRadius: 20,
        borderColor: '#00D9CE',
        width: WIDTH - 80,
        height: 45,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput1: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '900',
        color: '#FFFFFF'
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColor: {
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 60
    },
    boxView: {
        height: 220,
        width: WIDTH - 20,
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
        marginTop: 40
    },
    createText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 20,
        fontWeight: '900'
    },
    loginText: {
        marginTop: 20,
        color: '#4E4E4E',
        fontSize: 14,
        textDecorationLine: 'underline',
        fontWeight: 'bold'
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
})

/// lginwitheamiscreen
export const Loginemailstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00ff99",
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxView: {
        height: HEIGHT / 2,
        width: WIDTH - 20,
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
        backgroundColor: "#FFFFFF",
        borderColor: '#555555',
        width: WIDTH - 55,
        height: 40,
        margin: 5,
        borderWidth: 1,
    },
    inputErrorView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: 'red',
        width: WIDTH - 55,
        height: 45,
        margin: 5,
        borderWidth: 1,
    },
    inputView1: {
        marginTop: 25,
        backgroundColor: "#FFFFFF",
        borderColor: '#555555',
        width: WIDTH / 10,
        height: 45,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18
    },
    otpBtn: {
        flexDirection: 'row',
        width: WIDTH - 80,
        backgroundColor: "#00D9CE",
        borderRadius: 50,
        height: 45,
        alignItems: "center",
        justifyContent: 'center'
    },
    otpBtndisable: {
        flexDirection: 'row',
        width: WIDTH - 80,
        backgroundColor: "#99fffa",
        borderRadius: 50,
        height: 45,
        alignItems: "center",
        justifyContent: 'center'
    },
    otpbtnText: {
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
        marginTop: 245,
        height: 70,
        width: 200,
    },
    circle: {
        height: 360,
        width: 350,
        borderRadius: 200,
        backgroundColor: "#FFFFFF",
        marginTop: -250,
        marginLeft: -50
    }
})