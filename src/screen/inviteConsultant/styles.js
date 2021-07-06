import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00D9CE'
    },
    invitetitle: {
        fontSize: 24,
        color: '#000000',
        marginTop: 80,
        textAlign: 'center',
        marginBottom: 30
    },
    fieldtitle: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 20,
        marginBottom: 5
    },
    boxView: {
        height: HEIGHT / 2 + 150,
        width: WIDTH - 20,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        marginTop: 50,
        marginBottom: 10
    },
    submitBtn: {
        flexDirection: 'row',
        width: 150,
        backgroundColor: '#00D9CE',
        borderRadius: 50,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitbtnText: {
        color: '#FFFFFF',
        fontSize: 14
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        width: WIDTH - 60,
        height: 40,
        marginLeft: 20,
        borderRadius: 5,
        marginBottom: 20
    },
    inputViewError: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F4',
        borderWidth: 1,
        borderColor: '#ff0000',
        width: WIDTH - 60,
        height: 40,
        marginLeft: 20,
        borderRadius: 5,
        marginBottom: 20
    },
    TextInput: {
        fontSize: 14,
        flex: 1,
        backgroundColor: '#F4F4F4',
        marginLeft: 10
    }
})
