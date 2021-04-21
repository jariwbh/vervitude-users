import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
//
import AsyncStorage from '@react-native-community/async-storage';
import { AUTHUSER } from '../../context/actions/type';
//
import { GiftedChat } from 'react-native-gifted-chat';
import { renderDay, renderBubble, renderInputToolbar } from './customChatProps';
import firestore from '@react-native-firebase/firestore';
//
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

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
		setshowMessageModalVisible(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerstyle}>
				<View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
						<TouchableOpacity onPress={() => navigation.goBack(null)}>
							<AntDesign name='arrowleft' color='#FFFFFF' size={24} />
						</TouchableOpacity>
					</View>
					<Image
						source={require('../../assets/Images/Ellipse4.png')}
						style={{ width: 50, height: 52, borderRadius: 100, marginLeft: -140 }}
					/>

					<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginLeft: -150 }}>
						<Text style={{ fontSize: 18, color: '#FFFFFF' }}>Ranjan</Text>
						<Text style={{ fontSize: 12, color: '#000000', marginLeft: -20 }}>Online</Text>
					</View>
					<View style={{ justifyContent: 'flex-end', marginRight: 20 }}>
						<TouchableOpacity onPress={() => navigation.navigate('homeScreen')}>
							<Image source={require('../../assets/Images/homeicon.png')} style={{ height: 30, width: 30 }} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -5, marginLeft: 20, marginRight: 20 }}>
					<TouchableOpacity
						onPress={() => { showModalVisible(true) }}
						style={{ width: 140, height: 35, backgroundColor: '#FFFFFF', borderRadius: 100, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
						<Text style={{ fontSize: 14, color: '#FFB629' }}>Start a Project</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => { setFilterModalVisible(true) }}
						style={{ alignItems: 'center', justifyContent: 'center' }}>
						<MaterialCommunityIcons name="dots-vertical-circle" size={30} color="#FFFFFF" />
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
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
				<View style={{ marginBottom: 50 }} />
			</ScrollView>

			{/* Help & Support model Pop */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={showStartProjectVisible}
				onRequestClose={() => { showModalVisible(!showStartProjectVisible) }}
			>
				<View style={styles.centerView}>
					<View style={styles.modalView}>
						<View style={{ marginTop: 20 }} />
						<View style={styles.inputView}>
							<TextInput
								style={styles.TextInput}
								placeholder="Best time to call"
								type="clear"
								returnKeyType="next"
								placeholderTextColor="#999999"
							/>
							<TouchableOpacity>
								<Ionicons name="time-outline" size={24} color="#000000" style={{ marginRight: 5 }} />
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
					<View style={{ marginTop: 15, flexDirection: 'row' }}>
						<TouchableOpacity
							onPress={() => { showModalVisibleSubmit(!showStartProjectVisible) }}
							style={styles.savebtn}
						>
							<Text style={{ fontSize: 14, color: '#FFFFFF' }}>Submit</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => { showModalVisible(!showStartProjectVisible) }}
							style={styles.cancelbtn}
						>
							<Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{/* Filter model Pop */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={filterModalVisible}
				onRequestClose={() => { setFilterModalVisible(!filterModalVisible) }}
			>
				<View style={styles.centeView}>
					<View style={styles.modalView}>
						<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>End Chat</Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>

						<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>
							Report an issue
						</Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>

						<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Dispute </Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>

						<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Rate</Text>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
						</View>

						<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Check spend</Text>
					</View>

					<View style={{ marginTop: 15, flexDirection: 'row' }}>
						<TouchableOpacity
							onPress={() => { setFilterModalVisible(!filterModalVisible) }}
							style={styles.cancelbtn}
						>
							<Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{/* message model Pop */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={showMessageModalVisible}
				onRequestClose={() => { showMessageModalVisible(!showMessageModalVisible) }}
			>
				<View style={styles.centerView}>
					<View style={styles.msgModalView}>
						<Text style={{ marginTop: 50, fontSize: 28, fontWeight: 'bold' }}>Thank You</Text>
						<Text style={{ fontSize: 14, marginTop: 15 }}>
							Someone from our team will reach
						</Text>
						<Text style={{ fontSize: 14 }}>out to you</Text>
					</View>
					<View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
						<TouchableOpacity
							onPress={() => { setshowMessageModalVisible(false) }}
							style={styles.cancelbtn}
						>
							<Text style={{ fontSize: 14, color: '#000000' }}>Close</Text>
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
		marginTop: 20,
		width: WIDTH,
		backgroundColor: '#FFFFFF',
		borderRadius: 30,
		height: HEIGHT / 1.5 + 50,
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: {
			height: 0,
			width: 0
		},
		elevation: 3
	},
	chatIcon: {
		width: 40,
		height: 40,
		borderRadius: 100,
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
		width: WIDTH - 120,
		height: 40,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputtext: {
		fontSize: 16,
		flex: 1,
		marginLeft: 30
	},
	centerView: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	msgModalView: {
		marginTop: HEIGHT / 2 - 150,
		height: 200,
		width: WIDTH - 90,
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
	modalView: {
		marginTop: HEIGHT / 2 - 150,
		height: 250,
		width: WIDTH - 90,
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
		marginRight: 50,
		width: 100,
		height: 35,
		backgroundColor: '#FFB629',
		borderRadius: 20,
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
		width: 100,
		height: 35,
		backgroundColor: '#EEEEEE',
		borderRadius: 20,
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
		borderWidth: 0.5,
		borderColor: '#000000',
		width: WIDTH - 120,
		height: 40,
		borderRadius: 5,
		marginBottom: 20
	},
	TextInput: {
		fontSize: 14,
		flex: 1,
		backgroundColor: '#F4F4F4',
		marginLeft: 5
	},
	textAreainputView: {
		flexDirection: 'row',
		backgroundColor: '#F4F4F4',
		borderWidth: 0.5,
		borderColor: '#000000',
		width: WIDTH - 120,
		height: 100,
		borderRadius: 5
	},
	TextareaInput: {
		fontSize: 14,
		flex: 1,
		backgroundColor: '#F4F4F4',
		marginLeft: 5
	},
	centeView: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerstyle: {
		backgroundColor: '#FFB629',
		width: WIDTH,
		height: 150,
		borderBottomLeftRadius: 35,
		borderBottomRightRadius: 35
	}
});
