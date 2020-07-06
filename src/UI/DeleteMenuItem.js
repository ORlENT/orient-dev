import React, { Component } from "react";
import { MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { dispatchType, setConfirmMenuKey } from "../store/actions";

class DeleteMenuItem extends Component {
  state = { callbackAction: null };

  componentDidMount() {
    if (this.state.callbackAction == null) {
      this.setState({
        callbackAction: () => {
          this.props.onClick();
        },
      });
    }
  }

  componentDidUpdate() {
    try {
      if (
        this.state.callbackAction &&
        this.props.confirm &&
        this.props.confirmFormKey === this.props.id
      ) {
        this.state.callbackAction();
        this.setState({
          callbackAction: null,
        });
        this.props.dispatchType("CONFIRM_FORM_CLOSE");
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <MenuItem
        key={this.props.key}
        onClick={() => {
          this.props.handleClose();
          this.props.setConfirmMenuKey(this.props.id);
          this.props.dispatchType("CONFIRM_FORM_OPEN");
        }}
      >
        Delete
      </MenuItem>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    confirm: state.store.confirm,
    confirmFormKey: state.store.confirmFormKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchType: (type) => dispatch(dispatchType(type)),
    setConfirmMenuKey: (key) => dispatch(setConfirmMenuKey(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMenuItem);
