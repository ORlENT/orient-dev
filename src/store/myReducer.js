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
        message: "Login successfully.",
        messageType: "success",
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
        message: "Sign up successfully.",
        messageType: "success",
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
        message: "Announcement created successfully.",
        messageType: "success",
      };

    case "ANN_DELETED":
      console.log("Announcement deleted successfully");
      return {
        ...state,
        confirm: false,
        confirmForm: false,
        clearAction: true,
        confirmFormKey: null,
        message: "Announcement deleted successfully.",
        messageType: "success",
      };

    case "ANN_EDITED":
      console.log("Announcement edited successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Announcement edited successfully.",
        messageType: "success",
      };

    case "QNA_ASKED":
      console.log("Question asked successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Question added successfully.",
        messageType: "success",
      };

    case "QNA_DELETED":
      console.log("Question deleted successfully");
      return {
        ...state,
        message: "Question deleted successfully.",
        messageType: "success",
      };

    case "QNA_ANSWERED":
      console.log("Question answered successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Question answered successfully.",
        messageType: "success",
      };

    case "CAMP_EDITED":
      console.log("Camp edited successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Camp edited successfully.",
        messageType: "success",
      };

    case "REMINDER_EDITED":
      console.log("Reminder edited successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Reminder edited successfully.",
        messageType: "success",
      };

    case "REMINDER_CREATED":
      console.log("Reminder created successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Reminder added successfully.",
        messageType: "success",
      };

    case "REMINDER_DELETED":
      console.log("Reminder deleted successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Reminder deleted successfully.",
        messageType: "success",
      };

    case "PASSWORD_EDITED":
      console.log("Password edited successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Password edited successfully.",
        messageType: "success",
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
        message: "Camp deleted successfully.",
        messageType: "success",
      };

    case "REPORT_CREATED":
      console.log("Report created successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Report created successfully.",
        messageType: "success",
      };

    case "GROUP_CREATED":
      console.log("Group created successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Group created successfully.",
        messageType: "success",
      };

    case "GROUP_DELETED":
      console.log("Group deleted successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Group deleted successfully.",
        messageType: "success",
      };

    case "ADD_POINTS":
      console.log("Add points successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Points added successfully.",
        messageType: "success",
      };

    case "TRANSFER_POINTS":
      console.log("Transfer points successfully");
      return {
        ...state,
        formSuccess: true,
        message: "Points transferred successfully.",
        messageType: "success",
      };

    case "CONFIRM_FORM_OPEN":
      console.log("Open confirm form successfully");
      return {
        ...state,
        confirmForm: true,
      };

    case "CONFIRMFORM_CONFIRM":
      console.log("Confirm form confirmed");
      return {
        ...state,
        confirm: "true",
        confirmForm: false,
      };

    case "CONFIRM_FORM_CLOSE":
      console.log("Close confirm form successfully");
      return {
        ...state,
        confirm: false,
        confirmForm: false,
        confirmFormKey: null,
      };

    case "SET_CONFIRM_MENU_KEY":
      console.log("Confirm menu key set");
      return {
        ...state,
        confirmFormKey: action.confirmFormKey,
      };

    case "CLEAR_MESSAGE":
      console.log("Clear message");
      return {
        ...state,
        message: null,
        messageType: null,
      };

    case "UPDATE_REACTION":
      console.log("Update reaction successfully");
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default myReducer;
