import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import prodConfig from "./prodConfig.json";
import devConfig from "./devConfig.json";

const prodMode = false;

let config = null;

if (prodMode) {
  config = prodConfig;
} else {
  config = devConfig;
}

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
