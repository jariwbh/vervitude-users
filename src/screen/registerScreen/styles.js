import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;




export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00ff99",
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxView: {
        height: HEIGHT / 1.5,
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
        marginTop: 18
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: '#555555',
        width: WIDTH - 70,
        height: 45,
        margin: 7,
        borderWidth: 1,
    },
    inputView1: {
        marginTop: 12,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderColor: '#555555',
        width: WIDTH / 10,
        height: 45,
        borderWidth: 1
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
    otpbtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    googleBtn: {
        flexDirection: 'row',
        width: WIDTH - 80,
        borderRadius: 50,
        height: 45,
        alignItems: "center",
        justifyContent: 'center',
        borderColor: '#00D9CE',
        borderWidth: 1
    },
    googlebtnText: {
        color: '#000000',
        fontSize: 14
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
        marginLeft: 60,
        marginTop: 245,
        height: 70,
        width: 200
    },
    circle: {
        height: 360,
        width: 350,
        borderRadius: 200,
        backgroundColor: "#FFFFFF",
        marginTop: -250,
        marginLeft: -50
    },
    registertext: {
        fontSize: 27,
        color: '#FFFFFF',
        fontWeight: '900',
        marginLeft: 20
    }
})