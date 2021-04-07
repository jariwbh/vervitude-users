import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { Dimensions, View } from 'react-native'
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function SliderScreen() {
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
                inactiveDotColor="#00D9CE"
                paginationBoxVerticalPadding={0}
                autoplay
                circleLoop
                ImageComponentStyle={{ borderRadius: 10, width: WIDTH - 30 }}
            />
        </View>
    )
}