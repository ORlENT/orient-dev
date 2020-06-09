const initState = {};

const campReducer = (state = initState, action) => {
  switch (action.type) {
    case "CAMP_STORED":
      console.log("Camp stored in redux store");
      return {
        ...state,
        camp: action.camp,
      };

    default:
      return state;
  }
};

export default campReducer;
