import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAWYjOTw7i77NwzxdkpWgHjfSND02_rd9U",
  authDomain: "chatapp-468d1.firebaseapp.com",
  projectId: "chatapp-468d1",
  storageBucket: "chatapp-468d1.appspot.com",
  messagingSenderId: "894903640814",
  appId: "1:894903640814:web:18c3d648976accf95f89ff",
  measurementId: "G-H1R8E9QP4F"
};

// Initialize Firebase
let app;

if (firebase.default.apps.length === 0 ){
    app = firebase.default.initializeApp(firebaseConfig);
} else {
    app = firebase.default.app();
}

const db  = app.firestore();
const auth = firebase.default.auth();
export { db, auth } ;