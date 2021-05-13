import SliderService from '../../services/SliderService/SliderService';
import React, { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet, Image, ImageBackground, Text, TouchableOpacity, Linking } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Swiper from 'react-native-swiper';

const SliderScreen = () => {
    const [sliderData, setsliderData] = useState([]);

    useEffect(() => {
        sliderService();
    }, []);

    useEffect(() => {
    }, [sliderData]);

    //silder image manage function
    const sliderService = async () => {
        try {
            const response = await SliderService();
            setsliderData(response.data);
        } catch (error) {
            console.log(`error`, error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                top: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Swiper
                    containerStyle={styles.wrapper}
                    autoplay={true}
                    autoplayDirection={true}
                    activeDotColor={'#00D9CE'}
                >
                    {sliderData.map((item, index) => (
                        <View key={index} >
                            <ImageBackground source={{ uri: item.property.image[0].attachment }} style={styles.customImage} >
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 100, flex: 0.5 }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' }}>{item.property.title} </Text>
                                    <TouchableOpacity onPress={() => Linking.openURL(item.property.link)} >
                                        <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline', marginRight: 10 }}>{item.property.title_link} </Text>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View>
                    ))}
                </Swiper>
            </View>
        </View>
    )
}

export default SliderScreen;

const styles = StyleSheet.create({
    customImage: {
        height: 220,
        width: WIDTH - 20
    },
    wrapper: {
        height: 220,
        width: WIDTH - 20
    }
});