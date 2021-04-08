import React from 'react';
import { Image } from 'react-native';
import { InputToolbar, Composer, Actions, Send } from 'react-native-gifted-chat';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const renderInputToolbar = (props) => (
	<InputToolbar
		{...props}
		containerStyle={{
			backgroundColor: '#fff',
			borderColor: '#737373',
			shadowOpacity: 0.5,
			shadowRadius: 2,
			shadowOffset: {
				height: 0,
				width: 0
			},
			elevation: 2,
			width: wp('90%'),
			height: hp('8%'),
			borderRadius: hp('2%'),
			borderTopWidth: 0,
			paddingVertical: 3,
			marginTop: hp('2%'),
			marginBottom: hp('2%'),
			marginHorizontal: hp('2.5%'),
			justifyContent: 'center',
			alignItems: 'center'
		}}
		renderComposer={(props) => (
			<Composer
				{...props}
				multiline={true}
				placeholder={'Write Something here'}
				textInputStyle={{
					paddingHorizontal: 15,
					marginLeft: 7,
					marginRight: 5,
					lineHeight: 20,
					fontSize: hp('2.5%')
				}}
			/>
		)}
		renderActions={(props) => (
			<Actions
				{...props}
				icon={() => (
					<Image
						source={require('../../../assets/Images/addicon.png')}
						style={{ width: 25, height: 25, marginLeft: wp('2%') }}
					/>
				)}
			/>
		)}
		renderSend={(props) => (
			<Send {...props} containerStyle={{ justifyContent: 'center' }}>
				<Image
					source={require('../../../assets/Images/sendicon.png')}
					style={{ width: 25, height: 25, marginRight: wp('4%') }}
				/>
			</Send>
		)}
	/>
);

export { renderInputToolbar };
