export const storeCampInfo = (camp) => {
  return (dispatch, getState) => {
    dispatch({ type: "CAMP_STORED", camp });
  };
};
