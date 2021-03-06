import {
  fetchSubCollection,
  deleteSubCollectionDoc,
  addSubCollectionDoc,
} from "./abstractActions.js";

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
        email: state.email,
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

    // Fetch Correct User Status
    // var isAuthed = false;
    // if (user) {
    //   isAuthed = true;
    // }

    // Fetch camp info
    console.log("Fetching camp info");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", campCode)
      .limit(1)
      .get()
      .then(async (querySnapshot) => {
        if (!querySnapshot.empty) {
          var camp = querySnapshot.docs[0].data();

          // Fetch Announcements
          var ann = fetchSubCollection(
            querySnapshot.docs[0].ref,
            camp,
            "announcements"
          );

          // Fetch Questions
          var qna = fetchSubCollection(
            querySnapshot.docs[0].ref,
            camp,
            "questions"
          );

          // Fetch Reports
          var rem = fetchSubCollection(
            querySnapshot.docs[0].ref,
            camp,
            "reminders"
          );

          // Fetch Reports
          var rpt = fetchSubCollection(
            querySnapshot.docs[0].ref,
            camp,
            "reports"
          );

          // Fetch Groups
          var grp = fetchSubCollection(
            querySnapshot.docs[0].ref,
            camp,
            "groups",
            ["point"],
            ["desc"]
          );

          await Promise.all([ann, qna, rem, rpt, grp]);

          // Set sessionStorage for announcements unread
          var annCachedInfo = JSON.parse(
            sessionStorage.getItem("announcements")
          );

          if (!annCachedInfo) annCachedInfo = {};

          Object.keys(camp["announcements"]).map((key) => {
            if (!annCachedInfo[`${key}`]) {
              annCachedInfo[`${key}`] = {};
              annCachedInfo[`${key}`].readStatus = false;
              annCachedInfo[`${key}`].reactions = {
                "0": false,
                "1": false,
                "2": false,
                "3": false,
                "4": false,
                "5": false,
              };
            }
            return annCachedInfo[`${key}`];
          });

          sessionStorage.setItem(
            "announcements",
            JSON.stringify(annCachedInfo)
          );

          dispatch({
            type: "CAMP_RETRIEVED",
            camp: camp,
            campCode: campCode,
          });
        } else {
          console.log("Camp " + campCode + " not found");
          dispatch({
            type: "CAMP_RETRIEVED",
            camp: null,
            campCode: campCode,
          });
        }
        return;
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const addCampListener = (campCode) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("Adding listeners...");

    getFirestore()
      .collection("camps")
      .where("campCode", "==", campCode)
      .limit(1)
      .onSnapshot(() => dispatch(fetchCampInfo(campCode)));

    getFirestore()
      .collection("camps")
      .where("campCode", "==", campCode)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("Camp " + campCode + " not found");
          dispatch({
            type: "CAMP_RETRIEVED",
            camp: null,
            campCode: campCode,
          });
          return;
        }

        const ref = querySnapshot.docs[0].ref;
        const collections = [
          "announcements",
          "reminders",
          "questions",
          "reports",
          "groups",
        ];

        collections.forEach((col) => {
          ref
            .collection(col)
            .onSnapshot(() => dispatch(fetchCampInfo(campCode)));
        });
      });

    console.log("Listeners added");
  };
};

