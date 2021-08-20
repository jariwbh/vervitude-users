import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
	View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image,
	TextInput, Modal, Dimensions, StatusBar, Platform, ToastAndroid, Keyboard
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
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import Loader from '../../components/loader/index';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BillService, BillPaymentService, WalletRefershService } from '../../services/BillService/BillService';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import MyPermissionController from '../../helpers/appPermission';
import { DisputeChatAdd } from '../../services/DisputeChatService/DisputeChatService';
import HelpSupportService from '../../services/HelpSupportService/HelpSupportService';
import Spinner from 'react-native-loading-spinner-overlay';
import { captureScreen } from "react-native-view-shot";

const chatScreen = (props, { navigation }) => {
	//chat variable
	const consultanDetails = props.route.params.consultanDetails;
	let formId;
	const [loading, setloading] = useState(false);
	const [spinner, setSpinner] = useState(false);
	const [chatId, setchatId] = useState(null);
	const [sender, setsender] = useState(null);
	const [messages, setMessages] = useState([]);
	const [formdataDetails, setFormdataDetails] = useState(null);
	//another variable
	const [showStartProjectVisible, setshowStartProjectVisible] = useState(false);
	const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
	const [filterModalVisible, setfilterModalVisible] = useState(false);
	const [hideInput, setHideInput] = useState(false);
	const [projectTime, setProjectTime] = useState(null);
	const [projectTimeError, setProjectTimeError] = useState(null);
	const [projectdesc, setProjectdesc] = useState(null);
	const [projectdescError, setProjectdescError] = useState(null);
	const [projectMobile, setProjectMobile] = useState(null);
	const [projectMobileError, setProjectMobileError] = useState(null);
	const [isTimePickerVisibility, setIsTimePickerVisibility] = useState(false);
	const [showDisputeChatVisible, setShowDisputeChatVisible] = useState(false);
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
	const [nowAutoEndChat, setnowAutoEndChat] = useState(false);
	const timerRef = useRef(null);
	const timerRef1 = useRef(null);
	const secondTextInputRef = React.createRef();
	const thirdTextInputRef = React.createRef();
	const fourTextInputRef = React.createRef();
	let formdatas;
	let userid;
	const cardRef = useRef();
	// chat portion
	useEffect(
		() => {
			checkPermission();
			AsyncStorage.getItem(AUTHUSER).then((res) => {
				let sender = JSON.parse(res)._id;
				userid = JSON.parse(res)._id;
				setsender(sender);
				setloading(true);
				newChat(sender, consultanDetails).then((id) => {
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
	}, [formdataDetails, hideInput, sender, chatId, projectTime, projectTimeError, projectdesc,
		projectdescError, projectMobile, projectMobileError, disputechatdesc, disputechatdescError,
		disputechatsubject, disputechatsubjectError, disputeImage, reportSubject, reportSubjectError,
		reportDesc, reportDescError, nowAutoEndChat
	])

	// //2 minutes complate to call funtion
	const oncheckIdelTimeOut = async () => {
		timerRef.current = setTimeout(() => {
			setTimeoutModelVisible(true);
			// 	autoendnow();
		}, 2 * 60 * 1000);
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
	// const onUploadDisputeChat = () => {
	// 	handlePicker();
	// }

	//IMAGE CLICK TO GET CALL FUNCTION
	const handlePicker = (data) => {
		let img = {
			name: 'file',
			filename: Math.floor(1000 + Math.random() * 9000) + '.jpg',
			type: 'jpg',
			data: data //.replace('file:///', 'content://')
		}
		console.log(`img`, img);
		// ImagePicker.showImagePicker({}, (response) => {
		// 	if (response.didCancel) {
		// 		setSpinner(false);
		// 		// console.log('User cancelled image picker');
		// 	} else if (response.error) {
		// 		setSpinner(false);
		// 		// console.log('ImagePicker Error: ', response.error);
		// 	} else if (response.customButton) {
		// 		setSpinner(false);
		// 		//  console.log('User tapped custom button: ', response.customButton);
		// 	} else {
		// 		setSpinner(true);
		onPressUploadFile(img);
		// 	}
		// });
	};

	//Upload Cloud storage function
	const onPressUploadFile = async (fileObj) => {
		if (fileObj != null) {
			//const realPath = Platform.OS === 'ios' ? fileObj.uri.replace('file://', '') : fileObj.uri;
			const realPath = fileObj.data;
			console.log(`realPath`, realPath);
			await RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/dlopjt9le/upload', { 'Content-Type': 'multipart/form-data' },
				//[{ name: 'file', filename: Platform.OS === 'ios' ? fileObj.fileSize : fileObj.fileName, type: fileObj.type, data: RNFetchBlob.wrap(decodeURIComponent(realPath)) },
				[{ name: 'file', filename: fileObj.fileName, type: fileObj.type, data: RNFetchBlob.wrap(decodeURIComponent(realPath)) },
				{ name: 'upload_preset', data: 'gs95u3um' }])
				.then(response => response.json())
				.then(data => {
					console.log(`data`, data);
					setSpinner(false);
					if (data && data.url) {
						setdisputeImage(data.url);
					}
				}).catch(error => {
					console.log(`error`, error);
					setSpinner(false);
					alert("Uploading Failed!");
				})
		} else {
			setSpinner(false);
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
		//console.log(`consultanDetails`, consultanDetails);
		const body = {
			formid: '608a5d7ebbeb5b2b03571f2c',
			contextid: sender,
			onModel: "Member",
			property: {
				consultantid: item,
				chargable: false,
				category: consultanDetails && consultanDetails.property && consultanDetails.property.livechat ? consultanDetails.property.livechat : [],
				subcategory: consultanDetails.property.skill
			}
		}
		try {
			const response = await StartChatService(body);
			if (response.data != null && response.data != 'undefind' && response.status === 200) {
				formId = response.data._id;
				formdatas = response.data;
				FindChatByIdService(response.data._id);
			}
		}
		catch (error) {
			//console.log(`error`, error);
			setloading(false);
		}
	}

	//new chat inite
	const newChat = async (sender, item) => {
		let getChatId = firestore().collection('chat');
		let fierbasechatid = item && item.consultanobject && item.consultanobject.property && item.consultanobject.property.fierbasechatid;
		let snap;
		if (fierbasechatid) {
			snap = await getChatId.doc(fierbasechatid).get()
		} else {
			snap = await getChatId.where('member', 'in', [[sender, item._id]]).get();
		}
		if (snap.empty) {
			let snap2 = await getChatId.where('member', 'in', [[item._id, sender]]).get();
			//console.log(`snap2`, snap2);
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
				updateChatdata(ref.id);
				//setloading(false);
				return ref.id;
			} else {
				//console.log(`snap2 else`, snap2);
				if (snap2.docs[0]._data.endat) {
					if (consultanDetails && consultanDetails.property && consultanDetails.property.livechat) {
						await startChat(sender, item._id);
						let ref = await getChatId.add({
							member: [sender, item._id],
							createdAt: '',
							previewMessage: '',
							formid: formId,
							memberid: sender,
							userid: item._id
						});
						updateChatdata(ref.id);
						//setloading(false);
						return ref.id;
					} else {
						FindChatByIdService(snap2.docs[0]._data.formid);
						//setloading(false);
						return snap2.docs[0].id;
					}
				} else {
					FindChatByIdService(snap2.docs[0]._data.formid);
					//setloading(false);
					return snap2.docs[0].id;
				}
			}
		}
		else {
			let data;
			let id;
			if (fierbasechatid) {
				data = snap._data;
				id = snap.id;
			} else {
				data = snap.docs[0]._data
				id = snap.docs[0].id;
			}
			//console.log(`data`, data);
			if (data.endat) {
				if (consultanDetails && consultanDetails.property && consultanDetails.property.livechat) {
					await startChat(sender, item._id);
					let ref = await getChatId.add({
						member: [sender, item._id],
						createdAt: '',
						previewMessage: '',
						formid: formId,
						memberid: sender,
						userid: item._id
					});
					updateChatdata(ref.id);
					setloading(false);
					return ref.id;
				} else {
					FindChatByIdService(data.formid);
					setloading(false);
					return id;
				}
			} else {
				FindChatByIdService(data.formid);
				setloading(false);
				return id;
			}
		}
	};

	//check start chat or not function
	const checkstartchat = () => {
		if (formdataDetails && formdataDetails.property && (formdataDetails.property.startat == undefined || formdataDetails.property.startat == null)) {
			updateChatId();
		}
	}

	//send btn click to send message
	const onSend = useCallback((messages = []) => {
		checkstartchat();
		sendpushalertmsgCheck(messages[0].text);
		let setMessage = firestore().collection('chat').doc(chatId).collection('messages').doc();
		for (let i = 0; i < messages.length; i++) {
			const { text, user, createdAt } = messages[i];
			firestore()
				.collection('chat')
				.doc(chatId)
				.update({ previewMessage: { previewMessage: messages[0].text, read: false }, createdAt: createdAt.toString() });
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

	//update chat id
	const updateChatdata = async (chatId) => {
		//console.log(`chatId`, chatId);
		let body = {
			formid: '608a5d7ebbeb5b2b03571f2c',
			contextid: userid,
			onModel: 'Member',
			property: {
				consultantid: formdatas.property.consultantid,
				chargable: false,
				category: formdatas && formdatas.property && formdatas.property.category ? formdatas.property.category : [],
				subcategory: formdatas && formdatas.property && formdatas.property.subcategory ? formdatas.property.subcategory : [],
			}
		}
		if (chatId) {
			body.property.fierbasechatid = chatId
		}
		console.log(`formdatas`, formdatas.property.livechat);
		try {
			const response = await EndChatService(formdatas._id, body);
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				FindChatByIdService(response.data._id);
				setHideInput(true);
				if (Platform.OS === 'android') {
					ToastAndroid.show('Your Chat Is Initial', ToastAndroid.SHORT);
				} else {
					alert('Your Chat Is Initial');
				}
			}
		} catch (error) {
			//console.log(`error updateChatId`, error);
			setloading(false);
			if (Platform.OS === 'android') {
				ToastAndroid.show('Your Chat Not Initial', ToastAndroid.SHORT);
			} else {
				alert('Your Chat Is Not Initial');
			}
		}
	}

	//first time message send to call update chat time
	const updateChatId = async () => {
		//console.log(`formdataDetails`, formdataDetails);
		let body = {
			formid: '608a5d7ebbeb5b2b03571f2c',
			contextid: sender,
			onModel: 'Member',
			property: {
				startat: moment().format(),
				consultantid: formdataDetails.property.consultantid._id,
				chargable: true,
				category: formdataDetails.property.category,
				subcategory: formdataDetails.property.subcategory,
				fierbasechatid: formdataDetails.property.fierbasechatid
			}
		}

		try {
			const response = await EndChatService(formdataDetails._id, body);
			if (response.data != null && response.data != 'undefind' && response.status == 200) {
				FindChatByIdService(response.data._id)
				oncheckIdelTimeOut();
				if (Platform.OS === 'android') {
					ToastAndroid.show('Your Chat Is Start', ToastAndroid.SHORT);
				} else {
					alert('Your Chat Is Start');
				}
			}
		} catch (error) {
			//console.log(`error updateChatId`, error);
			setloading(false);
			if (Platform.OS === 'android') {
				ToastAndroid.show('Your Chat Not Start', ToastAndroid.SHORT);
			} else {
				alert('Your Chat Is Not Start');
			}
		}
	}

	//open - close model popup
	const setFilterModalVisible = (visible) => {
		setfilterModalVisible(visible);
	};

	const showModalVisible = () => {
		setProjectTime(null);
		setProjectTimeError(null);
		setProjectdesc(null);
		setProjectdescError(null);
		setProjectMobile(null);
		setProjectMobileError(null);
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
				formId = response.data[0]._id;
				setFormdataDetails(response.data[0]);
				if (response.data[0] && response.data[0].property.endat != null) {
					setHideInput(true);
				} else {
					if (response.data[0] && response.data[0].property.startat) {
						if (!response.data[0].property.consultantid.property.live) {
							setHideInput(true);
						} else {
							oncheckIdelTimeOut();
							setHideInput(false);
						}
					}
				}
				if (!response.data[0].property.consultantid.property.live) {
					setHideInput(true);
				}
				setloading(false);
			}
		} catch (error) {
			//console.log(`error FindChatByIdService`, error);
			setloading(false);
		}
	}

	//call feedback form open
	const feedBack = async () => {
		setFilterModalVisible(false);
		props.navigation.navigate(SCREEN.RATEINGSCREEN, { consultanDetails, formdataDetails });
	}

	//end chat menu click to call function(END CHAT API CALL)
	const onpressDoneBtn = async () => {
		console.log(`formdataDetails`, formdataDetails);
		if (formdataDetails) {
			setSpinner(true);
			let endtime = moment().format();
			var duration = moment.duration(moment().diff(formdataDetails.property.startat))
			var minsDiff = duration.asMinutes();
			//console.log(`minsDiff`, minsDiff);
			var charges = formdataDetails.property.consultantid.property.chargespermin;
			//console.log(`charges`, charges)
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
					consultanminutecharge: charges,
					fierbasechatid: chatId
				}
			}

			console.log(`body EndChatService`, body);
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
					chatrefid: formdataDetails._id
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
				console.log(`body formdataDetails`, body)
				const response = await EndChatService(formdataDetails._id, body);
				if (response.data != null && response.data != 'undefind' && response.status == 200) {
					//firestore().collection('chat').doc(chatId).update({ member: [[sender, item._id, 'chatend']], createdAt: createdAt.toString() });
					firestore().collection('chat').doc(chatId).update({ 'endat': endtime });
					console.log(`EndChatService response`, response);
					const billResponse = await BillService(generateBill);
					if (billResponse.data != null && billResponse.data != 'undefind' && billResponse.status == 200) {
						//console.log(`billResponse`, billResponse);
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
						//console.log(`billPaymentResponse`, billPaymentResponse);
						if (billPaymentResponse.data != null && billPaymentResponse.data != 'undefind' && billPaymentResponse.status == 200) {
							let walletbody = {
								"txntype": "Cr",
								"txnref": `Earning for bill ${billPaymentResponse.data.prefix}-${billPaymentResponse.data.receiptnumber}`,
								"value": (charges * minsDiff) / 2,
								"customerid": formdataDetails.property.consultantid._id,
								"onModel": "User",
								"billid": billResponse.data._id,
								"txndate": moment().format()
							}
							const response1 = await WalletRefershService(walletbody);
							//console.log(`response1`, response1);
							if (response1.data != null && response1.data != 'undefind' && response1.status === 200) {
								let walletbody2 = {
									"txntype": "Cr",
									"txnref": `Earning for bill ${billPaymentResponse.data.prefix}-${billPaymentResponse.data.receiptnumber}`,
									"value": (charges * minsDiff) / 2,
									"customerid": "6054990599e17f5b4c4bb112",
									"onModel": "User",
									"billid": billResponse.data._id,
									"txndate": moment().format()
								}
								const response2 = await WalletRefershService(walletbody2);
								//console.log(`response2`, response2);
								if (response2.data != null && response2.data != 'undefind' && response2.status === 200) {
									setfilterModalVisible(false);
									showModalVisible(false);
									setnowAutoEndChat(false);
									//console.log(`body formdataDetails`, body)
									setSpinner(false);
									if (nowAutoEndChat === false) { feedBack() } else {
										if (timerRef.current) {
											clearTimeout(timerRef.current);
											setSpinner(false);
										}
										if (timerRef1.current) {
											clearTimeout(timerRef1.current);
											setSpinner(false);
										}
										setnowAutoEndChat(false);
										setSpinner(false);
										props.navigation.navigate(SCREEN.HOMESCREEN);
									}
									if (Platform.OS === 'android') {
										ToastAndroid.show('Your Chat Is Closed', ToastAndroid.SHORT);
									} else {
										alert('Your Chat Is Closed');
									}
								}
							}
						}
					}
				}
			}
			catch (error) {
				console.log(`error`, error);
				setSpinner(false);
				//console.log(`error`, error);
				if (Platform.OS === 'android') {
					ToastAndroid.show('Your Chat Is Not Closed', ToastAndroid.SHORT);
				} else {
					alert('Your Chat Is Not Closed');
				}
			}
		}
	}

	//check end chat or not
	const EndChat = () => (
		formdataDetails.property.endat ?
			<View style={{ alignItems: 'center', margin: 5 }}>
				<Text style={{ fontSize: 14, color: '#000000' }}>{`Your Chat is close in this Date ${formdataDetails && moment(formdataDetails.property.endat).format("MMM Do YYYY")}`}</Text>
				<Text style={{ fontSize: 14, color: '#000000' }}>{`and time ${formdataDetails && moment(formdataDetails.property.endat).format('LTS')}`}</Text>
			</View>
			:
			<View style={{ alignItems: 'center', margin: 5 }}>
				<Text style={{ fontSize: 14, color: '#000000', textAlign: 'center' }}>{`Consultant Currently Offline Dose `}</Text>
				<Text style={{ fontSize: 14, color: '#000000', textAlign: 'center' }}>{`not allowed chat`}</Text>
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
			setProjectMobile(mobile_number);
			setProjectMobileError('Mobile Number cannot be empty');
			return;
		}
		if (!reg.test(mobile_number)) {
			setProjectMobile(mobile_number);
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
				description: projectdesc,
				consultantid: formdataDetails.property.consultantid
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
		setSpinner(true);
		if (!disputechatsubject || !disputechatdesc) {
			setDisputechatsubjectCheck(disputechatsubject);
			setDisputechatDescCheck(disputechatdesc);
			setSpinner(false);
			return;
		}

		if (disputeImage == null) {
			alert('Please Upload Image');
			setSpinner(false);
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
				setSpinner(false);
			}
		} catch (error) {
			setSpinner(false);
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
		}
	}

	async function sendpushalert(registrationid, message, subject) {
		var form = {
			to: registrationid,
			priority: "high",
			notification: {
				sound: "default",
				title: subject.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '),
				body: message
			}
		};
		var formData = JSON.stringify(form);
		await fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": "key=AAAAEnSG7us:APA91bF_fsNvJ-RoDW56GfT8wyg4nYt78wBlcsyVb4Sa5kzqVWHLU-kWsueU9HcOoOX6qF8Esu9BoCHPNvTT6zntXmOd6UQ-ygrPxP42ldjwqDH0DzW5U2bf4UlPXL1NswPsLFaRNT3x"
			},
			body: formData
		})
			.then(response => response.json())
			.then((responseData) => {
				console.log('responseData', responseData);
			})
			.catch(error => {
				//this.setState({ errorMessage: error });
				console.error('There was an error!', error);
			});
	}

	function sendpushalertmsgCheck(message) {
		let userInformation = formdataDetails.property.consultantid;
		if (userInformation) {
			if (userInformation.anroiddevices && userInformation.anroiddevices.length !== 0) {
				userInformation.anroiddevices.forEach(elementAndroidDevices => {
					if (
						elementAndroidDevices.registrationid &&
						elementAndroidDevices.registrationid != ""
					)
						sendpushalert(elementAndroidDevices.registrationid, message, userInformation.fullname)
				});
			}

			if (userInformation.iosdevices && userInformation.iosdevices.length !== 0) {
				userInformation.iosdevices.forEach(elementIosDevices => {
					if (
						elementIosDevices.registrationid &&
						elementIosDevices.registrationid != ""
					)
						sendpushalert(elementIosDevices.registrationid, message, userInformation.fullname)
				});
			}
		}
	}

	const disputechatScrenShort = async () => {
		setFilterModalVisible(!filterModalVisible);
		try {
			await captureScreen({
				format: "jpg",
				quality: 0.8
			}).then(
				uri => {
					handlePicker(uri)
					//console.log("Image saved to", uri)
				},
				error => console.error("Oops, snapshot failed", error)
			);
		} catch (e) {
			console.log(e);
		}
		setShowDisputeChatVisible(true)
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
							source={{ uri: consultanDetails ? consultanDetails.profilepic !== null && consultanDetails.profilepic ? consultanDetails.profilepic : noProfile : noProfile }}
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
				<View style={styles.centeView}>
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
									maxLength={10}
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
				onRequestClose={() => setFilterModalVisible(!filterModalVisible)}
			>
				<View style={{ alignItems: 'center', flex: 1 }}>
					<View style={{ position: 'absolute', bottom: 20 }}>
						<View style={styles.modalView}>
							<TouchableOpacity onPress={() => onpressDoneBtn()} disabled={hideInput}>
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

							<TouchableOpacity onPress={() => disputechatScrenShort()}>
								<Text style={{ padding: 15, textAlign: 'center', color: '#000000' }}>Dispute</Text>
							</TouchableOpacity>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, height: 1, backgroundColor: '#EEEEEE' }} />
							</View>

							<TouchableOpacity onPress={() => feedBack()}>
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
								onPress={() => setFilterModalVisible(!filterModalVisible)}
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
							{/* <View style={{ marginTop: 10 }} />
							<TouchableOpacity
								onPress={() => onUploadDisputeChat()}
								style={styles.savebtn}
							>
								<Text style={{ fontSize: 14, color: '#FFFFFF' }}>Upload Photo</Text>
							</TouchableOpacity> */}
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
								onPress={() => { setTimeoutModelVisible(false), onpressDoneBtn() }}
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
			<Spinner
				visible={spinner}
				textStyle={{ color: '#2855AE' }}
			/>
			{loading ? <Loader /> : null}
		</SafeAreaView>
	);
};

export default chatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFB629'
	},
	chatview: {
		width: WIDTH - 20,
		backgroundColor: '#FFFFFF',
		borderRadius: 30,
		height: HEIGHT - 160,
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: {
			height: 0,
			width: 0
		},
		elevation: 1,
		marginBottom: 10,
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
		shadowRadius: 1,
		elevation: 1
	},
	timeoutModalView: {
		height: 100,
		width: WIDTH - 90,
		borderRadius: 20,
		backgroundColor: '#EEEEEE',
		alignItems: 'center',
		shadowColor: '#EEEEEE',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 1,
		elevation: 1,
		borderColor: '#FFB629',
		borderWidth: 1
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
		backgroundColor: '#AAAAAA',
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
