export const signIn = (state) => {
  return (dispatch, getState, { getFirebase }) => {
    const email = getState().store.camp.campCode + "@orient.org";
    console.log("Signing in with:", email, state.password);

    getFirebase()
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
  const email = state.campCode + "@orient.org";
  console.log("Signing up with:", email, state.password);

  let user = await getFirebase()
    .auth()
    .createUserWithEmailAndPassword(email, state.password)
    .catch((err) => {
      dispatch({ type: "SIGNUP_ERROR", err });
    });

  if (user) {
    console.log("Account created, Creating camp:" + state.campCode);
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
        dispatch({ type: "CAMP_CREATE_ERROR", err });
      });
  }
};

export const editAuth = (state) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const email = state.campCode + "@orient.org";
  console.log("Signing up with:", email, state.password);

  let user = await getFirebase()
    .auth()
    .createUserWithEmailAndPassword(email, state.password)
    .catch((err) => {
      dispatch({ type: "SIGNUP_ERROR", err });
    });

  if (user) {
    console.log("Account created, Creating camp:" + state.campCode);
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
        dispatch({ type: "CAMP_CREATE_ERROR", err });
      });
  }
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    console.log("Signing out");

    getFirebase()
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const fetchCampInfo = (campId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("Fetching camp info");

    getFirestore()
      .collection("camps")
      .doc(campId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const camp = doc.data();
          getFirestore()
            .collection("camps")
            .doc(campId)
            .collection("announcements")
            .get()
            .then((querySnapshot) => {
              camp["announcements"] = {};
              for (let i = 0; i < querySnapshot.docs.length; i++) {
                camp["announcements"][
                  querySnapshot.docs[i].id
                ] = querySnapshot.docs[i].data();
              }
              dispatch({ type: "CAMP_RETRIEVED", camp: camp });
            })
            .catch((err) => {
              console.log("Error retrieving announcements");
              console.log(err);
            });
        } else {
          console.log("No camp found");
          dispatch({ type: "CAMP_RETRIEVED", camp: null });
        }
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const editCamp = (state) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log("Editing camp");
  const email = getState().store.camp.campCode + "@orient.org";
  // If campCode have change
  // getFirebase()
  //   .auth.currentUser
  // let user = await getFirebase()
  //   .auth()
  //   .updateEmail(email)
  //   .then((success) => {
  //     console.log("sucess");
  //   })
  //   .catch((err) => {
  //     dispatch({ type: "SIGNUP_ERROR", err });
  //   });

  // getFirestore()
  //   .collection("camps")
  //   .doc(getState().store.camp.campCode)
  //   .set({
  //     campCode: state.campCode,
  //     campName: state.campName,
  //   })
  //   .then(() => {
  //     dispatch({ type: "CAMP_EDITED" });
  //   })
  //   .catch((err) => {
  //     console.log("Error editing camp");
  //     console.log(err);
  //   });
};

export const deleteCamp = (camp, state, campID) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Deleting camp");

    getFirestore()
      .collection("camps")
      .doc(camp.campCode)
      .delete()
      .then(() => {
        dispatch({ type: "CAMP_DELETED", camp });
      })
      .catch((err) => {
        console.log("Error deleting camp");
        console.log(err);
      });
  };
};

export const createAnn = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Creating announcement");

    getFirestore()
      .collection("camps")
      .doc(getState().store.camp.campCode)
      .collection("announcements")
      .add({
        title: state.title,
        content: state.content,
        timestamp: getFirestore().Timestamp.now(),
      })
      .then(() => {
        dispatch({ type: "ANN_CREATED" });
      })
      .catch((err) => {
        console.log("Error creating announcement:");
        console.log(err);
      });
  };
};

export const editAnn = (state, props) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Editing announcement");

    getFirestore()
      .collection("camps")
      .doc(getState().store.camp.campCode)
      .collection("announcements")
      .doc(props.annID)
      .set({
        title: state.title,
        content: state.content,
        timestamp: getFirestore().Timestamp.now(),
      })
      .then(() => {
        dispatch({ type: "ANN_EDITED" });
      })
      .catch((err) => {
        console.log("Error editing announcement:");
        console.log(err);
      });
  };
};

export const deleteAnn = (camp, state, annID) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Editing announcement");

    getFirestore()
      .collection("camps")
      .doc(camp.campCode)
      .collection("announcements")
      .doc(annID)
      .delete()
      .then(() => {
        dispatch({ type: "ANN_DELETED", camp });
      })
      .catch((err) => {
        console.log("Error deleting announcement");
        console.log(err);
      });
  };
};

export const resetForm = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_FORM" });
  };
};
