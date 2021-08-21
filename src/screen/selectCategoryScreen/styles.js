import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const categoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2094FA'
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
        height: 50,
        alignItems: 'center',
        marginBottom: 10
    },
    statInput: {
        fontSize: 15,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    categoryview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    headerstyle: {
        backgroundColor: '#2094FA',
        width: WIDTH,
        height: 180,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoriesText: {
        marginTop: 20,
        marginLeft: 15
    },
    homeCardView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: WIDTH - 20
    }
})

export const SubCategoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2094FA'
    },
    statusbar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
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
        height: 50,
        alignItems: 'center',
    },
    statInput: {
        fontSize: 15,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    categoryview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 1.3,
        borderColor: '#555555',
        borderWidth: 0.2,
        shadowOpacity: 0.9,
        shadowRadius: 3,
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowColor: "#F2F2F2"
    },
    categoryviewSelected: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#2094FA',
        borderRadius: 5,
        borderColor: '#2094FA',
        borderWidth: 0.3,
        shadowOpacity: 0.9,
        shadowRadius: 3,
        shadowOffset: {
            height: 2,
            width: 0,
        },
        shadowColor: "#F2F2F2"
    },
    counsultantview: {
        flex: 1,
        //height: 180,
        width: WIDTH - 40,
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: -5,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 2,
            width: 0,
        },
        elevation: 3,
        overflow: 'hidden',
        marginBottom: 10
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
        backgroundColor: '#2094FA',
        width: WIDTH,
        height: 170,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center',
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
    homeCardView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: WIDTH - 20
    }
})

export const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 20,
        color: '#FFFFFF',
    },
    actionbtn: {
        height: 100,
        width: 100,
        borderRadius: 200,
        backgroundColor: '#00D9CE',
        marginTop: 0,
        marginLeft: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
});