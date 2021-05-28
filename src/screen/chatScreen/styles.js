import { StyleSheet, Dimensions } from "react-native";
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const newChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    counsultantview: {
        flex: 1,
        height: 180,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 5,
        shadowOpacity: 10,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        overflow: 'hidden',
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#737373',
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: 20,
        width: WIDTH - 20,
        height: 45,
        alignItems: 'center',
    },
    statInput: {
        fontSize: 14,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    cauve: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: -35,
        marginTop: -45,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    headerstyle: {
        backgroundColor: '#5AC8FA',
        width: WIDTH,
        height: 150,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center'
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
    addmoney: {
        width: WIDTH / 2 - 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#04DE71',
        borderColor: '#2094FA',
    },
    cancelbtn: {
        flexDirection: 'row',
        marginRight: 10,
        width: WIDTH / 3,
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
    }
})

export const recentChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    counsultantview: {
        height: 90,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 15,
        shadowOpacity: 10,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderColor: '#737373',
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: 20,
        width: WIDTH - 20,
        height: 45,
        alignItems: "center",
        justifyContent: 'center',
    },
    statInput: {
        fontSize: 14,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    headerstyle: {
        backgroundColor: '#FFB629',
        width: WIDTH,
        height: 150,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})