import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGAINGSENDERID,
  appId: process.env.VUE_APP_APPID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
