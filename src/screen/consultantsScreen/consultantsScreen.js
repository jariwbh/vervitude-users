import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar, FlatList, StyleSheet, Modal, Keyboard, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SCREEN from '../../context/screen/screenName';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import * as STYLES from './styles';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTML from 'react-native-render-html';
import { AUTHUSER } from '../../context/actions/type';
import { WalletDetailService } from '../../services/BillService/BillService';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StartProject } from '../../services/ChatService/ChatService';
import GeneralStatusBarColor from '../../components/StatusBarStyle/GeneralStatusBarColor';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const consultantsScreen = (props) => {
  const consultanDetails = props.route.params.item;
  const [userId, setUserId] = useState(null);
  const [walletBalance, setwalletBalance] = useState(null);
  const [wallatemodel, setWallatemodel] = useState(false);
  const [showStartProjectVisible, setshowStartProjectVisible] = useState(false);
  const [projectTime, setProjectTime] = useState(null);
  const [projectTimeError, setProjectTimeError] = useState(null);
  const [projectdesc, setProjectdesc] = useState(null);
  const [projectdescError, setProjectdescError] = useState(null);
  const [projectMobile, setProjectMobile] = useState(null);
  const [projectMobileError, setProjectMobileError] = useState(null);
  const [isTimePickerVisibility, setIsTimePickerVisibility] = useState(false);
  const [showMessageModalVisible, setshowMessageModalVisible] = useState(false);
  const secondTextInputRef = React.createRef();
  const thirdTextInputRef = React.createRef();

  useEffect(
    () => {
      AsyncStorage.getItem(AUTHUSER).then(async (res) => {
        let userId = JSON.parse(res)._id;
        setUserId(userId);
        try {
          const response = await WalletDetailService(userId);
          if (response.data != null && response.data != 'undefind' && response.status === 200) {
            setwalletBalance(response.data[0].walletbalance)
          }
        } catch (error) {
          // console.log(`error`, error);
        }
      });
    },
    []
  )

  useEffect(() => {
    console.log(`consultanDetails`, consultanDetails)
  }, [walletBalance])

  //render Brand Photo 
  const renderAddBrand = ({ item }) => (
    <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
      <TouchableOpacity>
        <Image source={{ uri: item.attachment }}
          style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
      </TouchableOpacity>
    </View>
  );

  //start chat click to navigate screen
  const navigationhandler = () => {
    if (walletBalance <= 0) {
      setWallatemodel(true);
    } else {
      props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails });
    }
  }

  //add money model pop function
  const onPressRecharge = () => {
    setWallatemodel(false);
    props.navigation.navigate(SCREEN.MYWALLETSCREEN);
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

  const showModalVisibleSubmit = (visible) => {
    setshowStartProjectVisible(visible);
    setshowMessageModalVisible(true);
  };

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
      contextid: userId,
      onModel: 'Member',
      property: {
        time: projectTime,
        mobile_number: projectMobile,
        description: projectdesc,
        consultantid: consultanDetails._id
      }
    }
    try {
      const response = await StartProject(body);
      if (response.data != null && response.data != 'undefind' && response.status == 200) {
        showModalVisibleSubmit(!showStartProjectVisible);
        setProjectTime(null);
        setProjectdesc(null);
        setProjectMobile(null);
      }
    } catch (error) {
      //console.log(`error`, error);
    }
  }

  return (
    <SafeAreaView style={STYLES.styles.container}>
      <GeneralStatusBarColor hidden={false} translucent={true} backgroundColor="transparent" barStyle="dark-content" />
      <View style={STYLES.styles.headerstyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
              <AntDesign name='arrowleft' color='#FFFFFF' size={24} style={{ marginLeft: 20 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 20 }}>Consultant</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 20 }}>
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setshowStartProjectVisible(true)}
              style={{ width: 100, height: 30, backgroundColor: '#FFFFFF', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
              <Text style={{ fontSize: 12, color: '#5AC8FA' }}>Start a Project</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => alert('This feature is currently not available')}
            style={{ width: 60, height: 30, backgroundColor: '#FFFFFF', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginRight: -40 }}>
            <Text style={{ fontSize: 12, color: '#5AC8FA' }}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigationhandler()}
            style={{ width: 80, height: 30, backgroundColor: '#FFFFFF', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
            <Text style={{ fontSize: 12, color: '#5AC8FA' }}>Start Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          {/* <ImageBackground source={require('../../assets/Images/profilebg.png')} style={STYLES.styles.backgroundImage}> */}
          <View style={STYLES.styles.counsultantview}>
            <View style={STYLES.styles.cauve}>
              {consultanDetails.property.consultantgrade && consultanDetails.property.consultantgrade == "Gold" &&
                <>
                  <FontAwesome name='circle' size={110} color='#FFB629' />
                  <Image source={require('../../assets/Images/medal1.png')}
                    style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 55 }}
                  />
                </>
              }
              {consultanDetails.property.consultantgrade && consultanDetails.property.consultantgrade == "Silver" &&
                <>
                  <FontAwesome name='circle' size={110} color='#E5E4E2' />
                  <Image source={require('../../assets/Images/medal2.png')}
                    style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 55 }}
                  />
                </>
              }
              {consultanDetails.property.consultantgrade && consultanDetails.property.consultantgrade == "Platinum" &&
                <>
                  <FontAwesome name='circle' size={110} color='#E5E4E2' />
                  <Image source={require('../../assets/Images/medal4.png')}
                    style={{ width: 40, height: 34, position: 'absolute', right: 40, top: 55 }}
                  />
                </>
              }
              {consultanDetails.property.consultantgrade && consultanDetails.property.consultantgrade == "Diamond" &&
                <>
                  <FontAwesome name='circle' size={110} color='#9DF9FF' />
                  <Image source={require('../../assets/Images/medal3.png')}
                    style={{ width: 40, height: 26, position: 'absolute', right: 40, top: 55 }}
                  />
                </>
              }
              {consultanDetails.property.consultantgrade && consultanDetails.property.consultantgrade == "No Badge" &&
                <>
                  <FontAwesome name='circle' size={110} color='#9DF9FF' />
                  <Image source={require('../../assets/Images/medal3.png')}
                    style={{ width: 40, height: 26, position: 'absolute', right: 40, top: 55 }}
                  />
                </>
              }
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 20, marginTop: -40, alignItems: 'center' }}>
              <Image source={{ uri: consultanDetails ? consultanDetails.profilepic !== null && consultanDetails.profilepic ? consultanDetails.profilepic : noProfile : null }}
                style={{ width: 120, height: 120, borderColor: '#D1E8EA', borderRadius: 100, borderWidth: 5 }} />
              <View style={{ justifyContent: 'center', marginLeft: 30 }}>
                <Text style={{ fontSize: 26, color: '#000000', fontWeight: 'bold', textTransform: 'capitalize' }}>{consultanDetails.property.first_name}</Text>
                <Text style={{ fontSize: 16, color: '#000000', textTransform: 'capitalize' }}>{consultanDetails.property.usertag}</Text>
                {consultanDetails && consultanDetails.skills && consultanDetails.skills.length > 0 ?
                  <>
                    <Text style={{ fontSize: 12, color: '#000000', marginTop: 3 }}>Speciliazition : </Text>
                    <Text style={{ fontSize: 12, color: '#000000', textTransform: 'capitalize', width: '45%' }}>
                      {
                        consultanDetails.skills ?
                          consultanDetails.skills.slice(0, 3).map(({
                            title
                          }) => title).join(',')
                          : null
                      }
                    </Text>
                  </>
                  : null
                }
                <Text style={{ fontSize: 12, color: '#000000', fontWeight: 'bold', textTransform: 'capitalize', marginTop: 3 }}>{consultanDetails.property.location}</Text>
              </View>
            </View>

            <Image source={require('../../assets/Images/consultantview.png')} style={STYLES.styles.imagestyle} />
            <View style={{ flexDirection: 'row', marginTop: 80, justifyContent: 'space-between', marginRight: 15, marginLeft: 15 }}>
              <View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>{consultanDetails.property.careerstart ? consultanDetails.property.careerstart : 0}</Text>
                <Text style={{ fontSize: 10, color: '#000000' }}>Year of Experience</Text>
              </View>
              <View style={STYLES.styles.verticleLine}></View>
              <View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000000' }}>₹{Number(consultanDetails.property.chargespermin).toFixed(0)}</Text>
                <Text style={{ fontSize: 10, color: '#000000' }}>Charges Per Minute </Text>
              </View>
              <View style={STYLES.styles.verticleLine}></View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    starSize={10}
                    rating={consultanDetails.ratings}
                    fullStarColor={'#F1C40E'}
                    emptyStarColor={'#000000'}
                  />
                </View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>{consultanDetails.ratings == null ? '0' : Number(consultanDetails.ratings).toFixed(2)}</Text>
                <Text style={{ fontSize: 10, color: '#000000' }}>{consultanDetails.ratinglen + 'k'} Ratings</Text>
              </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
              <View style={STYLES.styles.counsultantdetail}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 5, marginLeft: 10, marginRight: 5 }}>
                  <HTML baseFontStyle={{ fontSize: 14, textTransform: 'capitalize' }}
                    html={`<html>${consultanDetails && consultanDetails.property.about} </html>`} />
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#999999', marginTop: 5 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 5, marginLeft: 10, marginRight: 5, marginBottom: 10 }}>
                  <HTML baseFontStyle={{ fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}
                    html={`<html>${consultanDetails && consultanDetails.property.fromvervitude && consultanDetails.property.fromvervitude} </html>`} />
                </View>
              </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Brands</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ADADAD' }}>The Consultant has helped {consultanDetails.property.add_brand.length > 50 ? consultanDetails.property.add_brand.length + '+' : consultanDetails.property.add_brand.length} Brands</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
              <FlatList
                renderItem={renderAddBrand}
                data={consultanDetails.property.add_brand}
                horizontal={false}
                numColumns={3}
                keyExtractor={(item, index) => index}
              />
            </View>
            <View style={{ marginBottom: 50 }}></View>
          </View>
          {/* </ImageBackground> */}
        </View>
        <View style={{ marginBottom: 50 }}></View>
      </ScrollView>
      {/* Wallate message model Pop */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={wallatemodel}
        onRequestClose={() => setWallatemodel(false)}
      >
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={{ position: 'absolute', bottom: 20 }}>
            <View style={STYLES.styles.msgModalView}>
              <Image source={require('../../assets/Images/wallateicon.png')} style={{ marginTop: 25, height: 40, width: 45 }} />
              <Text style={{ marginTop: 15, fontSize: 14, color: '#000000', fontWeight: 'bold' }}>Your balance is low,please</Text>
              <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}>recharge to keep chating</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity style={STYLES.styles.addmoney} onPress={() => onPressRecharge()}>
                  <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Add Money</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity onPress={() => setWallatemodel(false)}
                style={STYLES.styles.cancelbtn}>
                <Text style={{ fontSize: 14, color: '#000000' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* start project model Pop */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={showStartProjectVisible}
        onRequestClose={() => { setshowStartProjectVisible(!showStartProjectVisible) }}
      >
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={{ position: 'absolute', bottom: 20 }}>
            <View style={STYLES.styles.modalView}>
              <View style={{ marginTop: 20 }} />
              <View style={projectTimeError == null ? STYLES.styles.inputView : STYLES.styles.inputViewError}>
                <TextInput
                  style={STYLES.styles.TextInput}
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
              <View style={projectMobileError == null ? STYLES.styles.inputView : STYLES.styles.inputViewError}>
                <TextInput
                  style={STYLES.styles.TextInput}
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
              <View style={projectdescError == null ? STYLES.styles.textAreainputView : STYLES.styles.textAreainputViewError}>
                <TextInput
                  style={STYLES.styles.TextareaInput}
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
                style={STYLES.styles.savebtn}
              >
                <Text style={{ fontSize: 14, color: '#FFFFFF' }}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setshowStartProjectVisible(!showStartProjectVisible),
                    setProjectTime(null),
                    setProjectdesc(null),
                    setProjectMobile(null)
                }}
                style={STYLES.styles.cancelbtn}
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
            <View style={STYLES.styles.msgModalView}>
              <Text style={{ marginTop: 50, fontSize: 28, fontWeight: 'bold' }}>Thank You</Text>
              <Text style={{ fontSize: 14, marginTop: 15 }}>
                Someone from our team will reach
              </Text>
              <Text style={{ fontSize: 14 }}>out to you</Text>
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity
                onPress={() => { setshowMessageModalVisible(false) }}
                style={STYLES.styles.cancelbtn}
              >
                <Text style={{ fontSize: 14, color: '#000000' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigationhandler()}
          style={{
            height: 40, width: 200, backgroundColor: '#FFFFFF',
            borderRadius: 100, alignItems: 'center', justifyContent: 'center',
            position: 'absolute', bottom: 20, right: 70, elevation: 2
          }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Chat with the Consultant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigationhandler()}
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle}>
          <Image source={require('../../assets/Images/chaticon1.png')} style={{ height: 23, width: 25, top: -45, right: 50 }} />
          {/* <Ionicons name="chatbubbles" color='#FFFFFF' size={30} style={{ top: -45, right: 50 }} /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

export default consultantsScreen;

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 20,
    color: '#FFFFFF',
  },
  touchableOpacityStyle: {
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: '#5AC8FA',
    width: 100,
    height: 100,
    right: 30,
    bottom: -30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: -60,
    elevation: 2
  }
});