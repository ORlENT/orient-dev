import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import campReducer from "./campReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  camp: campReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
