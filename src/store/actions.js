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
      .doc(user.user.uid)
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

export const editPassword = (state) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  console.log("Editing Password");
  // Update email
  await getFirebase()
    .auth()
    .currentUser.updatePassword(state.password)
    .then((success) => {
      console.log("Updated password");
      dispatch({ type: "PASSWORD_EDITED" });
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_EMAIL_ERR", err });
    });
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

export const fetchCampInfo = (campCode) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Fetching camp info");
    if (getState().firebase.auth.email) {
      console.log(getState());
      getFirestore()
        .collection("camps")
        .doc(getState().firebase.auth.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const camp = doc.data();
            console.log(doc);
            getFirestore()
              .collection("camps")
              .doc(getState().firebase.auth.uid)
              .collection("announcements")
              .get()
              .then((querySnapshot) => {
                camp["announcements"] = {};
                for (let i = 0; i < querySnapshot.docs.length; i++) {
                  camp["announcements"][
                    querySnapshot.docs[i].id
                  ] = querySnapshot.docs[i].data();
                }
                dispatch({
                  type: "CAMP_RETRIEVED",
                  camp: camp,
                  campCode: campCode,
                });
              })
              .catch((err) => {
                console.log("Error retrieving announcements");
                console.log(err);
              });
          } else {
            console.log("Camp " + campCode + " not found");
            dispatch({
              type: "CAMP_RETRIEVED",
              camp: null,
              campCode: campCode,
            });
          }
        })
        .catch((err) => {
          console.log("Error retrieving camp");
          console.log(err);
        });
    } else {
      getFirestore()
        .collection("camps")
        .where("campCode", "==", campCode)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const camp = querySnapshot.docs[0].data();
            querySnapshot.docs[0].ref
              .collection("announcements")
              .get()
              .then((querySnapshot) => {
                camp["announcements"] = {};
                for (let i = 0; i < querySnapshot.docs.length; i++) {
                  camp["announcements"][
                    querySnapshot.docs[i].id
                  ] = querySnapshot.docs[i].data();
                }
                dispatch({
                  type: "CAMP_RETRIEVED",
                  camp: camp,
                  campCode: campCode,
                });
              })
              .catch((err) => {
                console.log("Error retrieving announcements");
                console.log(err);
              });
          } else {
            console.log("Camp " + campCode + " not found");
            dispatch({
              type: "CAMP_RETRIEVED",
              camp: null,
              campCode: campCode,
            });
          }
        })
        .catch((err) => {
          console.log("Error retrieving camp");
          console.log(err);
        });
    }
  };
};

export const editCamp = (state) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log("Editing camp");
  const campCode = state.campCode;
  const email = campCode + "@orient.org";

  // Update email
  if (campCode !== getState().store.camp.campCode) {
    await getFirebase()
      .auth()
      .currentUser.updateEmail(email)
      .then((success) => {
        console.log("Updated email");
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_EMAIL_ERR", err });
      });
  }

  // Update campCode and campName
  await getFirestore()
    .collection("camps")
    .where("campCode", "==", getState().store.camp.campCode)
    .get()
    .then((querySnapshot) => {
      const camp = querySnapshot.docs[0].ref;
      console.log(querySnapshot.docs[0]);
      console.log(camp);
      camp.set({
        campCode: state.campCode,
        campName: state.campName,
      });
    })
    .then(() => {
      dispatch({ type: "CAMP_EDITED" });
    })
    .catch((err) => {
      console.log("Error editing camp");
      console.log(err);
    });
};

export const deleteCamp = (state) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log("Deleting camp");
  console.log(getState().store.camp.campCode);
  await getFirestore()
    .collection("camps")
    .where("campCode", "==", getState().store.camp.campCode)
    .get()
    .then((querySnapshot) => {
      const camp = querySnapshot.docs[0].ref;
      console.log(querySnapshot.docs[0]);
      console.log(camp);
      return camp.delete().then(() => {
        dispatch({ type: "CAMP_DELETED" });
      });
    })
    .catch((err) => {
      console.log("Error deleting camp");
      console.log(err);
    });
};

export const createAnn = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Creating announcement");

    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
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
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const editAnn = (state, props) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Editing announcement");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
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
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const deleteAnn = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Editing announcement");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("announcements")
          .doc(state.annID)
          .delete()
          .then(() => {
            dispatch({ type: "ANN_DELETED" });
          })
          .catch((err) => {
            console.log("Error deleting announcement");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const resetForm = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_FORM" });
  };
};
