import { StyleSheet, Dimensions } from "react-native";
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5AC8FA'
    },
    counsultantview: {
        flex: 1,
        //height: HEIGHT,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 20,
        shadowOpacity: 10,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,

    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
    counsultantdetail: {
        width: WIDTH - 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 20,
        shadowOpacity: 10,
        shadowRadius: 20,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2
    },
    cauve: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: -35,
        marginTop: -45,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: HEIGHT,
        width: WIDTH - 20
    }, headerstyle: {
        backgroundColor: '#5AC8FA',
        width: WIDTH,
        height: 80,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
})
