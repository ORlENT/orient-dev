export const signIn = (camp, state) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const email = camp.campCode + "@orient.org";

    console.log(email, state.password);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, state.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signUp = (state) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const email = state.campCode + "@orient.org";

  let user = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, state.password)
    .catch((err) => {
      dispatch({ type: "SIGNUP_ERROR", err });
    });

  if (user) {
    console.log("Account created, Creating camp " + state.campCode);
    await getFirestore()
      .collection("camps")
      .doc(state.campCode)
      .set({
        campCode: state.campCode,
        campName: state.campName,
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        console.log("error creating camp");
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  }
};
