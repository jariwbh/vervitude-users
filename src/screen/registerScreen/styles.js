import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ff99',
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
    }
})