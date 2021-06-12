import React from 'react';
import { Image, Dimensions, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import { InputToolbar, Composer, Actions, Send } from 'react-native-gifted-chat';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

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
			width: WIDTH - 20,
			height: 50,
			borderRadius: 15,
			borderTopWidth: 0,
			paddingVertical: 3,
			marginTop: 15,
			marginBottom: 15,
			marginHorizontal: 10,
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
					fontSize: 16
				}}
			/>
		)}
		renderActions={(props) => (
			<></>
			// <TouchableOpacity>
			// 	<Image
			// 		source={require('../../../assets/Images/addicon.png')}
			// 		style={{ width: 25, height: 25, marginLeft: 10, marginBottom: 10 }}
			// 	/>
			// </TouchableOpacity>
			/* <Actions
				{...props}
				icon={() => (
					<Image
						source={require('../../../assets/Images/addicon.png')}
						style={{ width: 25, height: 25, marginLeft: 10 }}
					/>
				)}
			/> */
		)}
		renderSend={(props) => (
			<Send {...props} containerStyle={{ justifyContent: 'center' }}>
				<Image
					source={require('../../../assets/Images/sendicon.png')}
					style={{ width: 25, height: 25, marginRight: 15 }}
				/>
			</Send>
		)}
	/>
);

export { renderInputToolbar };