export const editCamp = (state, props) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log("Editing camp");
  // Update campName
  getFirestore()
    .collection("camps")
    .where("campCode", "==", getState().store.camp.campCode)
    .get()
    .then((querySnapshot) => {
      const camp = querySnapshot.docs[0].ref;
      console.log(querySnapshot.docs[0]);
      console.log(camp);
      camp.set({
        campName: state.campName,
        campCode: getState().store.camp.campCode,
        email: state.email,
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
    addSubCollectionDoc(
      getFirestore, // getFireStore
      dispatch,
      "announcements",
      {
        title: state.title,
        content: state.content,
        timestamp: getFirestore().Timestamp.now(),
      },
      getState().store.camp.campCode,
      "ANN_CREATED"
    );
  };
};

export const editAnn = (state, props) => {
  console.log(props);
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
          .then((ref) => {
            console.log(ref);
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

export const updateReaction = (emoji, annID, number) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  return getFirestore()
    .collection("camps")
    .where("campCode", "==", getState().store.camp.campCode)
    .get()
    .then((querySnapshot) => {
      const camp = querySnapshot.docs[0].ref;
      camp
        .collection("announcements")
        .doc(annID)
        .get()
        .then((ref) => {
          var reactions = ref.data().reactions
            ? ref.data().reactions
            : new Map();
          if (reactions[`${emoji}`] == null) {
            reactions[`${emoji}`] = 0;
          }
          reactions[emoji] += number;
          camp
            .collection("announcements")
            .doc(annID)
            .set(
              {
                reactions: JSON.parse(JSON.stringify(reactions)),
              },
              { merge: true }
            )
            .then(() => {
              dispatch({ type: "UPDATE_REACTION" });
              return;
            });
        })
        .catch((err) => {
          console.log("Error editing reaction:");
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("Error retrieving camp");
      console.log(err);
    });
};

export const deleteAnn = (annID, props) => {
  return (dispatch, getState, { getFirestore }) => {
    if (props) {
      deleteSubCollectionDoc(
        getFirestore,
        dispatch,
        "announcements",
        annID,
        getState().store.camp.campCode,
        "ANN_DELETED",
        props.history
      );
    } else {
      deleteSubCollectionDoc(
        getFirestore,
        dispatch,
        "announcements",
        annID,
        getState().store.camp.campCode,
        "ANN_DELETED"
      );
    }
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
          .then((doc) => {
            var qnaCachedInfo = JSON.parse(sessionStorage.getItem("questions"));
            if (!qnaCachedInfo) {
              qnaCachedInfo = {};
            }
            qnaCachedInfo[`${doc.id}`] = {};
            qnaCachedInfo[`${doc.id}`].askedStatus = true;
            sessionStorage.setItem("questions", JSON.stringify(qnaCachedInfo));
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

export const deleteQna = (qnaID, props) => {
  return (dispatch, getState, { getFirestore }) => {
    if (props) {
      deleteSubCollectionDoc(
        getFirestore,
        dispatch,
        "questions",
        qnaID,
        getState().store.camp.campCode,
        "QNA_DELETED",
        props.history
      );
    } else {
      deleteSubCollectionDoc(
        getFirestore,
        dispatch,
        "questions",
        qnaID,
        getState().store.camp.campCode,
        "QNA_DELETED"
      );
    }
  };
};

export const createAnnRem = (state, props) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Creating reminder");
    const annID = props.annID;

    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot, props) => {
        const camp = querySnapshot.docs[0].ref;

        camp
          .collection("reminders")
          .add({
            title: state.title,
            duedate: new Date(state.duedate),
            timestamp: getFirestore().Timestamp.now(),
            annID: annID,
          })
          .then((doc) => {
            camp
              .collection("announcements")
              .doc(annID)
              .update({
                remID: doc.id,
              })
              .then(() => {
                dispatch({ type: "REMINDER_CREATED" });
              })
              .catch(() => {
                console.log("Error linking announcement with reminder.");
              });
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

export const createRem = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    addSubCollectionDoc(
      getFirestore, // getFireStore
      dispatch,
      "reminders",
      {
        title: state.title,
        duedate: new Date(state.duedate),
        timestamp: getFirestore().Timestamp.now(),
      },
      getState().store.camp.campCode,
      "REMINDER_CREATED"
    );
  };
};

export const editRem = (state, props) => {
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
          .doc(props.remID)
          .set({
            title: state.title,
            duedate: new Date(state.duedate),
            timestamp: getFirestore().Timestamp.now(),
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

export const deleteRem = (remID) => {
  return (dispatch, getState, { getFirestore }) => {
    deleteSubCollectionDoc(
      getFirestore,
      dispatch,
      "reminders",
      remID,
      getState().store.camp.campCode,
      "REMINDER_DELETED"
    );
  };
};

export const createRpt = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    addSubCollectionDoc(
      getFirestore, // getFireStore
      dispatch,
      "reports",
      {
        title: state.title,
        content: state.content,
        timestamp: getFirestore().Timestamp.now(),
      },
      getState().store.camp.campCode,
      "REPORT_CREATED"
    );
  };
};

export const deleteRpt = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    deleteSubCollectionDoc(
      getFirestore,
      dispatch,
      "reports",
      state.rptID,
      getState().store.camp.campCode,
      "REPORT_DELETED"
    );
  };
};

export const createGrp = (state) => {
  return (dispatch, getState, { getFirestore }) => {
    addSubCollectionDoc(
      getFirestore, // getFireStore
      dispatch,
      "groups",
      {
        groupName: state.groupname,
        point: parseInt(state.point),
        timestamp: getFirestore().Timestamp.now(),
      },
      getState().store.camp.campCode,
      "GROUP_CREATED"
    );
  };
};

export const addPt = (state, props) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Creating group");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("groups")
          .doc(props.grpID)
          .update({
            point:
              parseInt(getState().store.camp.groups[props.grpID].point) +
              parseInt(state.newpoint),
            timestamp: getFirestore().Timestamp.now(),
          })
          .then(() => {
            dispatch({ type: "ADD_POINTS" });
          })
          .catch((err) => {
            console.log("Error adding points");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const transferPt = (state, props) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log("Transferring points");
  console.log(state.point);
  console.log(state.groupname);
  console.log(state.groupname2);
  await getFirestore()
    .collection("camps")
    .where("campCode", "==", getState().store.camp.campCode)
    .get()
    .then((querySnapshot) => {
      const camp = querySnapshot.docs[0].ref;
      camp
        .collection("groups")
        .doc(state.groupname)
        .update({
          point:
            parseInt(getState().store.camp.groups[state.groupname].point) -
            parseInt(state.point),
          timestamp: getFirestore().Timestamp.now(),
        })
        .catch((err) => {
          console.log("Error transferring points");
          console.log(err);
        });

      camp
        .collection("groups")
        .doc(state.groupname2)
        .update({
          point:
            parseInt(getState().store.camp.groups[state.groupname2].point) +
            parseInt(state.point),
          timestamp: getFirestore().Timestamp.now(),
        })
        .then(() => {
          dispatch({ type: "TRANSFER_POINTS" });
        })
        .catch((err) => {
          console.log("Error transfering points");
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("Error retrieving camp");
      console.log(err);
    });
};

export const deleteGrp = (grpID, props) => {
  return (dispatch, getState, { getFirestore }) => {
    if (props) {
      deleteSubCollectionDoc(
        getFirestore,
        dispatch,
        "groups",
        grpID,
        getState().store.camp.campCode,
        "GROUP_DELETED",
        props.history
      );
    } else {
      deleteSubCollectionDoc(
        getFirestore,
        dispatch,
        "groups",
        grpID,
        getState().store.camp.campCode,
        "GROUP_DELETED"
      );
    }
  };
};

export const resetForm = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_FORM" });
  };
};

export const dispatchType = (type) => async (dispatch) => {
  dispatch({
    type: type,
  });
};

export const setConfirmMenuKey = (key) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CONFIRM_MENU_KEY",
      confirmFormKey: key,
    });
  };
};
