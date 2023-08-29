import firebase from "firebase/compat/app";
import "firebase/compat/database";

var firebaseConfig = {
  apiKey: "AIzaSyA9i1XUXLZGWaYAMEWFeOp4pAx-ILQJzIA",
  authDomain: "guardian-cloud-7673c.firebaseapp.com",
  projectId: "guardian-cloud-7673c",
  storageBucket: "guardian-cloud-7673c.appspot.com",
  messagingSenderId: "1040060321645",
  appId: "1:1040060321645:web:48c5820f753e92fc601464"
};

const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();