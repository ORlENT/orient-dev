export const storeCampInfo = (camp) => {
  return (dispatch, getState) => {
    dispatch({ type: "CAMP_STORED", camp });
  };
};

export const createAnn = (camp, state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
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
        console.log("Announcement created successfully");
      })
      .catch((err) => {
        console.log("error creating announcement:");
        console.log(err);
      });
  };
};
