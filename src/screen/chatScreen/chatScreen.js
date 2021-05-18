import React, { useEffect, useCallback, useState } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable,
	TouchableOpacity, Image, TextInput, Modal, Dimensions, StatusBar, Platform, ToastAndroid, Keyboard
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SCREEN from '../../context/screen/screenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AUTHUSER } from '../../context/actions/type';
//
import { GiftedChat } from 'react-native-gifted-chat';
import { renderDay, renderBubble, renderInputToolbar } from './customChatProps';
import firestore from '@react-native-firebase/firestore';
//
import { EndChatService, FindChatById, StartChatService, StartProject } from '../../services/ChatService/ChatService';
import moment from 'moment';
import StarRating from 'react-native-star-rating';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import axiosConfig from '../../helpers/axiosConfig';
import Loader from '../../components/loader/index';
import FeedBackService from '../../services/FeedBackService/FeedBackService';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getByIdUser } from '../../services/UserService/UserService';
import { BillService } from '../../services/BillService/BillService';

const chatScreen = (props, { navigation }) => {
	const [loading, setloading] = useState(false);
	const [chatId, setchatId] = useState(null);
	const [sender, setsender] = useState(null);
	const [showStartProjectVisible, setshowStartProjectVisible] = useState(false);
	const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
	const [showEndChatModel, setshowshowEndChatModel] = useState(false);
	const [filterModalVisible, setfilterModalVisible] = useState(false);
	const [messages, setMessages] = useState([]);
	const [formDataId, setFormDataId] = useState(null);
	const [formdataDetails, setFormdataDetails] = useState(null);
	const [hideInput, setHideInput] = useState(false);

	const consultanDetails = props.route.params.consultanDetails;
	const [rating, setRating] = useState(null);
	const [feedback, setFeedback] = useState(null);
	const [projectTime, setProjectTime] = useState(null);
	const [projectTimeError, setProjectTimeError] = useState(null);
	const [projectdesc, setProjectdesc] = useState(null);
	const [projectdescError, setProjectdescError] = useState(null);
	const [projectMobile, setProjectMobile] = useState(null);
	const [projectMobileError, setProjectMobileError] = useState(null);
	const [isTimePickerVisibility, setIsTimePickerVisibility] = useState(false);
	const [getUser, setGetUser] = useState(null);
	const secondTextInputRef = React.createRef();
	const thirdTextInputRef = React.createRef();

	// chat portion
	useEffect(
		() => {
			AsyncStorage.getItem(AUTHUSER).then((res) => {
				let sender = JSON.parse(res)._id;
				axiosConfig(sender);
				setsender(sender);
				setloading(true);
				getConsultant(consultanDetails._id)
				newChat(sender, consultanDetails._id).then((id) => {
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

	//get consultant by id call api
	const getConsultant = async (id) => {
		try {
			const response = await getByIdUser(id);
			setGetUser(response.data[0])
		} catch (error) {
			console.log(`error`, error);
		}
	}

	useEffect(() => {
	}, [formDataId, formdataDetails, hideInput, rating, feedback, sender, getUser,
		projectTime, projectTimeError, projectdesc, projectdescError, projectMobile, projectMobileError

	])

	const startChat = async (sender, item) => {
		const body = {
			formid: '608a5d7ebbeb5b2b03571f2c',
			contextid: sender,
			onModel: "Member",
			property: {
				startat: moment().format(),
				endat: null,
				consultantid: item,
				chargable: false,
				category: consultanDetails.property.livechat,
				subcategory: consultanDetails.property.skill
			}
		}
		try {
			const response = await StartChatService(body);
			if (response.data != null && response.data != 'undefind' && response.status === 200) {
				setFormDataId(response.data._id);
				firstTimeChatByIdService(response.data._id)
				if (Platform.OS === 'android') {
					ToastAndroid.show('Chat Start Now', ToastAndroid.SHORT);
				} else {
					alert('Chat Start Now');
				}
				formId = response.data._id;
			}
		}
		catch (error) {
			setloading(false);
		}
	}

	const newChat = async (sender, item) => {
		let getChatId = firestore().collection('chat');
		let snap = await getChatId.where('member', 'in', [[sender, item]]).get();
		if (snap.empty) {
			let snap2 = await getChatId.where('member', 'in', [[item, sender]]).get();
			if (snap2.empty) {
				await startChat(sender, item);
				let ref = await getChatId.add({
					member: [sender, item],
					createdAt: '',
					previewMessage: '',
					formid: formId,
					memberid: sender,
					userid: item
				});
				setloading(false);
				return ref.id;
			} else {
				setFormDataId(snap2.docs[0]._data.formid);
				FindChatByIdService(snap2.docs[0]._data.formid);
				setloading(false);
				return snap2.docs[0].id;
			}
		} else {
			setFormDataId(snap.docs[0]._data.formid);
			FindChatByIdService(snap.docs[0]._data.formid);
			setloading(false);
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

	const setFilterModalVisible = (visible) => {
		setfilterModalVisible(visible);
	};

	const showModalVisible = (visible) => {
		setProjectTime(null);
		setProjectTimeError(null);
		setProjectdesc(null);
		setProjectdescError(null);
		setProjectMobile(null);
		setProjectMobileError(null);
		setshowStartProjectVisible(visible);
		setshowshowEndChatModel(false);
	};

	const showModalVisibleSubmit = (visible) => {
		setshowStartProjectVisible(visible);
		setshowMessageModalVisible(true);
	};

	const FindChatByIdService = async (id) => {
		const response = await FindChatById(id);
		try {
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				setFormdataDetails(response.data[0]);
				if (response.data[0] && response.data[0].property.endat != null) {
					setHideInput(true);
				} else {
					setHideInput(false);
				}
			}
		} catch (error) {
			console.log(`error`, error);
		}
	}

	//first time chat initial chat to call funaction
	const firstTimeChatByIdService = async (id) => {
		const response = await FindChatById(id);
		try {
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				setFormdataDetails(response.data[0]);
			}
		} catch (error) {
			console.log(`error`, error);
		}
	}

	//call feedback form open
	const feedBack = async () => {
		if (!rating && !feedback) {
			return;
		}

		const body = {
			formid: formdataDetails.formid._id,
			contextid: formdataDetails.property.consultantid._id,
			addedby: sender,
			property: {
				rating: rating,
				feedback: feedback
			}
		}

		if (rating != null && feedback != null) {
			try {
				const response = await FeedBackService(body);
				console.log(`response`, response);
				if (response.data != null && response.data != 'undefind' && response.status == 200) {
					props.navigation.navigate(SCREEN.HOMESCREEN);
				}
			} catch (error) {
				console.log(`error`, error);
			}
		}
	}

	//end chat menu click to call function
	const onpressDoneBtn = async () => {
		feedBack();
		let endtime = moment().format();
		var minsDiff = moment.utc(moment(endtime, "HH:mm:ss").diff(moment(formdataDetails.property.startat, "HH:mm:ss"))).format("mm")
		var charges = getUser.property.chargespermin;
		const body = {
			formid: '60939df914f2d062cc132d68',
			contextid: formdataDetails.contextid._id,
			onModel: 'User',
			property: {
				startat: formdataDetails.property.startat,
				endat: endtime,
				consultantid: formdataDetails.property.consultantid._id,
				chargable: formdataDetails.property.chargable,
				category: formdataDetails.property.category,
				subcategory: formdataDetails.property.subcategory
			}
		}

		let generateBill = {
			"customerid": sender,
			"onModel": "Member",
			"billdate": moment().format(),
			"amount": charges * minsDiff,
			"totalamount": charges * minsDiff,
			"taxes": [],
			"balance": charges * minsDiff,
			"paidamount": 0,
			"type": "Walletspent",
			"property": {
				consultantid: consultanDetails._id,
				chatrefid: formDataId
			},
			"items": [{
				"item": {
					"_id": "60a2236e48c98c3638e8b2ac",
					"sale": {
						"taxes": [],
						"rate": charges
					}
				},
				"sale": {
					"taxes": [],
					"rate": charges
				},
				"quantity": charges * minsDiff,
				"cost": minsDiff,
				"totalcost": charges * minsDiff
			}]
		}

		try {
			const response = await EndChatService(formDataId, body);
			const billResponse = await BillService(generateBill);
			console.log(`billResponse.data`, billResponse.data);

			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				if (billResponse.data != null && billResponse.data != 'undefind' && billResponse.status == 200) {
					setshowshowEndChatModel(false);
					setfilterModalVisible(false);
					showModalVisible(false);
					if (Platform.OS === 'android') {
						ToastAndroid.show('Your Chat Is Closed', ToastAndroid.SHORT);
					} else {
						alert('Your Chat Is Closed');
					}

					props.navigation.navigate(SCREEN.HOMESCREEN);
				}
			}
		} catch (error) {
			console.log(`error`, error);
			if (Platform.OS === 'android') {
				ToastAndroid.show('Your Chat Is Not Closed', ToastAndroid.SHORT);
			} else {
				alert('Your Chat Is Not Closed');
			}
		}
	}

	//check end chat or not
	const EndChat = () => (
		<View style={{ alignItems: 'center', margin: 5 }}>
			<Text style={{ fontSize: 14, color: '#000000' }}>{`Your Chat is close in this Date ${formdataDetails && moment(formdataDetails.property.endat).format("MMM Do YYYY")}`}</Text>
			<Text style={{ fontSize: 14, color: '#000000' }}>{`and time ${formdataDetails && moment(formdataDetails.property.endat).format('LTS')}`}</Text>
		</View>
	)

	//check project time error message
	const setTimeCheck = (time) => {
		if (!time || time <= 0) {
			return setProjectTimeError('project time cannot be empty');
		}
		setProjectTime(time);
		setProjectTimeError(null);
		return;
	}

	//check project consultant Mobile error message
	const setMobileCheck = (mobile_number) => {
		const reg = /^\d{10}$/;
		if (!mobile_number || mobile_number.length <= 0) {
			setProjectMobile(null);
			setProjectMobileError('Mobile Number cannot be empty');
			return;
		}
		if (!reg.test(mobile_number)) {
			setProjectMobile(null);
			setProjectMobileError('Ooops! We need a valid Mobile Number');
			return;
		}
		setProjectMobile(mobile_number);
		setProjectMobileError(null);
		return;
	}

	//check project description error message
	const setDescriptionCheck = (projectdesc) => {
		if (!projectdesc || projectdesc <= 0) {
			return setProjectdescError('project desc cannot be empty');
		}
		setProjectdesc(projectdesc);
		setProjectdescError(null);
		return;
	}

	//start project submit button click to call
	const projectStart = async () => {
		if (!projectMobile || !projectTime || !projectdesc) {
			setTimeCheck(projectTime);
			setMobileCheck(projectMobile);
			setDescriptionCheck(projectdesc);
			return;
		}

		const body = {
			formid: '60a2233ddc53910facbc82d0',
			contextid: sender,
			onModel: 'Member',
			property: {
				time: projectTime,
				mobile_number: projectMobile,
				description: projectdesc
			}
		}
		try {
			const response = await StartProject(body);
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				showModalVisibleSubmit(!showStartProjectVisible)
				//props.navigation.navigate(SCREEN.HOMESCREEN);
			}
		} catch (error) {
			console.log(`error`, error);
		}
	}

	//on touch to open time picker
	const showTimePicker = () => {
		setIsTimePickerVisibility(true);
	};

	//on touch cancel btn to close time picker
	const hideTimePicker = () => {
		setIsTimePickerVisibility(false);
	};

	//time picker in submit to select date
	const handleConfirmTime = (time) => {
		let datetime = moment(time).format()
		setProjectTime(datetime);
		hideTimePicker();
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden backgroundColor='#FFB629' barStyle='light-content' />
			<View style={styles.headerstyle}>
				<View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
						<TouchableOpacity onPress={() => props.navigation.goBack(null)}>
							<AntDesign name='arrowleft' color='#FFFFFF' size={24} />
						</TouchableOpacity>
					</View>
					<Image
						source={{ uri: consultanDetails ? consultanDetails.profilepic !== null && consultanDetails.profilepic ? consultanDetails.profilepic : noProfile : null }}
						style={{ width: 50, height: 50, borderRadius: 100, marginLeft: -140 }}
					/>

					<View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginLeft: -150 }}>
						<Text style={{ fontSize: 18, color: '#FFFFFF', textTransform: 'capitalize' }}>{consultanDetails.fullname.split(' ')[0]}</Text>
						<Text style={{ fontSize: 12, color: '#000000', marginLeft: -20 }}>Online</Text>
					</View>
					<View style={{ justifyContent: 'flex-end', marginRight: 20 }}>
						<TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.HOMESCREEN)}>
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
						<MaterialCommunityIcons name='dots-vertical-circle' size={30} color='#FFFFFF' />
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
						//renderDay={renderDay}
						minInputToolbarHeight={80}
						renderInputToolbar={hideInput ? () => <EndChat /> : renderInputToolbar}
					/>
				</View>
				<View style={{ marginBottom: 50 }} />
			</ScrollView>

			{/* start project model Pop */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={showStartProjectVisible}
				onRequestClose={() => { showModalVisible(!showStartProjectVisible) }}
			>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<View style={{ position: 'absolute', bottom: 20 }}>
						<View style={styles.modalView}>
							<View style={{ marginTop: 20 }} />
							<View style={projectTimeError == null ? styles.inputView : styles.inputViewError}>
								<TextInput
									style={styles.TextInput}
									placeholder='Best time to call'
									type='clear'
									returnKeyType='next'
									placeholderTextColor='#999999'
									defaultValue={projectTime && moment(projectTime).format('LT')}
									blurOnSubmit={false}
									onTouchStart={() => showTimePicker()}
									onSubmitEditing={() => secondTextInputRef.current.focus()}
									onChangeText={(time) => setTimeCheck(time)}
								/>
								<DateTimePickerModal
									isVisible={isTimePickerVisibility}
									mode="time"
									onConfirm={handleConfirmTime}
									onCancel={hideTimePicker}
								/>
								<TouchableOpacity onPress={() => showTimePicker()}>
									<Ionicons name='time-outline' size={24} color='#000000' style={{ marginRight: 5 }} />
								</TouchableOpacity>
							</View>
							<View style={projectMobileError == null ? styles.inputView : styles.inputViewError}>
								<TextInput
									style={styles.TextInput}
									placeholder='your Phone Number'
									type='clear'
									returnKeyType='next'
									placeholderTextColor='#999999'
									keyboardType='number-pad'
									defaultValue={projectMobile}
									blurOnSubmit={false}
									ref={secondTextInputRef}
									onSubmitEditing={() => thirdTextInputRef.current.focus()}
									onChangeText={(mobile) => setMobileCheck(mobile)}
								/>
							</View>
							<View style={projectdescError == null ? styles.textAreainputView : styles.textAreainputViewError}>
								<TextInput
									style={styles.TextareaInput}
									placeholder='Project Brief'
									type='clear'
									returnKeyType='done'
									placeholderTextColor='#999999'
									blurOnSubmit={false}
									numberOfLines={3}
									multiline={true}
									defaultValue={projectdesc}
									ref={thirdTextInputRef}
									onSubmitEditing={() => Keyboard.dismiss()}
									onChangeText={(description) => setDescriptionCheck(description)}
								/>
							</View>
						</View>
						<View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
							<TouchableOpacity
								onPress={() => projectStart()}
								style={styles.savebtn}
							>
								<Text style={{ fontSize: 14, color: '#FFFFFF' }}>Submit</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => showModalVisible(!showStartProjectVisible)}
								style={styles.cancelbtn}
							>
								<Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* Filter model Pop */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={filterModalVisible}
				onRequestClose={() => { setFilterModalVisible(!filterModalVisible) }}
			>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<View style={{ position: 'absolute', bottom: 20 }}>
						<View style={styles.modalView}>
							<TouchableOpacity onPress={() => setshowshowEndChatModel(true)}>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>End Chat</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>
									Report an issue
						</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Dispute </Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Rate</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Check spend</Text>
							</TouchableOpacity>
						</View>

						<View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							<TouchableOpacity
								onPress={() => { setFilterModalVisible(!filterModalVisible) }}
								style={styles.cancelbtn}
							>
								<Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* message model Pop */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={showMessageModalVisible}
				onRequestClose={() => { showMessageModalVisible(!showMessageModalVisible) }}
			>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<View style={{ position: 'absolute', bottom: 20 }}>
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
				</View>
			</Modal>

			{/* end chat Model pop up */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={showEndChatModel}
				onRequestClose={() => { showModalVisible(!showStartProjectVisible) }}
			>
				<ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
					<View style={styles.centerView}>
						<View style={styles.EndChatModalView}>
							<View style={{ marginTop: 10 }} />
							<View style={styles.messageModalView}>
								<Text style={{ marginTop: 10, fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' }}>Thank You</Text>
								<Text style={{ marginTop: 10, fontSize: 14, color: '#FFFFFF' }}>Your chat with {consultanDetails.fullname},</Text>
								<Text style={{ fontSize: 14, color: '#FFFFFF' }}>ended. I hope it was nice</Text>
								<Text style={{ fontSize: 14, color: '#FFFFFF' }}> experience for you.</Text>
							</View>

							<View style={{ margin: 10, alignItems: 'center' }} >
								<Text style={{ fontSize: 12, color: '#4D4D4D' }}> Your feedback can help {consultanDetails.fullname},all other </Text>
								<Text style={{ fontSize: 12, color: '#4D4D4D' }}> people who have same questions like you.</Text>
							</View>

							<Pressable onPress={() => onTouchViewProfile()}
								style={styles.profileImageView}>
								<Image source={{ uri: consultanDetails ? consultanDetails.profilepic !== null && consultanDetails.profilepic ? consultanDetails.profilepic : noProfile : null }}
									style={styles.profileImage}
								/>
							</Pressable>

							<View style={{ margin: 10, alignItems: 'center' }} >
								<Text style={{ fontSize: 16, color: '#000000', textTransform: 'capitalize', fontWeight: 'bold' }}> {consultanDetails.fullname} </Text>
								<Text style={{ fontSize: 12, color: '#000000' }}>Design Coach</Text>
							</View>

							<StarRating
								disabled={false}
								maxStars={5}
								starSize={25}
								rating={rating}
								fullStarColor={'#C4C4C4'}
								emptyStarColor={'#000000'}
								selectedStar={(rating) => setRating(rating)}
							/>

							<View style={styles.commectView}>
								<TextInput
									style={styles.TextareaInput}
									placeholder='Your Comments'
									type='clear'
									returnKeyType='done'
									placeholderTextColor='#999999'
									blurOnSubmit={false}
									numberOfLines={3}
									multiline={true}
									defaultValue={feedback}
									onChangeText={(val) => setFeedback(val)}
								/>
							</View>
							<View style={{ margin: 20 }}>
								<TouchableOpacity
									onPress={() => { onpressDoneBtn(false) }}
									style={styles.doneBtn}
								>
									<Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Done</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</Modal>
			{ loading ? <Loader /> : null}
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
		height: HEIGHT - 200,
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
		marginLeft: 10,
		width: WIDTH / 3,
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
		width: WIDTH / 3,
		height: 35,
		marginRight: 10,
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
	inputViewError: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F4F4F4',
		borderWidth: 0.5,
		borderColor: '#FF0000',
		width: WIDTH - 120,
		height: 40,
		borderRadius: 5,
		marginBottom: 20,
		borderWidth: 1
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
	textAreainputViewError: {
		flexDirection: 'row',
		backgroundColor: '#F4F4F4',
		borderWidth: 0.5,
		borderColor: '#FF0000',
		width: WIDTH - 120,
		height: 100,
		borderRadius: 5,
		borderWidth: 1
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
	},
	EndChatModalView: {
		marginTop: 10,
		height: HEIGHT - 80,
		width: WIDTH - 40,
		borderRadius: 20,
		backgroundColor: 'white',
		alignItems: 'center',
	},
	messageModalView: {
		marginTop: 10,
		height: 140,
		width: WIDTH - 90,
		borderRadius: 40,
		backgroundColor: '#5AC8FA',
		alignItems: 'center',
		shadowColor: '#000000',
	},
	profileImageView: {
		marginTop: 5,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		width: 100,
		height: 100,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
		borderRadius: 100,
		borderColor: '#000000'
	},
	profileImage: {
		borderRadius: 100,
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		width: 90,
		height: 90
	},
	commectView: {
		marginTop: 5,
		flexDirection: 'row',
		backgroundColor: '#F4F4F4',
		borderWidth: 0.5,
		borderColor: '#000000',
		width: WIDTH - 120,
		height: HEIGHT / 6,
		borderRadius: 5
	},
	doneBtn: {
		width: WIDTH / 2,
		height: 45,
		backgroundColor: '#5AC8FA',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#5EA2FC',
		borderWidth: 0.5
	},
});
