import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZr2HtIkFH27GoJJVl6CNHajLtPxtfdUs",
  authDomain: "orient-dev-fc72f.firebaseapp.com",
  databaseURL: "https://orient-dev-fc72f.firebaseio.com",
  projectId: "orient-dev-fc72f",
  storageBucket: "orient-dev-fc72f.appspot.com",
  messagingSenderId: "615546812534",
  appId: "1:615546812534:web:c6db757561929399408757",
  measurementId: "G-RBRN4LZ424",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
