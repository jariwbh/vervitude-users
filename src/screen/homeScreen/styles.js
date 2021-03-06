import { StyleSheet, Dimensions } from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
//styles css
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00D9CE'
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
    },
    statInput: {
        fontSize: 15,
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
    },
    headerstyle: {
        backgroundColor: '#00D9CE',
        width: WIDTH,
        height: 170,
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
    },
    homeCardView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: WIDTH - 20
    }
})
