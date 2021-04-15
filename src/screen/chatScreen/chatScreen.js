import React, { useEffect, useCallback, useState } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	TextInput,
	Modal
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
//
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
//
import { GiftedChat } from 'react-native-gifted-chat';
import { renderDay, renderBubble, renderInputToolbar } from './customChatProps';
import firestore from '@react-native-firebase/firestore';
//
const chatScreen = ({ navigation }) => {
	const [loading, setloading] = useState(false);
	const [chatId, setchatId] = useState(null);
	const [sender, setsender] = useState(null);
	const [showStartProjectVisible, setshowStartProjectVisible] = useState(false);
	const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
	const [filterModalVisible, setfilterModalVisible] = useState(false);
	const [messages, setMessages] = useState([]);

	// chat portion
	useEffect(
		() => {
			AsyncStorage.getItem(AUTHUSER).then((res) => {
				console.log(`JSON.parse(res)._id`, JSON.parse(res)._id);
				let sender = JSON.parse(res)._id;
				setsender(sender);
				newChat(sender, '606abd8799e17f1678300c12').then((id) => {
					setchatId(id);
					let getMessages = firestore()
						.collection('chat')
						.doc(id)
						.collection('messages')
						.orderBy('order', 'desc');
					getMessages.onSnapshot((snap) => {
						let messages = snap.docs.map((item) => item.data());
						setMessages(messages);
					});
				});
			});
		},
		[navigation]
	);

	const newChat = async (sender, item) => {
		let getChatId = firestore().collection('chat');
		let snap = await getChatId.where('member', 'in', [[sender, item]]).get();
		if (snap.empty) {
			let snap2 = await getChatId.where('member', 'in', [[item, sender]]).get();
			if (snap2.empty) {
				let ref = await getChatId.add({
					member: [sender, item],
					createdAt: '',
					previewMessage: ''
				});
				return ref.id;
			} else {
				return snap2.docs[0].id;
			}
		} else {
			return snap.docs[0].id;
		}
	};

	const onSend = useCallback((messages = []) => {
		let setMessage = firestore().collection('chat').doc(chatId).collection('messages').doc();
		for (let i = 0; i < messages.length; i++) {
			const { text, user, createdAt } = messages[i];
			firestore()
				.collection('chat')
				.doc(chatId)
				.update({ previewMessage: messages[0].text, createdAt: createdAt.toString() });

			const message = {
				_id: Math.random(),
				text,
				user,
				createdAt: createdAt.toString(),
				order: firestore.FieldValue.serverTimestamp(),
				sent: true,
				received: true,
				panding: false
			};
			setMessage.set(message);
		}
	});
	//

	const setFilterModalVisible = (visible) => {
		setfilterModalVisible(visible);
	};

	const showModalVisible = (visible) => {
		setshowStartProjectVisible(visible);
	};

	const showModalVisibleSubmit = (visible) => {
		setshowStartProjectVisible(visible);
		showMessageModalVisible(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					style={{
						backgroundColor: '#FFB629',
						width: wp('100%'),
						height: hp('22%'),
						flexDirection: 'column',
						borderBottomLeftRadius: hp('3%'),
						borderBottomRightRadius: hp('3%')
					}}
				>
					<View
						style={{
							justifyContent: 'space-between',
							alignItems: 'center',
							flexDirection: 'row',
							marginTop: hp('5%'),
							marginLeft: hp('3%')
						}}
					>
						<TouchableOpacity
							style={styles.chatIcon}
							onPress={() => {
								navigation.navigate('recentchatScreen');
							}}
						>
							<AntDesign name="arrowleft" size={24} color="#FFFFFF" />
						</TouchableOpacity>

						<Image
							source={require('../../assets/Images/Ellipse4.png')}
							style={{ width: 50, height: 52, borderRadius: hp('7%'), marginLeft: hp('-20%') }}
						/>

						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
								marginLeft: wp('-38%')
							}}
						>
							<Text style={{ fontSize: hp('3%'), color: '#FFFFFF' }}>Ranjan</Text>
							<Text style={{ fontSize: hp('1.5%'), color: '#000000', marginLeft: wp('-8%') }}>
								Online
							</Text>
						</View>
						<TouchableOpacity
							style={styles.categoryIcon}
							onPress={() => {
								navigation.navigate('homeScreen');
							}}
						>
							<Entypo name="home" color="#FFFFFF" size={30} style={{ marginRight: wp('3%') }} />
						</TouchableOpacity>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: hp('2%'),
							marginLeft: hp('3%'),
							marginRight: hp('3%')
						}}
					>
						<TouchableOpacity
							onPress={() => {
								showModalVisible(true);
							}}
							style={{
								width: wp('35%'),
								height: hp('5%'),
								backgroundColor: '#FFFFFF',
								borderRadius: hp('3%'),
								alignItems: 'center',
								justifyContent: 'center',
								margin: hp('0%')
							}}
						>
							<Text style={{ fontSize: hp('2%'), color: '#FFB629' }}>Start a Project</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setFilterModalVisible(true);
							}}
							style={{ alignItems: 'center', justifyContent: 'center' }}
						>
							<MaterialCommunityIcons name="dots-vertical-circle" size={30} color="#FFFFFF" />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.chatview}>
					<GiftedChat
						user={{ _id: sender }}
						isAnimated={true}
						messages={messages}
						onSend={onSend}
						renderAvatar={null}
						alwaysShowSend={true}
						renderBubble={(props) => renderBubble(props, navigation)}
						// renderDay={renderDay}
						minInputToolbarHeight={80}
						renderInputToolbar={renderInputToolbar}
					/>
				</View>
				<View style={{ marginBottom: hp('10%') }} />
			</ScrollView>

			{/* Help & Support model Pop */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={showStartProjectVisible}
				onRequestClose={() => {
					showModalVisible(!showStartProjectVisible);
				}}
			>
				<View style={styles.centerView}>
					<View style={styles.modalView}>
						<View style={{ marginTop: hp('3%') }} />
						<View style={styles.inputView}>
							<TextInput
								style={styles.TextInput}
								placeholder="Best time to call"
								type="clear"
								returnKeyType="next"
								placeholderTextColor="#999999"
							/>
							<TouchableOpacity>
								<Ionicons
									name="time-outline"
									size={24}
									color="#000000"
									style={{ marginRight: hp('1%') }}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.inputView}>
							<TextInput
								style={styles.TextInput}
								placeholder="your Phone Number"
								type="clear"
								returnKeyType="next"
								placeholderTextColor="#999999"
							/>
						</View>
						<View style={styles.textAreainputView}>
							<TextInput
								style={styles.TextareaInput}
								placeholder="Project Brief"
								type="clear"
								returnKeyType="done"
								placeholderTextColor="#999999"
								blurOnSubmit={false}
								numberOfLines={3}
								multiline={true}
							/>
						</View>
					</View>
					<View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
						<TouchableOpacity
							onPress={() => {
								showModalVisibleSubmit(!showStartProjectVisible);
							}}
							style={styles.savebtn}
						>
							<Text style={{ fontSize: hp('2%'), color: '#FFFFFF' }}>Submit</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								showModalVisible(!showStartProjectVisible);
							}}
							style={styles.cancelbtn}
						>
							<Text style={{ fontSize: hp('2%'), color: '#000000' }}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{/* Filter model Pop */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={filterModalVisible}
				onRequestClose={() => {
					setFilterModalVisible(!filterModalVisible);
				}}
			>
				<View style={styles.centeView}>
					<View style={styles.modalView}>
						<Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>End Chat</Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>

						<Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>
							Report an issue
						</Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>

						<Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>Dispute </Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>

						<Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>Rate</Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>

						<Text style={{ padding: hp('2%'), textAlign: 'center', color: '#000000' }}>Check spend</Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>
					</View>

					<View style={{ marginTop: hp('2%'), flexDirection: 'row' }}>
						<TouchableOpacity
							onPress={() => {
								setFilterModalVisible(!filterModalVisible);
							}}
							style={styles.cancelbtn}
						>
							<Text style={{ fontSize: hp('2%'), color: '#000000' }}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{/* message model Pop */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={showMessageModalVisible}
				onRequestClose={() => {
					showMessageModalVisible(!showMessageModalVisible);
				}}
			>
				<View style={styles.centerView}>
					<View style={styles.msgModalView}>
						<Text style={{ marginTop: hp('5%'), fontSize: hp('4%'), fontWeight: 'bold' }}>Thank You</Text>
						<Text style={{ fontSize: hp('2%'), marginTop: hp('2%') }}>
							Someone from our team will reach
						</Text>
						<Text style={{ fontSize: hp('2%') }}>out to you</Text>
					</View>
					<View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: hp('2%') }}>
						<TouchableOpacity
							onPress={() => {
								showMessageModalVisible(!showMessageModalVisible);
							}}
							style={styles.cancelbtn}
						>
							<Text style={{ fontSize: hp('2%'), color: '#000000' }}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default chatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE'
	},
	chatview: {
		marginTop: hp('3%'),
		width: wp('100%'),
		backgroundColor: '#FFFFFF',
		borderRadius: hp('5%'),
		height: hp('80%'),
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: {
			height: 0,
			width: 0
		},
		elevation: 3
	},
	chatIcon: {
		width: wp('7%'),
		height: wp('7%'),
		borderRadius: hp('6%')
	},
	inputview: {
		flexDirection: 'row',
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
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputtext: {
		fontSize: hp('2.5%'),
		flex: 1,
		marginLeft: wp('4%')
	},
	centerView: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	msgModalView: {
		marginTop: hp('40%'),
		height: hp('25%'),
		width: wp('80%'),
		borderRadius: 20,
		backgroundColor: 'white',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	modalView: {
		marginTop: hp('30%'),
		height: hp('40%'),
		width: wp('80%'),
		borderRadius: 20,
		backgroundColor: 'white',
		alignItems: 'center',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	savebtn: {
		flexDirection: 'row',
		marginRight: hp('10%'),
		width: wp('30%'),
		height: hp('5%'),
		backgroundColor: '#FFB629',
		borderRadius: hp('5%'),
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	cancelbtn: {
		flexDirection: 'row',
		width: wp('30%'),
		height: hp('5%'),
		backgroundColor: '#EEEEEE',
		borderRadius: hp('5%'),
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	inputView: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F4F4F4',
		borderWidth: wp('0.1%'),
		borderColor: '#000000',
		width: wp('70%'),
		height: hp('6%'),
		borderRadius: hp('0.5%'),
		marginBottom: hp('3%')
	},
	TextInput: {
		fontSize: hp('2%'),
		flex: 1,
		backgroundColor: '#F4F4F4',
		marginLeft: hp('1%')
	},
	textAreainputView: {
		flexDirection: 'row',
		backgroundColor: '#F4F4F4',
		borderWidth: wp('0.1%'),
		borderColor: '#000000',
		width: wp('70%'),
		height: hp('15%'),
		borderRadius: hp('0.5%')
	},
	TextareaInput: {
		fontSize: hp('2%'),
		flex: 1,
		backgroundColor: '#F4F4F4',
		marginLeft: hp('1%')
	},
	centeView: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});
