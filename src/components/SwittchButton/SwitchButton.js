import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function SwitchButton(props) {
    return (
        <TouchableOpacity style={styles.submitBtn} onPress={props.onPress} >
            <Text style={styles.submitbtnText}>Online</Text>
            <AntDesign name="setting" size={24} color="#00D9CD" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    submitBtn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        height: hp('5%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    submitbtnText: {
        color: '#00D9CD',
        fontSize: hp('2%'),
        marginRight: hp('2%')
    },
});


