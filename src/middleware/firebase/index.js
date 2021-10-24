import firebase from 'firebase/compat';
const app = require("firebase/app")

firebase.initializeApp( {
  apiKey: "AIzaSyDVMVLFSZqzGq2bvBMM3Me8pKmycGs_Pbo",
  authDomain: "flashmediascheduler.firebaseapp.com",
  databaseURL: "https://flashmediascheduler-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flashmediascheduler",
  storageBucket: "flashmediascheduler.appspot.com",
  messagingSenderId: "876047916440",
  appId: "1:876047916440:web:db729ab26ef0d6ccfd5fed",
  measurementId: "G-NB3G8ZGPNB"
});


export default {
  firebase,
  app
}
