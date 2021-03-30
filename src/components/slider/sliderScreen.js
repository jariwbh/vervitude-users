import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

export default function SliderScreen() {
    const images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDHm391tOm1svz-ycy5hgDrx6mHP5gQ6TdDg&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FZoioB4ocvQX2_vb65I9UU_qPB2osM3ZaQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREiT7T2XDQZyH-P_3xgx69fy7c5Cjv3GXxHg&usqp=CAU',
    ]
    return (
        <SliderBox
            images={images}
            sliderBoxHeight={230}
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={0}
            autoplay
            circleLoop
            ImageComponentStyle={{ borderRadius: wp('6%'), width: wp('90%') }}
        />
    )
}