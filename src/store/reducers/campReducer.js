const initState = {
  isLoaded: false,
  camp: null,
  formCompleted: false,
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

    case "ANN_CREATED":
      console.log("Announcement created successfully");
      return {
        ...state,
        formCompleted: true,
      };

    case "ANN_DELETED":
      console.log("Announcement deleted successfully");
      return {
        ...state,
      };

    case "ANN_EDITED":
      console.log("Announcement edited successfully");
      return {
        ...state,
        formCompleted: true,
      };

    case "RESET_FORM":
      console.log("Form reset");
      return {
        ...state,
        formCompleted: false,
      };

    default:
      return state;
  }
};

export default campReducer;
