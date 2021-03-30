import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function ChatMenu(props) {
    return (
        <TouchableOpacity style={styles.categoryIcon} onPress={props.onPress} >
            <Image source={require('../../assets/images/chaticon.png')}
                style={{ alignItems: 'center', height: 25, width: 27, }}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryIcon: {
        width: wp("7%"),
        height: wp("7%"),
        marginRight: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
});


