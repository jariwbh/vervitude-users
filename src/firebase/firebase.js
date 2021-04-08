import firebase from '@react-native-firebase/app';

var firebaseConfig = {
	apiKey: 'AIzaSyDyLLNbXsTesRnTVR4DlhgNbQl875Hfju8',
	authDomain: 'membroz-vervitude.firebaseapp.com',
	projectId: 'membroz-vervitude',
	storageBucket: 'membroz-vervitude.appspot.com',
	messagingSenderId: '909517140999',
	appId: '1:909517140999:web:892bb94d74d185f52366a2',
	measurementId: 'G-JZTGCZB2JW'
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
