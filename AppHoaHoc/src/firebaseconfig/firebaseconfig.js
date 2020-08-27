import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyA26vdBEJftQtcm64WaaSlKNscyalsZ820",
    authDomain: "reactnative1-aa91e.firebaseapp.com",
    databaseURL: "https://reactnative1-aa91e.firebaseio.com",
    projectId: "reactnative1-aa91e",
    storageBucket: "reactnative1-aa91e.appspot.com",
    messagingSenderId: "111024015932",
    appId: "1:111024015932:web:cb0be15daa71ff82259139",
    measurementId: "G-HM71E0PRV4"
  };

  export const firebaseApp=firebase.initializeApp(firebaseConfig);