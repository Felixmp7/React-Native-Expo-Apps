import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDUH4W3wd66dM-KwImriC9r-7MnfiPUCbY',
  authDomain: 'gifted-chat-5a4cf.firebaseapp.com',
  projectId: 'gifted-chat-5a4cf',
  storageBucket: 'gifted-chat-5a4cf.appspot.com',
  messagingSenderId: '895154524330',
  appId: '1:895154524330:web:ea72dd8f2f5f7f778600d3',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
