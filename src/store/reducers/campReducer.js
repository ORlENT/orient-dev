const initState = {
  isLoaded: false,
  camp: null,
};

const campReducer = (state = initState, action) => {
  switch (action.type) {
    case "CAMP_STORED":
      console.log("Camp stored in redux store:", state);
      return {
        ...state,
        camp: action.camp,
      };

    case "CAMP_RETRIEVED":
      state = {
        camp: action.camp,
        isLoaded: true,
      };
      console.log("Camp stored in redux store:", state);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default campReducer;
