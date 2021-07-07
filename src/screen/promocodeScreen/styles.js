import { StyleSheet, Dimensions } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#787AFF',
    },
    TextInput: {
        width: WIDTH / 2 + 40,
        height: 80,
        fontSize: 24,
        color: '#FFFFFF'
    },
    gamountview: {
        height: 80,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 7,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        justifyContent: 'center',
    },
    gamountslideview: {
        flex: 1,
        width: WIDTH - 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginTop: 7,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2
    },
    mainCardView: {
        width: WIDTH,
        height: HEIGHT - 80,
        backgroundColor: '#787AFF',
        //borderTopLeftRadius: 20,
        //borderTopRightRadius: 20,
        marginTop: 20,
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 2,
    },
    headerstyle: {
        backgroundColor: '#787AFF',
        width: WIDTH,
        height: 100,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    }
})