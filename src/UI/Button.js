import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { dispatchType, setConfirmMenuKey } from "../store/actions";

const MyButton = ({ secondary, admin, children, ...rest }) => (
  <Button
    variant={secondary ? "outlined" : "contained"}
    color={admin ? "secondary" : "primary"}
    style={{
      width: "100%",
    }}
    {...rest}
  >
    {children}
  </Button>
);

export const NavButton = ({ to, children, ...rest }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <MyButton {...rest}>{children}</MyButton>
  </Link>
);

export const SubmitButton = ({ children, ...rest }) => (
  <MyButton type="submit" {...rest}>
    {children}
  </MyButton>
);

class DeleteButton extends Component {
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
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { id, children, onClick, ...rest } = this.props;
    return (
      <MyButton
        type="submit"
        onClick={() => {
          this.props.setConfirmMenuKey(id);
          this.props.dispatchType("CONFIRM_FORM_OPEN");
        }}
        {...rest}
      >
        {children}
      </MyButton>
    );
  }
}

DeleteButton.defaultProps = {
  confirmFormKey: null,
  dispatchType: () => null,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
