import React from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import * as STYLES from './styles';

const consultantsScreen = (props) => {
  return (
    <SafeAreaView style={STYLES.styles.container}>
      <StatusBar backgroundColor='#5AC8FA' barStyle='light-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('myProfileScreen') }}>
              <AntDesign name='arrowleft' color='#FFFFFF' size={24} style={{ marginLeft: 20 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', marginLeft: 20 }}>Consultant</Text>
          </View>

          <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('recentchatScreen') }} style={{ marginRight: 20 }}>
              <Image source={require('../../assets/Images/chaticon.png')}
                style={{ width: 28, height: 26 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('chatScreen')}
              style={{ width: 80, height: 30, backgroundColor: '#FFFFFF', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
              <Text style={{ fontSize: 12, color: '#5AC8FA' }}>Start Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          {/* <ImageBackground source={require('../../assets/Images/profilebg.png')} style={STYLES.styles.backgroundImage}> */}
          <View style={STYLES.styles.counsultantview}>
            <View style={STYLES.styles.cauve}>
              <FontAwesome name='circle' size={110} color='#FFB629' />
              <Image source={require('../../assets/Images/medal1.png')}
                style={{ width: 40, height: 32, position: 'absolute', right: 40, top: 50 }}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: -40, alignItems: 'center' }}>
              <Image source={require('../../assets/Images/Ellipse32.png')}
                style={{ width: 120, height: 120, borderColor: '#D1E8EA', borderRadius: 100, borderWidth: 5 }}
              />
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 26, color: '#000000', fontWeight: 'bold' }}>Ranjan</Text>
                <Text style={{ fontSize: 16, color: '#000000' }}>Design Coach</Text>
                <Text style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}>Mumbai, India</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginRight: 15, marginLeft: 15 }}>
              <View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>23</Text>
                <Text style={{ fontSize: 14, color: '#000000' }}>Year of Experience</Text>
              </View>
              <View style={STYLES.styles.verticleLine}></View>
              <View>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#000000', fontWeight: 'bold' }}>25</Text>
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
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <View style={STYLES.styles.counsultantdetail}>
                <Text style={{ fontSize: 14, marginTop: 15, marginLeft: 15, color: '#999999' }}>Ranjan, comes with 20 years of experience as UX and VIsual Designers. </Text>
                <Text style={{ fontSize: 14, marginTop: 15, marginLeft: 15, color: '#999999' }}>Helping Clients all over the world. Ranjan has been Helping brands create great user experience centered products.</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: '#999999' }} />
                </View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', marginTop: 15, marginLeft: 15, marginBottom: 20 }}>It has been Great Experience using Vervitude, I have helped more then 1000’s of people learn new technologies, while I made a passive income. Kudos to Vervitude Team</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Brands</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ADADAD' }}>The Consultant has helped 50+ Brands</Text>
            </View>
            <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/a1.png')} style={{
                  width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1
                }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={24} color='#000000' />
              </TouchableOpacity>

              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/b1.png')}
                  style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={24} color='#000000' />
              </TouchableOpacity>

              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/c1.png')}
                  style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={20} color='#000000' />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/d1.png')}
                  style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={24} color='#000000' />
              </TouchableOpacity>

              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/e1.png')}
                  style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={24} color='#000000' />
              </TouchableOpacity>
              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/c1.png')}
                  style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={24} color='#000000' />
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 15 }}>
              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/d1.png')}
                  style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={24} color='#000000' />
              </TouchableOpacity>

              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/e1.png')}
                  style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={24} color='#000000' />
              </TouchableOpacity>
              <TouchableOpacity style={STYLES.styles.brandstyle}>
                <Image source={require('../../assets/Images/c1.png')}
                  style={{ width: 80, height: 80, borderRadius: 100, borderColor: '#AAAAAA', borderWidth: 1 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: -70 }}>
                <AntDesign name='closecircleo' size={24} color='#000000' />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 50 }}></View>
          </View>
          {/* </ImageBackground> */}
        </View>
        <View style={{ marginBottom: 50 }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default consultantsScreen;