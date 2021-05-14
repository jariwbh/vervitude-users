import React from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar, FlatList, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SCREEN from '../../context/screen/screenName';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import * as STYLES from './styles';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';
const noProfile = 'https://res.cloudinary.com/dnogrvbs2/image/upload/v1613538969/profile1_xspwoy.png';

const consultantsScreen = (props) => {
  const consultanDetails = props.route.params.item;

  //render Brand Photo 
  const renderAddBrand = ({ item }) => (
    <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <TouchableOpacity>
        <Image source={require('../../assets/Images/b1.png')}
          style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={STYLES.styles.container}>
      <StatusBar hidden backgroundColor='#5AC8FA' barStyle='light-content' />

      <View style={STYLES.styles.headerstyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
              <AntDesign name='arrowleft' color='#FFFFFF' size={24} style={{ marginLeft: 20 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 20 }}>Consultant</Text>
          </View>

          <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.RECENTCHATSCREEN)} style={{ marginRight: 20 }}>
              <Image source={require('../../assets/Images/chaticon.png')}
                style={{ width: 28, height: 26 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails })}
              style={{ width: 80, height: 30, backgroundColor: '#FFFFFF', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
              <Text style={{ fontSize: 12, color: '#5AC8FA' }}>Start Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          {/* <ImageBackground source={require('../../assets/Images/profilebg.png')} style={STYLES.styles.backgroundImage}> */}
          <View style={STYLES.styles.counsultantview}>
            {/* <View style={STYLES.styles.cauve}>
              <FontAwesome name='circle' size={110} color='#FFB629' />
              <Image source={require('../../assets/Images/medal1.png')}
                style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
              />
            </View> */}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 20, marginTop: 20, alignItems: 'center' }}>
              <Image source={{ uri: consultanDetails ? consultanDetails.profilepic !== null && consultanDetails.profilepic ? consultanDetails.profilepic : noProfile : null }}
                style={{ width: 120, height: 120, borderColor: '#D1E8EA', borderRadius: 100, borderWidth: 5 }}
              />
              <View style={{ justifyContent: 'center', marginLeft: 30 }}>
                <Text style={{ fontSize: 26, color: '#000000', fontWeight: 'bold', textTransform: 'capitalize' }}>{consultanDetails.property.first_name}</Text>
                <Text style={{ fontSize: 16, color: '#000000', textTransform: 'capitalize' }}>{consultanDetails.property.usertag}</Text>
                <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold', textTransform: 'capitalize' }}>{consultanDetails.property.location}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginRight: 15, marginLeft: 15 }}>
              <View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>{moment().diff(consultanDetails.property.careerstart, 'years')}</Text>
                <Text style={{ fontSize: 14, color: '#000000' }}>Year of Experience</Text>
              </View>
              <View style={STYLES.styles.verticleLine}></View>
              <View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>₹{consultanDetails.property.chargespermin}</Text>
                <Text style={{ fontSize: 14, color: '#000000' }}>Charges Per Minute </Text>
              </View>
              <View style={STYLES.styles.verticleLine}></View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    starSize={10}
                    rating={3}
                    fullStarColor={'#F1C40E'}
                    emptyStarColor={'#000000'}
                  />
                </View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>4.5</Text>
                <Text style={{ fontSize: 10, color: '#000000' }}>1.2K Ratings</Text>
              </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <View style={STYLES.styles.counsultantdetail}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 5, marginLeft: 10, marginRight: 5 }}>
                  <HTML baseFontStyle={{ fontSize: 14, textTransform: 'capitalize' }}
                    html={`<html>${consultanDetails && consultanDetails.property.about} </html>`} />
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#999999', marginTop: 5 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', marginLeft: 15, marginBottom: 20 }}>It has been Great Experience using Vervitude, I have helped more then 1000’s of people learn new technologies, while I made a passive income. Kudos to Vervitude Team</Text>
                </View>
              </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Brands</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ADADAD' }}>The Consultant has helped 50+ Brands</Text>
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
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails })}
          style={{
            height: 40, width: 200, backgroundColor: '#FFFFFF',
            borderRadius: 100, alignItems: 'center', justifyContent: 'center',
            position: 'absolute', bottom: 20, right: 70, elevation: 2
          }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Chat with the Consultant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate(SCREEN.CHATSCREEN, { consultanDetails })}
          activeOpacity={0.7}
          style={styles.touchableOpacityStyle}>
          <Ionicons name="chatbubbles" color='#FFFFFF' size={30} style={{ top: -45, right: 50 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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