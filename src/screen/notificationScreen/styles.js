import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    notificationview: {
        flexDirection: 'column',
        height: 90,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        borderRadius: 20,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 4,
    },
    submitbtn: {
        flexDirection: 'row',
        marginRight: 15,
        width: 90,
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerstyle: {
        backgroundColor: '#00D9CE',
        width: WIDTH,
        height: 80,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },
})