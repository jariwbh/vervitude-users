import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function MenuButton(props) {
    return (
        <TouchableOpacity style={styles.categoryIcon} onPress={props.onPress} >
            <Image source={require('../../assets/images/menuicon.png')}
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
        justifyContent: 'center'
    },
});


