export const signIn = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const email = getState().store.camp.campCode + "@orient.org";
    console.log("Signing in with:", email, state.password);

    getFirebase()
      .auth()
      .signInWithEmailAndPassword(email, state.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });

        getFirestore().collection("camps").get();
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
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Sign out if logged in for a different camp
    const user = getFirebase().auth().currentUser;
    if (user && user.email.replace(/@[^@]+$/, "") !== campCode) {
      dispatch(signOut());
    }

    // Fetch camp info
    console.log("Fetching camp info");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", campCode)
      .get()
      .then(async (querySnapshot) => {
        if (!querySnapshot.empty) {
          const camp = querySnapshot.docs[0].data();

          // Fetch Announcements
          await querySnapshot.docs[0].ref
            .collection("announcements")
            .get()
            .then((querySnapshot) => {
              camp["announcements"] = {};
              for (let i = 0; i < querySnapshot.docs.length; i++) {
                camp["announcements"][
                  querySnapshot.docs[i].id
                ] = querySnapshot.docs[i].data();
              }
            })
            .catch((err) => {
              console.log("Error retrieving announcements");
              console.log(err);
            });

          // Fetch Questions
          await querySnapshot.docs[0].ref
            .collection("questions")
            .get()
            .then((querySnapshot) => {
              camp["questions"] = {};
              for (let i = 0; i < querySnapshot.docs.length; i++) {
                camp["questions"][
                  querySnapshot.docs[i].id
                ] = querySnapshot.docs[i].data();
              }
            })
            .catch((err) => {
              console.log("Error retrieving questions");
              console.log(err);
            });

          dispatch({
            type: "CAMP_RETRIEVED",
            camp: camp,
            campCode: campCode,
          });
        } else {
          console.log("Camp " + campCode + " not found");
          dispatch({ type: "CAMP_RETRIEVED", camp: null, campCode: campCode });
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
  { getFirebase, getFirestore }
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

  await getFirebase()
    .auth()
    .currentUser.delete()
    .then((success) => {
      console.log("User deleted");
      dispatch({ type: "USER_DELETED" });
    })
    .catch((err) => {
      console.log("Error deleting user");
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

export const askQna = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Asking question");

    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("questions")
          .add({
            question: state.question,
            answer: null,
            timestamp: getFirestore().Timestamp.now(),
          })
          .then(() => {
            dispatch({ type: "QNA_ASKED" });
          })
          .catch((err) => {
            console.log("Error asking question:");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const answerQna = (state, props) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Editing question");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("questions")
          .doc(props.qnaID)
          .set({ answer: state.answer }, { merge: true })
          .then(() => {
            dispatch({ type: "QNA_ANSWERED" });
          })
          .catch((err) => {
            console.log("Error editing question:");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const deleteQna = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Editing question");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("questions")
          .doc(state.qnaID)
          .delete()
          .then(() => {
            dispatch({ type: "QNA_DELETED" });
          })
          .catch((err) => {
            console.log("Error deleting question");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const createReminder = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Creating reminder");

    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("reminders")
          .add({
            title: state.title,
            timestamp: state.time,
          })
          .then(() => {
            dispatch({ type: "REMINDER_CREATED" });
          })
          .catch((err) => {
            console.log("Error creating reminder");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const editReminder = (state, props) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Editing reminder");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("reminders")
          .doc(props.reminderID)
          .set({
            title: state.title,
            timestamp: state.time,
          })
          .then(() => {
            dispatch({ type: "REMINDER_EDITED" });
          })
          .catch((err) => {
            console.log("Error editing reminders");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const deleteReminder = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Editing reminder");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("reminders")
          .doc(state.reminderID)
          .delete()
          .then(() => {
            dispatch({ type: "REMINDER_DELETED" });
          })
          .catch((err) => {
            console.log("Error deleting reminder");
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
