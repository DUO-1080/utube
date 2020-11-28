import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'utuclone.firebaseapp.com',
  databaseURL: 'https://utuclone.firebaseio.com',
  projectId: 'utuclone',
  storageBucket: 'utuclone.appspot.com',
  messagingSenderId: '800555659573',
  appId: '1:800555659573:web:343d04c93c36e3bc195c7c',
  measurementId: 'G-BJ81Y3GJQB',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const fireStorage = firebase.storage();

const authUiConfig = {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
  signInFlow: 'popup',
  callbacks: {
    async signInSuccessWithAuthResult(authResult, redirectURl) {
      localStorage.setItem('user', JSON.stringify(authResult));
      console.log('login seccess!!!', authResult);
      if (authResult.additionalUserInfo?.isNewUser) {
        await firestore
          .collection('userprofile')
          .doc(authResult.user.uid)
          .set({
            // uid: authResult.user.uid,
            displayName: authResult.user.displayName,
            photoURL:
              authResult.user.photoURL ||
              `https://avatars.dicebear.com/api/human/${authResult.user.displayName}.svg?options[w]=28&options[h]=28`,
            banner: '',
            history: [],
            uid: authResult.user.uid,
            // should I?
            // liked: [],
            // subscriptionChannels: [],
          });
      }

      window.location.reload();
      // operationType: signIn
      // firestore.collection('userprofile').doc()
      return false;
    },
  },
};

export { firebase, firestore, fireStorage, auth, authUiConfig, timestamp };
