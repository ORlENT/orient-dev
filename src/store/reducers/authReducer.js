const initState = {
  isAuthed: false,
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
      return state;

    case "SIGNUP_ERROR":
      console.log(action.err.message);
      return state;

    default:
      return state;
  }
};

export default authReducer;
