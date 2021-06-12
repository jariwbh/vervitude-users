import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const myWalletStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    TextInput: {
        width: WIDTH / 2,
        height: 80,
        fontSize: 26,
    },
    amount: {
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#04DE71'
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
    rechargeview: {
        width: WIDTH,
        // height: HEIGHT - 50,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    bankview: {
        height: 70,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        marginTop: 0,
        borderRadius: 20,
        justifyContent: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginBottom: 10
    },
    gamountview: {
        height: 300,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 7,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        }
    },
    headerstyle: {
        backgroundColor: '#04DE71',
        width: WIDTH,
        height: 100,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    }
})

export const rechargeDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    gamountview: {
        height: 250,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 7,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    bankview: {
        height: 50,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        borderRadius: 20,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    headerstyle: {
        backgroundColor: '#04DE71',
        width: WIDTH,
        height: 100,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    }
})

export const rechargePaymentStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    amount: {
        width: 80,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#04DE71',
        borderWidth: 1
    },
    gamountview: {
        height: 50,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 5,
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bankview: {
        height: 50,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        borderRadius: 20,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addmoney: {
        width: WIDTH / 2 - 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#04DE71',
        borderColor: '#2094FA'
    },
    headerstyle: {
        backgroundColor: '#04DE71',
        width: WIDTH,
        height: 100,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    }
})