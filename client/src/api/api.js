import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBFodpFK_7p5sYf1wxv3qRly6NQFRPX4u8',
  authDomain: 'whack-a-diglett-483be.firebaseapp.com',
  databaseURL: 'https://whack-a-diglett-483be.firebaseio.com',
  projectId: 'whack-a-diglett-483be',
  storageBucket: 'whack-a-diglett-483be.appspot.com',
  messagingSenderId: '376899843786',
  appId: '1:376899843786:web:754e019af89e78a3',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
