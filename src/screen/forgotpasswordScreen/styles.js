import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

/// forgetpassword
export const Forgetpasswordstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00ff99",
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxView: {
        height: 350,
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
        width: WIDTH - 60,
        height: 40,
        margin: 5,
        borderWidth: 0.5
    },
    inputErrorView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: 'red',
        width: WIDTH - 60,
        height: 40,
        margin: 5,
        borderWidth: 0.5
    },
    inputView2: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: '#555555',
        width: WIDTH / 2 + 20,
        height: 40,
        marginLeft: 5,
        borderWidth: 0.5
    },
    inputErrorView2: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: 'red',
        width: WIDTH / 2 + 20,
        height: 40,
        marginLeft: 5,
        borderWidth: 0.5
    },
    inputView1: {
        marginTop: 25,
        backgroundColor: "#FFFFFF",
        borderColor: '#555555',
        width: WIDTH / 2 - 170,
        height: 40,
        borderWidth: 0.5,
        textAlign: 'center',
        fontSize: 18
    },
    inputViewError1: {
        marginTop: 25,
        backgroundColor: "#FFFFFF",
        borderColor: '#FF0000',
        width: WIDTH / 2 - 170,
        height: 40,
        borderWidth: 0.5,
        textAlign: 'center',
        fontSize: 18
    },
    otpBtn: {
        flexDirection: 'row',
        width: WIDTH - 80,
        backgroundColor: "#00D9CE",
        borderColor: '#5EA2FC',
        borderRadius: 50,
        borderWidth: 0.5,
        height: 45,
        alignItems: "center",
        justifyContent: 'center'
    },
    otpBtndisable: {
        flexDirection: 'row',
        width: WIDTH - 80,
        backgroundColor: "#00D9CE",
        borderColor: '#5EA2FC',
        borderRadius: 50,
        borderWidth: 0.5,
        height: 45,
        alignItems: "center",
        justifyContent: 'center'
    },
    otpbtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    otpBtn1: {
        flexDirection: 'row',
        width: WIDTH / 3 - 10,
        backgroundColor: "#00D9CE",
        height: 40,
        alignItems: "center",
        justifyContent: 'center'
    },
    otpBtndisable1: {
        flexDirection: 'row',
        width: WIDTH / 3 - 10,
        backgroundColor: "#00D9CE",
        height: 40,
        alignItems: "center",
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
        marginLeft: 70,
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