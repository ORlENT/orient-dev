const initState = {
  isAuthed: false,
  formSuccess: false,
  formFailed: false,
  campLoaded: null,
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
      console.log("Camp retrieved:", action.camp);
      return {
        ...state,
        camp: action.camp,
        campLoaded: action.campCode,
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

    case "QNA_ASKED":
      console.log("Question asked successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "QNA_DELETED":
      console.log("Question deleted successfully");
      return {
        ...state,
      };

    case "QNA_ANSWERED":
      console.log("Question answered successfully");
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

    case "REMINDER_EDITED":
      console.log("Reminder edited successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "REMINDER_CREATED":
      console.log("Reminder created successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "REMINDER_DELETED":
      console.log("Reminder deleted successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "PASSWORD_EDITED":
      console.log("Password edited successfully");
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
    case "CAMP_DELETED":
      return {
        initState,
      };

    case "REPORT_CREATED":
      console.log("Report created successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "REPORT_DELETED":
      console.log("Report deleted successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "GROUP_CREATED":
      console.log("Group created successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "GROUP_DELETED":
      console.log("Group deleted successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "ADD_POINTS":
      console.log("Add points successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "TRANSFER_POINTS":
      console.log("Transfer points successfully");
      return {
        ...state,
        formSuccess: true,
      };

    case "CONFIRM_FORM_OPEN":
      console.log("Open confirm form successfully");
      return {
        ...state,
        confirmForm: true,
      };

    case "CONFIRM_FORM_CLOSE":
      console.log("Close confirm form successfully");
      return {
        ...state,
        confirmForm: false,
      };

    case "CALLBACK_SET":
      console.log("Callback successfully");
      return {
        ...state,
        callback: true,
      };

    case "CALLBACK_CLEAR":
      console.log("Callback clear successfully");
      return {
        ...state,
        callback: false,
      };
    case "REFRESH_PAGE":
      console.log("Refresh Page successfully");
      return {
        ...state,
        refreshPage: true,
      };

    case "REFRESH_PAGE_COMPLETED":
      console.log("finish Refresh Page successfully");
      return {
        ...state,
        refreshPage: false,
      };

    default:
      return state;
  }
};

export default myReducer;
