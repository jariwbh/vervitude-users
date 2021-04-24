import SliderService from '../../services/SliderService/SliderService';
import { SliderBox } from 'react-native-image-slider-box';
import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const SliderScreen = (props) => {
    const [sliderData, setsliderData] = useState([]);

    useEffect(() => {
        sliderService();
    }, []);

    //silder image manage function
    const sliderService = async () => {
        const response = await SliderService();
        console.log(`response.data`, response.data);
        setsliderData(response.data);
    }

    const images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDHm391tOm1svz-ycy5hgDrx6mHP5gQ6TdDg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FZoioB4ocvQX2_vb65I9UU_qPB2osM3ZaQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREiT7T2XDQZyH-P_3xgx69fy7c5Cjv3GXxHg&usqp=CAU',
    ]

    return (
        <View style={{ marginTop: 20 }}>
            <SliderBox
                images={images}
                sliderBoxHeight={220}
                inactiveDotColor='#00D9CE'
                paginationBoxVerticalPadding={0}
                autoplay
                circleLoop
                ImageComponentStyle={{ borderRadius: 10, width: WIDTH - 30 }}
            />
        </View>
    )
}

export default SliderScreen;