const initState = {
  isAuthed: false,
  formSuccess: false,
  formFailed: false,
  isLoaded: false,
  camp: null,
};

const myReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Login success");
      return {
        ...state,
        isAuthed: true,
      };

    case "LOGIN_ERROR":
      console.log("Login error");
      console.log(action.err.message);
      return {
        ...state,
        formFailed: true,
      };

    case "SIGNUP_SUCCESS":
      console.log("Signup success");
      return {
        ...state,
        formSuccess: true,
      };

    case "SIGNUP_ERROR":
      console.log("Signup error");
      console.log(action.err.message);
      return {
        ...state,
        formFailed: true,
      };

    case "CAMP_CREATE_ERROR":
      console.log("Camp creation error");
      console.log(action.err.message);
      return {
        ...state,
        formFailed: true,
      };

    case "SIGNOUT_SUCCESS":
      console.log("Signout success");
      return {
        ...state,
        isAuthed: false,
      };

    case "CAMP_RETRIEVED":
      console.log("Camp retrieved successfully", action.camp);
      return {
        ...state,
        camp: action.camp,
        isLoaded: true,
      };

    case "ANN_CREATED":
      console.log("Announcement created successfully");
      return {
        ...state,
        formSuccess: true,
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
        formSuccess: true,
      };

    case "CAMP_EDITED":
      console.log("Camp edited successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "RESET_FORM":
      console.log("Form reset");
      return {
        ...state,
        formSuccess: false,
        formFailed: false,
      };

    default:
      return state;
  }
};

export default myReducer;
