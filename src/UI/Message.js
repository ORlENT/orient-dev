import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { connect } from "react-redux";
import { dispatchType } from "../store/actions";

import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Message extends Component {
  renderStyle(param) {
    switch (param) {
      case "success":
        return { backgroundColor: "#66ff00", color: "black" };
      case "fail":
        return { backgroundColor: "red", color: "black" };
      default:
        return {};
    }
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={this.props.message != null}
        key={this.props.message}
        autoHideDuration={2000}
        onClose={() => this.props.dispatchType("CLEAR_MESSAGE")}
        TransitionComponent={Transition}
      >
        <SnackbarContent
          message={this.props.message}
          style={this.renderStyle(this.props.messageType)}
        />
      </Snackbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    message: state.store.message,
    messageType: state.store.messageType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchType: (type) => dispatch(dispatchType(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
