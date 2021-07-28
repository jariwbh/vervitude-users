import firebase from '@react-native-firebase/app';

var firebaseConfig = {
	apiKey: "AIzaSyCScuYHUA1XXJYxg-7yUiYEhWYfXDlsZ_w",
	authDomain: "vervitude-redefined.firebaseapp.com",
	projectId: "vervitude-redefined",
	storageBucket: "vervitude-redefined.appspot.com",
	messagingSenderId: "79264411371",
	appId: "1:79264411371:web:f5781bcab700f01cadd8ae",
	measurementId: "G-GMS2SJ86TG"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
