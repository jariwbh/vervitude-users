import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    walletview: {
        height: 180,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 5,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    counsultantview: {
        flex: 1,
        height: 160,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 5,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        overflow: 'hidden',
    },
    headerstyle: {
        backgroundColor: '#FFE64F',
        width: WIDTH,
        height: 100,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },
    cauve: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: -35,
        marginTop: -45,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    }
})