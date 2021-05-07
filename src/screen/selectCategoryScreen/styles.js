import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const categoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
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
        fontSize: 15,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    categoryview: {
        justifyContent: 'center',
        alignItems: 'center',
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
        marginLeft: 20
    }
})

export const SubCategoryStyles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 15,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    categoryview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        borderColor: '#000000',
        borderWidth: 0.1
    },
    categoryviewSelected: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        backgroundColor: '#2094FA',
        borderRadius: 1,
        borderColor: '#2094FA',
        borderWidth: 0.1
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
        elevation: 5,
        overflow: 'hidden',
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
        height: 180,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})