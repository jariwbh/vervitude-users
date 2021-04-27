import React from 'react';
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import WallateButton from '../../components/WallateButton/WallateButton';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import * as STYLES from './styles';

function selectCategoryScreen(props) {
    return (
        <SafeAreaView style={STYLES.categoryStyles.container}>
            <StatusBar hidden backgroundColor='#2094FA' barStyle='light-content' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={STYLES.categoryStyles.headerstyle}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                                <AntDesign name='arrowleft' color='#FFFFFF' size={24} />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                <Text style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' }}>Categories</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <WallateButton onPress={() => props.navigation.navigate('myWalletScreen')} />
                        </View>
                    </View>

                    <View style={STYLES.categoryStyles.centerView}>
                        <View style={STYLES.categoryStyles.statusbar}>
                            <TouchableOpacity >
                                <AntDesign name='search1' size={20} color='#3399ff' style={{ marginLeft: 20 }} />
                            </TouchableOpacity>
                            <TextInput
                                style={STYLES.categoryStyles.statInput}
                                placeholder='Search App'
                                type='clear'
                                placeholderTextColor='#999999'
                                returnKeyType='done'
                                autoCapitalize='none'
                                autoCorrect={false}

                            />
                            <TouchableOpacity >
                                <Image source={require('../../assets/Images/filter.png')} style={{ width: 18, height: 20, marginRight: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20, justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/grommeticonstechnology.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>TECHNOLOGY</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/icoutlinedesignservices.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>DESIGN</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>BUSINESS</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/entypoareagraph.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>MARKETING</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: 20, justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/grommeticonstechnology.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>TECHNOLOGY</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/icoutlinedesignservices.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>DESIGN</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>BUSINESS</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/entypoareagraph.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>MARKETING</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ marginTop: 20, justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/grommeticonstechnology.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>TECHNOLOGY</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/icoutlinedesignservices.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>DESIGN</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/icroundbusinesscenter.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>BUSINESS</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={STYLES.categoryStyles.categoryview} onPress={() => { props.navigation.navigate('subcategoryScreen') }}>
                            <Image source={require('../../assets/Images/entypoareagraph.png')} style={{ width: 70, height: 70, borderRadius: 5, borderColor: '#EEEEEE', borderWidth: 1 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>MARKETING</Text>
                            <TouchableOpacity >
                                <Foundation name='info' size={15} color='#3399ff' style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={STYLES.categoryStyles.categoriesText}>
                    <Text style={{ fontSize: 20, color: '#3399ff' }}>Top Consultants</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                        <Consultants onPress={() => props.navigation.navigate('consultantsScreen')} />
                    </ScrollView>
                </View>

                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default selectCategoryScreen

const Consultants = (props) => {
    return (
        <View style={{ flexDirection: 'column', marginBottom: 30 }}>
            <TouchableOpacity style={{ margin: 20 }} onPress={props.onPress}>
                <Image source={require('../../assets/Images/Ellipse32.png')}
                    style={{ alignItems: 'center', height: 80, width: 80, borderColor: '#2294FA', borderWidth: 2, borderRadius: 100 }}
                />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 14, color: '#000000', fontWeight: '900', textAlign: 'center', marginTop: -10 }}>Maria</Text>
                <Text style={{ fontSize: 12, color: '#999999', textAlign: 'center' }}>DESIGN</Text>
                <View style={{ marginTop: -12, padding: 15, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12, color: '#000000', textAlign: 'center', marginRight: 2 }}>2.3K</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        starSize={15}
                        rating={3}
                        fullStarColor={'#F1C40E'}
                        emptyStarColor={'#000000'}
                    />
                </View>
            </View>
        </View>
    )
}

