export const storeCampInfo = (camp) => {
  return (dispatch, getState) => {
    dispatch({ type: "CAMP_STORED", camp });
  };
};

// SEND HELP HERE LIONEL
// OKAY I TRIED NORMAL AND ASYNC ALREADY
export const fetchCampInfo = (campId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log("here");
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
      .doc(camp.campId)
      .collection("announcements")
      .add({
        title: state.title,
        content: state.content,
        timestamp: firestore.Timestamp.now(),
      })
      .then(() => {
        console.log("Announcement created successfully");
      })
      .catch((err) => {
        console.log("error creating announcement:");
        console.log(err);
      });
  };
};
