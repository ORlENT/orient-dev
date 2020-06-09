export const storeCamp = (camp) => {
  return (dispatch, getState) => {
    dispatch({ type: "CAMP_STORED", camp });
  };
};
