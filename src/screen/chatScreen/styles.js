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
        elevation: 1,
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
        elevation: 1,
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