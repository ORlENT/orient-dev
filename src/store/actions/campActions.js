export const storeCampInfo = (camp) => {
  return (dispatch, getState) => {
    dispatch({ type: "CAMP_STORED", camp });
  };
};

export const editCamp = (camp, state, campID) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("camps")
      .doc(camp.campCode)
      .set({
        campCode: state.campCode,
        campName: state.campName,
      })
      .then(() => {
        dispatch({ type: "CAMP_EDITED", camp });
      })
      .catch((err) => {
        console.log("error editing camp");
        console.log(err);
      });
  };
};

export const deleteCamp = (camp, state, campID) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("camps")
      .doc(camp.campCode)
      .delete()
      .then(() => {
        dispatch({ type: "CAMP_DELETED", camp });
      })
      .catch((err) => {
        console.log("error deleting camp");
        console.log(err);
      });
  };
};

export const fetchCampInfo = (campId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    getFirestore()
      .collection("camps")
      .doc(campId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Camp retrieved successfully");
          const camp = doc.data();
          firestore
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
              console.log(err);
              console.log("Error retrieving announcements");
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

export const createAnn = (camp, state) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(camp, state);
    firestore
      .collection("camps")
      .doc(camp.campCode)
      .collection("announcements")
      .add({
        title: state.title,
        content: state.content,
        timestamp: firestore.Timestamp.now(),
      })
      .then(() => {
        dispatch({ type: "ANN_CREATED", camp });
      })
      .catch((err) => {
        console.log("error creating announcement:");
        console.log(err);
      });
  };
};

export const editAnn = (camp, state, annID) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("camps")
      .doc(camp.campCode)
      .collection("announcements")
      .doc(annID)
      .set({
        title: state.title,
        content: state.content,
        timestamp: firestore.Timestamp.now(),
      })
      .then(() => {
        dispatch({ type: "ANN_EDITED", camp });
      })
      .catch((err) => {
        console.log("error editing announcement:");
        console.log(err);
      });
  };
};

export const deleteAnn = (camp, state, annID) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("camps")
      .doc(camp.campCode)
      .collection("announcements")
      .doc(annID)
      .delete()
      .then(() => {
        dispatch({ type: "ANN_DELETED", camp });
      })
      .catch((err) => {
        console.log("error deleting announcement");
        console.log(err);
      });
  };
};

export const resetForm = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_FORM" });
  };
};
