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
    },
})
