import SliderService from '../../services/SliderService/SliderService';
import React, { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet, Image, Text, TouchableOpacity, Linking } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import ImageSlider from 'react-native-image-slider';

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
        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: "center" }}>
            {
                sliderData && sliderData != null && sliderData.length != 0 ?
                    <ImageSlider
                        images={sliderData}
                        loopBothSides
                        style={styles.slider}
                        autoPlayWithInterval={3000}
                        customSlide={({ index, item }) => (
                            <View key={index} >
                                <Image source={{ uri: item.property.image[0].attachment }} style={styles.customImage} />
                                <View style={{}}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 28, position: 'absolute', marginTop: -120, marginLeft: 250, fontWeight: 'bold' }}>{item.property.title} </Text>
                                    <TouchableOpacity onPress={() => Linking.openURL(item.property.link)} style={{ position: 'absolute' }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 14, marginTop: -50, marginLeft: 250, fontWeight: 'bold', textDecorationLine: 'underline' }}>{item.property.title_link} </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                    : null
            }
        </View>
    )
}

export default SliderScreen;

const styles = StyleSheet.create({
    customImage: {
        height: 220,
        width: WIDTH,
    },
    slider: {
        color: '#FFFFFF',
        width: WIDTH - 20
    }
});