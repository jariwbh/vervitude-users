import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'

function loginScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View>

            </View>
            <View>
                <Text>Too many</Text>
                <Text>answers</Text>
                <Text>on Google?</Text>
            </View>
            <View>
                <Text>Ask the</Text>
                <Text>Experts</Text>
            </View>
            <View style={styles.centeView}>
                <View style={styles.boxView}>
                    <View style={{ marginTop: hp('2%') }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email Address"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Password"
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#000000"
                            />
                        </View>
                    </View>
                    <View style={styles.centeView} >
                        <TouchableOpacity onPress={() => { }} >
                            <Text style={styles.supportText}>Support</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                        <TouchableOpacity style={styles.submitBtn} onPress={() => { }} >
                            <Text style={styles.submitbtnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.centeView} >
                <TouchableOpacity onPress={() => props.navigation.navigate("registerScreen")} >
                    <Text style={styles.createText}>Create An account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default loginScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00ff99",
    },
    centeView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textColor: {
        fontSize: hp('5%'),
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: wp('15%')
    },
    boxView: {
        height: hp('31%'),
        width: wp('95%'),
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginTop: hp('5%')
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: wp('10%'),
        borderColor: '#5AC8FA',
        width: wp('80%'),
        height: hp('6%'),
        margin: hp('1%'),
        borderWidth: hp('0.2%')
    },
    submitBtn: {
        flexDirection: 'row',
        width: wp('50%'),
        backgroundColor: "#5AC8FA",
        borderRadius: 50,
        height: hp('6%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    submitbtnText: {
        color: '#FFFFFF',
        fontSize: hp('2%')
    },
    createText: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
        marginTop: hp('2%'),
        fontWeight: '900'
    },
    supportText: {
        color: '#4E4E4E',
        fontSize: hp('2%'),
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
})