import { db } from "../../Firebase/firebase";

export const signIn = (state) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signUp = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const email = state.campCode + "@orient.org";

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, state.password)
      .then(() => {
        console.log("Account created, Creating camp " + state.campCode);
        db.collection("camps")
          .doc(state.campCode)
          .set({
            campName: state.campName,
          })
          .then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err });
          });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
