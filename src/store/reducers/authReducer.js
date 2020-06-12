const initState = {
  isAuthed: false,
  formCompleted: false,
  formFailed: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Login success");
      return {
        ...state,
        isAuthed: true,
      };

    case "LOGIN_ERROR":
      console.log(action.err.message);
      return state;

    case "SIGNUP_SUCCESS":
      console.log("Signup success");
      return {
        ...state,
        formCompleted: true,
      };

    case "SIGNUP_ERROR":
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

    case "RESET_FORM":
      console.log("Form reset");
      return {
        ...state,
        formCompleted: false,
        formFailed: false,
      };

    default:
      return state;
  }
};

export default authReducer;
