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
import { BillService, BillPaymentService, WalletRefershService } from '../../services/BillService/BillService';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import MyPermissionController from '../../helpers/appPermission';
import { DisputeChatAdd } from '../../services/DisputeChatService/DisputeChatService';
import HelpSupportService from '../../services/HelpSupportService/HelpSupportService';

const chatScreen = (props, { navigation }) => {
	const consultanDetails = props.route.params.consultanDetails;
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
	const [rate, setrate] = useState(false);
	const [rating, setRating] = useState(null);
	const [feedback, setFeedback] = useState(null);
	const [projectTime, setProjectTime] = useState(null);
	const [projectTimeError, setProjectTimeError] = useState(null);
	const [projectdesc, setProjectdesc] = useState(null);
	const [projectdescError, setProjectdescError] = useState(null);
	const [projectMobile, setProjectMobile] = useState(null);
	const [projectMobileError, setProjectMobileError] = useState(null);
	const [isTimePickerVisibility, setIsTimePickerVisibility] = useState(false);
	const [showDisputeChatVisible, setShowDisputeChatVisible] = useState(false);
	const secondTextInputRef = React.createRef();
	const thirdTextInputRef = React.createRef();
	const fourTextInputRef = React.createRef();
	const [disputechatdesc, setDisputechatdesc] = useState(null);
	const [disputechatdescError, setDisputechatdescError] = useState(null);
	const [disputechatsubject, setDisputechatsubject] = useState(null);
	const [disputechatsubjectError, setDisputechatsubjectError] = useState(null);
	const [disputeImage, setdisputeImage] = useState(null);
	const [showHelpSupportModel, setShowHelpSupportModel] = useState(false);
	const [showHelpSupportMessageModel, setShowHelpSupportMessageModel] = useState(false);
	const [reportSubject, setReportSubject] = useState(null);
	const [reportSubjectError, setReportSubjectError] = useState(null);
	const [reportDesc, setReportDesc] = useState(null);
	const [reportDescError, setReportDescError] = useState(null);
	const [timeoutModelVisible, setTimeoutModelVisible] = useState(false);
	let formId;

	// chat portion
	useEffect(
		() => {
			checkPermission();
			AsyncStorage.getItem(AUTHUSER).then((res) => {
				let sender = JSON.parse(res)._id;
				axiosConfig(sender);
				setsender(sender);
				setloading(true);
				newChat(sender, consultanDetails).then((id) => {
					//console.log("chat docs id", id);
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

	useEffect(() => {
	}, [formDataId, formdataDetails, hideInput, rating, feedback, sender, rate, chatId,
		projectTime, projectTimeError, projectdesc, projectdescError, projectMobile, projectMobileError,
		disputechatdesc, disputechatdescError, disputechatsubject, disputechatsubjectError, disputeImage,
		reportSubject, reportSubjectError, reportDesc, reportDescError
	])

	const wait = (timeout) => {
		return new Promise(resolve => {
			setTimeout(resolve, timeout);
		});
	}

	//2 minutes complate to call funtion
	const oncheckIdelTimeOut = async () => {
		wait(30000).then(() => {
			setTimeoutModelVisible(true);
			wait(5000).then(async () => {
				await nowAutoEndChat();
			});
		});
	}

	//check permission 
	const checkPermission = () => {
		setTimeout(
			() => {
				MyPermissionController.checkAndRequestStoragePermission()
					.then((granted) => console.log('>Storage Permission Granted'))
					.catch((err) => console.log(err))
			},
			500
		);
	}

	//UPLOAD DISPUTE CHAT CLICK TO CALL FUNCTION
	const onUploadDisputeChat = () => {
		handlePicker();
	}

	//IMAGE CLICK TO GET CALL FUNCTION
	const handlePicker = () => {
		ImagePicker.showImagePicker({}, (response) => {
			if (response.didCancel) {
				setloading(false);
				// console.log('User cancelled image picker');
			} else if (response.error) {
				setloading(false);
				// console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				setloading(false);
				//  console.log('User tapped custom button: ', response.customButton);
			} else {
				setloading(true);
				onPressUploadFile(response);
			}
		});
	};

	//Upload Cloud storage function
	const onPressUploadFile = async (fileObj) => {
		if (fileObj != null) {
			const realPath = Platform.OS === 'ios' ? fileObj.uri.replace('file://', '') : fileObj.uri;
			await RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/dlopjt9le/upload', { 'Content-Type': 'multipart/form-data' },
				[{ name: 'file', filename: Platform.OS === 'ios' ? fileObj.fileSize : fileObj.fileName, type: fileObj.type, data: RNFetchBlob.wrap(decodeURIComponent(realPath)) },
				{ name: 'upload_preset', data: 'gs95u3um' }])
				.then(response => response.json())
				.then(data => {
					setloading(false);
					if (data && data.url) {
						setdisputeImage(data.url);
					}
				}).catch(error => {
					setloading(false);
					alert("Uploading Failed!");
				})
		} else {
			setloading(false);
			alert('Please Select File');
		}
	}

	//check validation of subject
	const setReportSubjectCheck = (subject) => {
		if (!subject || subject <= 0) {
			return setReportSubjectError('subject cannot be empty');
		}
		setReportSubject(subject);
		setReportSubjectError(null);
		return;
	}

	//check validation of description
	const setReportDescriptionCheck = (description) => {
		if (!description || description <= 0) {
			return setReportDescError('description cannot be empty');
		}
		setReportDesc(description);
		setReportDescError(null);
		return;
	}

	//check disputechat description error message
	const setDisputechatDescCheck = (disputechatdesc) => {
		if (!disputechatdesc || disputechatdesc <= 0) {
			return setDisputechatdescError('disputechat desc cannot be empty');
		}
		setDisputechatdesc(disputechatdesc);
		setDisputechatdescError(null);
		return;
	}

	//check disputechat subject error message
	const setDisputechatsubjectCheck = (disputechatsubject) => {
		if (!disputechatsubject || disputechatsubject <= 0) {
			return setDisputechatsubjectError('disputechat desc cannot be empty');
		}
		setDisputechatsubject(disputechatsubject);
		setDisputechatsubjectError(null);
		return;
	}

	const startChat = async (sender, item) => {
		const body = {
			formid: '608a5d7ebbeb5b2b03571f2c',
			contextid: sender,
			onModel: "Member",
			property: {
				consultantid: item,
				chargable: false,
				category: consultanDetails.property.livechat,
				subcategory: consultanDetails.property.skill
			}
		}
		try {
			const response = await StartChatService(body);
			if (response.data != null && response.data != 'undefind' && response.status === 200) {
				setFormdataDetails(response.data);
				formId = response.data._id;
				setFormDataId(response.data._id);
				firstTimeChatByIdService(response.data._id);
			}
		}
		catch (error) {
			console.log(`error`, error);
			setloading(false);
		}
	}

	//new chat inite
	const newChat = async (sender, item) => {
		let getChatId = firestore().collection('chat');
		let snap = await getChatId.where('member', 'in', [[sender, item._id]]).get();
		if (snap.empty) {
			let snap2 = await getChatId.where('member', 'in', [[item._id, sender]]).get();
			if (snap2.empty) {
				await startChat(sender, item._id);
				let ref = await getChatId.add({
					member: [sender, item._id],
					createdAt: '',
					previewMessage: '',
					formid: formId,
					memberid: sender,
					userid: item._id
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

	//send btn click to send message 
	const onSend = useCallback((messages = []) => {
		if (formdataDetails && formdataDetails.property && formdataDetails.property.startat == undefined && formdataDetails.property.startat == null) {
			updateChatId();
			oncheckIdelTimeOut();
		}
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

	//open - close model popup
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
		//setshowStartProjectVisible(visible);
		setshowshowEndChatModel(false);
	};

	const showModalVisibleSubmit = (visible) => {
		setshowStartProjectVisible(visible);
		setshowMessageModalVisible(true);
	};

	//current chat in find chat is end or not
	const FindChatByIdService = async (id) => {
		const response = await FindChatById(id);
		try {
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				setFormDataId(response.data[0]._id);
				setFormdataDetails(response.data[0]);
				if (response.data[0] && response.data[0].property.endat != null) {
					setHideInput(true);
				} else {
					oncheckIdelTimeOut();
					setHideInput(false);
				}
			}
		} catch (error) {
			setloading(false);
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
			//console.log(`error`, error);
		}
	}

	//call feedback form open
	const feedBack = async () => {
		const body = {
			formid: '60939df914f2d062cc132d68',
			contextid: formdataDetails.property.consultantid._id,
			addedby: sender,
			property: {
				rating: rating,
				feedback: feedback
			}
		}
		if (rating || feedback) {
			try {
				const response = await FeedBackService(body);
				if (response.data != null && response.data != 'undefind' && response.status == 200) {
					setrate(false);
					setRating(null);
					setFeedback(null);
					setshowshowEndChatModel(false);
					props.navigation.navigate(SCREEN.HOMESCREEN);
				}
			} catch (error) {
				console.log(`error`, error);
			}
		} else {
			setshowshowEndChatModel(false);
			props.navigation.navigate(SCREEN.HOMESCREEN);
		}
	}

	//update chat id
	const updateChatId = async () => {
		const body = {
			formid: '608a5d7ebbeb5b2b03571f2c',
			contextid: formdataDetails.contextid._id,
			onModel: 'Member',
			property: {
				startat: moment().format(),
				consultantid: formdataDetails.property.consultantid,
				chargable: true,
				category: formdataDetails.property.category,
				subcategory: formdataDetails.property.subcategory
			}
		}
		try {
			const response = await EndChatService(formdataDetails._id, body);
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				setFormdataDetails(response.data);
				if (Platform.OS === 'android') {
					ToastAndroid.show('Your Chat Is Start', ToastAndroid.SHORT);
				} else {
					alert('Your Chat Is Start');
				}
			}
		} catch (error) {
			console.log(`error`, error);
			setloading(false);
			if (Platform.OS === 'android') {
				ToastAndroid.show('Your Chat Is Start', ToastAndroid.SHORT);
			} else {
				alert('Your Chat Is Not Closed');
			}
		}
	}

	//end chat menu click to call function
	const nowAutoEndChat = async () => {
		let endtime = moment().format();
		var minsDiff = moment.utc(moment(endtime, "HH:mm:ss").diff(moment(formdataDetails.property.startat, "HH:mm:ss"))).format("mm")
		var charges = formdataDetails.property.consultantid.property.chargespermin;
		const body = {
			formid: '608a5d7ebbeb5b2b03571f2c',
			contextid: formdataDetails.contextid._id,
			onModel: 'Member',
			property: {
				startat: formdataDetails.property.startat,
				endat: endtime,
				consultantid: formdataDetails.property.consultantid._id,
				chargable: formdataDetails.property.chargable,
				category: formdataDetails.property.category,
				subcategory: formdataDetails.property.subcategory,
				totalcost: charges * minsDiff,
				totalminutechat: minsDiff,
				consultanminutecharge: charges
			}
		}
		console.log(`body`, body);
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
				"quantity": minsDiff,
				"cost": charges * minsDiff,
				"totalcost": charges * minsDiff
			}]
		}
		console.log(`generateBill`, generateBill);
		try {
			const response = await EndChatService(formDataId, body);
			const billResponse = await BillService(generateBill);

			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				if (billResponse.data != null && billResponse.data != 'undefind' && billResponse.status == 200) {
					let billpayment = {
						"customerid": sender,
						"onModel": "Member",
						"paymentdate": moment().format(),
						"billid": billResponse.data._id,
						"amount": charges * minsDiff,
						"totalamount": charges * minsDiff,
						"paidamount": 0,
						"walletamount": charges * minsDiff
					}
					const billPaymentResponse = await BillPaymentService(billpayment);
					if (billPaymentResponse.data != null && billPaymentResponse.data != 'undefind' && billPaymentResponse.status == 200) {
						let walletbody = {
							"txntype": "Cr",
							"txnref": `Earning for bill ${billPaymentResponse.data.prefix}-${billPaymentResponse.data.receiptnumber}`,
							"value": (charges * minsDiff) / 2,
							"customerid": formdataDetails.property.consultantid._id,
							"onModel": "User",
							"txndate": moment().format()
						}
						const response1 = await WalletRefershService(walletbody);
						if (response1.data != null && response1.data != 'undefind' && response1.status === 200) {
							let walletbody2 = {
								"txntype": "Cr",
								"txnref": `Earning for bill ${billPaymentResponse.data.prefix}-${billPaymentResponse.data.receiptnumber}`,
								"value": (charges * minsDiff) / 2,
								"customerid": "6054990599e17f5b4c4bb112",
								"onModel": "User",
								"txndate": moment().format()
							}
							const response2 = await WalletRefershService(walletbody2);
							if (response2.data != null && response2.data != 'undefind' && response2.status === 200) {
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
					}
				}
			}
		}
		catch (error) {
			console.log(`error`, error);
			if (Platform.OS === 'android') {
				ToastAndroid.show('Your Chat Is Not Closed', ToastAndroid.SHORT);
			} else {
				alert('Your Chat Is Not Closed');
			}
		}
	}

	//end chat menu click to call function
	const onpressDoneBtn = async () => {
		await feedBack();
		let endtime = moment().format();
		var minsDiff = moment.utc(moment(endtime, "HH:mm:ss").diff(moment(formdataDetails.property.startat, "HH:mm:ss"))).format("mm")
		console.log(`minsDiff`, minsDiff);
		var charges = formdataDetails.property.consultantid.property.chargespermin;
		const body = {
			formid: '608a5d7ebbeb5b2b03571f2c',
			contextid: formdataDetails.contextid._id,
			onModel: 'Member',
			property: {
				startat: formdataDetails.property.startat,
				endat: endtime,
				consultantid: formdataDetails.property.consultantid._id,
				chargable: formdataDetails.property.chargable,
				category: formdataDetails.property.category,
				subcategory: formdataDetails.property.subcategory,
				totalcost: charges * minsDiff,
				totalminutechat: minsDiff,
				consultanminutecharge: charges
			}
		}
		console.log(`body`, body);
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
				"quantity": minsDiff,
				"cost": charges * minsDiff,
				"totalcost": charges * minsDiff
			}]
		}
		console.log(`generateBill`, generateBill);
		try {
			const response = await EndChatService(formDataId, body);
			const billResponse = await BillService(generateBill);

			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				if (billResponse.data != null && billResponse.data != 'undefind' && billResponse.status == 200) {
					let billpayment = {
						"customerid": sender,
						"onModel": "Member",
						"paymentdate": moment().format(),
						"billid": billResponse.data._id,
						"amount": charges * minsDiff,
						"totalamount": charges * minsDiff,
						"paidamount": 0,
						"walletamount": charges * minsDiff
					}
					const billPaymentResponse = await BillPaymentService(billpayment);
					if (billPaymentResponse.data != null && billPaymentResponse.data != 'undefind' && billPaymentResponse.status == 200) {
						let walletbody = {
							"txntype": "Cr",
							"txnref": `Earning for bill ${billPaymentResponse.data.prefix}-${billPaymentResponse.data.receiptnumber}`,
							"value": (charges * minsDiff) / 2,
							"customerid": formdataDetails.property.consultantid._id,
							"onModel": "User",
							"txndate": moment().format()
						}
						const response1 = await WalletRefershService(walletbody);
						if (response1.data != null && response1.data != 'undefind' && response1.status === 200) {
							let walletbody2 = {
								"txntype": "Cr",
								"txnref": `Earning for bill ${billPaymentResponse.data.prefix}-${billPaymentResponse.data.receiptnumber}`,
								"value": (charges * minsDiff) / 2,
								"customerid": "6054990599e17f5b4c4bb112",
								"onModel": "User",
								"txndate": moment().format()
							}
							const response2 = await WalletRefershService(walletbody2);
							if (response2.data != null && response2.data != 'undefind' && response2.status === 200) {
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
					}
				}
			}
		}
		catch (error) {
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
			}
		} catch (error) {
			//console.log(`error`, error);
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

	//DisputeChat Submit 
	const disputechatSubmit = async () => {
		setloading(true);
		if (!disputechatsubject || !disputechatdesc) {
			setDisputechatsubjectCheck(disputechatsubject);
			setDisputechatDescCheck(disputechatdesc);
			setloading(false);
			return;
		}

		if (disputeImage == null) {
			alert('Please Upload Image');
			setloading(false);
			return;
		}

		let body = {
			"attachments": [
				{
					"attachment": disputeImage,
					"extension": "jpg",
					"originalfilename": "disputeChat-image"
				}
			],
			"customerid": sender,
			"subject": disputechatsubject,
			"onModel": "Member",
			"category": "Dispute",
			"content": disputechatdesc
		}
		try {
			const response = await DisputeChatAdd(body);
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				setShowDisputeChatVisible(!showDisputeChatVisible);
				setDisputechatdesc(null);
				setDisputechatdescError(null);
				setDisputechatsubject(null);
				setDisputechatsubjectError(null);
				setdisputeImage(null);
				setloading(false);
			}
		} catch (error) {
			setloading(false);
			//console.log(`error`, error);
		}
	}

	//help model pop up submit button touch to called
	const onPressReportIssues = async () => {
		if (!reportDesc || !reportSubject) {
			setReportSubjectCheck(reportSubject);
			setReportDescriptionCheck(reportDesc);
			return;
		}
		const body = {
			'status': 'Requested',
			'subject': reportSubject,
			'customerid': sender,
			'onModel': 'Member',
			'category': 'System Enhancements',
			'content': reportDesc
		}
		try {
			const response = await HelpSupportService(body);
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				setloading(false);
				setShowHelpSupportModel(false);
				setShowHelpSupportMessageModel(true);
				setReportSubject(null);
				setReportSubjectError(null);
				setReportDesc(null);
				setReportDescError(null);
			}
		}
		catch (error) {
			setloading(false);
			// if (Platform.OS === 'android') {
			// 	ToastAndroid.show('Message Sending Failed!', ToastAndroid.SHORT);
			// } else {
			// 	alert('Message Sending Failed!');
			// }
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden backgroundColor='#FFB629' barStyle='light-content' />
			<View style={styles.headerstyle}>
				<View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 30 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
						<TouchableOpacity onPress={() => props.navigation.goBack(null)}>
							<AntDesign name='arrowleft' color='#FFFFFF' size={24} />
						</TouchableOpacity>
						<Image
							source={{ uri: consultanDetails ? consultanDetails.profilepic !== null && consultanDetails.profilepic ? consultanDetails.profilepic : noProfile : null }}
							style={{ width: 50, height: 52, borderRadius: 100, marginLeft: 5 }}
						/>

						<View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', marginLeft: 10 }}>
							<Text style={{ fontSize: 18, color: '#FFFFFF', textTransform: 'capitalize' }}>{consultanDetails.fullname.split(' ')[0]}</Text>
							<Text style={{ fontSize: 12, color: '#000000', marginLeft: 0 }}>
								{formdataDetails && formdataDetails.property && formdataDetails.property.consultantid && formdataDetails.property.consultantid.property && formdataDetails.property.consultantid.property.live ? 'Online' : 'Ofline'}
							</Text>
						</View>
					</View>

					<View style={{ justifyContent: 'flex-end', marginRight: 20 }}>
						<TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.HOMESCREEN)}>
							<Image source={require('../../assets/Images/homeicon.png')} style={{ height: 30, width: 30 }} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -5, marginLeft: 20, marginRight: 20 }}>
					<TouchableOpacity
						onPress={() => setshowStartProjectVisible(true)}
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
						keyboardShouldPersistTaps={'always'}
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
			</ScrollView>

			{/* start project model Pop */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={showStartProjectVisible}
				onRequestClose={() => { setshowStartProjectVisible(!showStartProjectVisible) }}
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
									placeholder='Your Phone Number'
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
								onPress={() => setshowStartProjectVisible(!showStartProjectVisible)}
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
							<TouchableOpacity onPress={() => setshowshowEndChatModel(true)} disabled={hideInput}>
								<Text style={{ padding: 15, textAlign: 'center', color: hideInput ? '#999999' : '#000000' }}>End Chat</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity onPress={() => { setFilterModalVisible(!filterModalVisible), setShowHelpSupportModel(true) }}>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>
									Report an issue
								</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity onPress={() => { setFilterModalVisible(!filterModalVisible), setShowDisputeChatVisible(true) }}>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Dispute</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity onPress={() => { setrate(true), setshowshowEndChatModel(true) }}>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Rate</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity onPress={() => { setfilterModalVisible(false), props.navigation.navigate(SCREEN.MYSPENDSSCREEN) }}>
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

			{/* Dispute chat model Pop */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={showDisputeChatVisible}
				onRequestClose={() => { setShowDisputeChatVisible(!showDisputeChatVisible) }}
			>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<View style={{ position: 'absolute', bottom: 20 }}>
						<View style={styles.disputeModalView}>
							<Text style={{ fontSize: 14, marginTop: 15 }}>Are you sure ,you want raise dispute</Text>
							<Text style={{ fontSize: 14, marginTop: 0 }}>for select chats</Text>
							<View style={{ marginTop: 10 }} />
							<View style={disputechatsubjectError == null ? styles.inputView : styles.inputViewError}>
								<TextInput
									style={styles.TextInput}
									placeholder='Subject'
									type='clear'
									returnKeyType='next'
									placeholderTextColor='#999999'
									defaultValue={disputechatsubject}
									blurOnSubmit={false}
									onSubmitEditing={() => fourTextInputRef.current.focus()}
									onChangeText={(sub) => setDisputechatsubjectCheck(sub)}
								/>
							</View>
							<View style={disputechatdescError == null ? styles.textAreainputView : styles.textAreainputViewError}>
								<TextInput
									style={styles.TextareaInput}
									placeholder='Description'
									type='clear'
									returnKeyType='done'
									placeholderTextColor='#999999'
									blurOnSubmit={false}
									numberOfLines={3}
									multiline={true}
									defaultValue={disputechatdesc}
									ref={fourTextInputRef}
									onSubmitEditing={() => Keyboard.dismiss()}
									onChangeText={(desc) => setDisputechatDescCheck(desc)}
								/>
							</View>
							<View style={{ marginTop: 10 }} />
							<TouchableOpacity
								onPress={() => onUploadDisputeChat()}
								style={styles.savebtn}
							>
								<Text style={{ fontSize: 14, color: '#FFFFFF' }}>Upload Photo</Text>
							</TouchableOpacity>
						</View>
						<View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
							<TouchableOpacity
								onPress={() => disputechatSubmit()}
								style={styles.yesbtn}
							>
								<Text style={{ fontSize: 14, color: '#FFFFFF' }}>Yes</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									setShowDisputeChatVisible(!showDisputeChatVisible),
										setDisputechatdesc(null),
										setDisputechatdescError(null),
										setDisputechatsubject(null),
										setDisputechatsubjectError(null),
										setdisputeImage(null)
								}}
								style={styles.nobtn}
							>
								<Text style={{ fontSize: 14, color: '#000000' }}>No</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* report issues model Pop */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={showHelpSupportModel}
				onRequestClose={() => setShowHelpSupportModel(!showHelpSupportModel)}
			>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<View style={{ position: 'absolute', bottom: 20 }}>
						<View style={styles.helpSupportModalView}>
							<View style={{ marginTop: 20 }}></View>
							<View style={reportSubjectError == null ? styles.inputView : styles.inputViewError}>
								<TextInput
									style={styles.TextInput}
									placeholder='Subject'
									type='clear'
									returnKeyType='next'
									placeholderTextColor='#999999'
									defaultValue={reportSubject}
									blurOnSubmit={false}
									onSubmitEditing={() => secondTextInputRef.current.focus()}
									onChangeText={(subject) => setReportSubjectCheck(subject)}
								/>
							</View>
							<View style={reportDescError == null ? styles.textAreainputView : styles.textAreainputViewError}>
								<TextInput
									style={styles.TextareaInput}
									placeholder='Write Your Descripation'
									type='clear'
									returnKeyType='done'
									placeholderTextColor='#999999'
									blurOnSubmit={false}
									numberOfLines={3}
									multiline={true}
									defaultValue={setReportDesc}
									ref={secondTextInputRef}
									onChangeText={(description) => setReportDescriptionCheck(description)}
								/>
							</View>
						</View>
						<View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<TouchableOpacity onPress={() => onPressReportIssues()}
								style={styles.savebtn}>
								<Text style={{ fontSize: 14, color: '#FFFFFF' }}>Submit</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {
								setReportSubject(null),
									setReportSubjectError(null),
									setReportDesc(null),
									setReportDescError(null),
									setShowHelpSupportModel(false)
							}}
								style={styles.cancelbtn}>
								<Text style={{ fontSize: 14, color: '#000000' }}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* help support message model Pop */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={showHelpSupportMessageModel}
				onRequestClose={() => setShowHelpSupportMessageModel(!showHelpSupportMessageModel)}
			>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<View style={{ position: 'absolute', bottom: 20 }}>
						<View style={styles.msgModalView}>
							<Image source={require('../../assets/Images/smileicon.png')} style={{ marginTop: 35, height: 40, width: 40 }} />
							<Text style={{ marginTop: 15, fontSize: 14, color: '#000000' }}>Thank you for your feedback</Text>
							<Text style={{ fontSize: 14, color: '#000000' }}>we will get back to you shortly</Text>
						</View>
						<View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
							<TouchableOpacity onPress={() => setShowHelpSupportMessageModel(!showHelpSupportMessageModel)}
								style={styles.cancelbtn}>
								<Text style={{ fontSize: 14, color: '#000000' }}>Ok</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			{/* time out model Pop */}
			<Modal
				animationType='slide'
				transparent={true}
				visible={timeoutModelVisible}
				onRequestClose={() => { setTimeoutModelVisible(false) }}
			>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<View style={{ position: 'absolute', bottom: 20 }}>
						<View style={styles.timeoutModalView}>
							<Text style={{ fontSize: 14, marginTop: 15 }}>The consultant is currently</Text>
							<Text style={{ fontSize: 14 }}>unavailable to reply, would you like to</Text>
							<Text style={{ fontSize: 14 }}>chat with another consultant?</Text>
						</View>
						<View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
							<TouchableOpacity
								onPress={() => { setTimeoutModelVisible(false), nowAutoEndChat() }}
								style={styles.yesbtn}
							>
								<Text style={{ fontSize: 14, color: '#FFFFFF' }}>Yes</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => { setTimeoutModelVisible(false), oncheckIdelTimeOut() }}
								style={styles.nobtn}
							>
								<Text style={{ fontSize: 14, color: '#000000' }}>No</Text>
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

							<View style={{ margin: 7, alignItems: 'center' }} >
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
								<Text style={{ fontSize: 12, color: '#000000' }}>{formdataDetails && formdataDetails.property && formdataDetails.property.consultantid && formdataDetails.property.consultantid.property && formdataDetails.property.consultantid.property.usertag}</Text>
							</View>

							<StarRating
								disabled={false}
								maxStars={5}
								starSize={20}
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
							<View style={{ margin: 10 }}>
								<TouchableOpacity
									onPress={() => { rate == true ? feedBack() : onpressDoneBtn() }}
									style={styles.doneBtn}
								>
									<Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Done</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</Modal>
			{loading ? <Loader /> : null}
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
		elevation: 1,
		marginBottom: 10
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
	timeoutModalView: {
		height: 100,
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
	helpSupportModalView: {
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
	disputeModalView: {
		height: 270,
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
		height: 130,
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
		width: 80,
		height: 80,
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
		height: HEIGHT / 7,
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
	yesbtn: {
		flexDirection: 'row',
		width: WIDTH / 6,
		height: 25,
		marginHorizontal: 20,
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
		elevation: 1
	},
	nobtn: {
		flexDirection: 'row',
		width: WIDTH / 6,
		height: 25,
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
		elevation: 1
	},
});
