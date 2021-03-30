import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function MenuButton(props) {
    return (
        <TouchableOpacity style={styles.categoryIcon} onPress={props.onPress} >
            <Image source={require('../../assets/Images/menuicon.png')}
                style={{ alignItems: 'center', height: 50, width: 60 }}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryIcon: {
        marginLeft: wp('-5%'),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        borderRadius: hp('3%')
    },
});


