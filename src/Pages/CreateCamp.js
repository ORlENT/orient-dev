import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../UI";
import { signUp, resetForm } from "../store/actions";

class CreateCamp extends Component {
  state = {
    campName: "",
    campCode: "",
    campCodeError: "",
    password: "",
    passwordError: "",
    loading: false,
  };

  validatePassword = () => {
    const valid =
      this.state.password.length <= 0 || this.state.password.length >= 8;
    this.setState({
      passwordError: valid ? "" : "Password must be at least 8 characters",
    });
    return valid;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validatePassword()) {
      this.props.signUp(this.state);
      this.setState({
        loading: true,
        campCodeError: "",
      });
    }
  };

  componentDidUpdate() {
    if (this.props.formCompleted) {
      this.props.resetForm();
      this.setState({
        loading: false,
      });
      this.props.history.push(
        `${this.props.match.url}`.replace(
          "/create",
          `/camp/${this.state.campCode}`
        )
      );
    }

    if (this.props.formFailed) {
      this.props.resetForm();
      this.setState({
        loading: false,
        campCodeError: "Camp Code is already in use",
      });
    }
  }

  render() {
    return (
      <CenterBox>
        <Header>Create New Camp</Header>
        <Form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          loading={this.state.loading}
        >
          <Field id="campName">Camp Name</Field>
          <Field id="campCode" errorText={this.state.campCodeError}>
            Camp Code
          </Field>
          <Field
            id="password"
            password
            onBlur={this.validatePassword}
            errorText={this.state.passwordError}
          >
            Password
          </Field>
          <SubmitButton>Create New Camp</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    formCompleted: state.store.formCompleted,
    formFailed: state.store.formFailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (state) => dispatch(signUp(state)),
    resetForm: () => dispatch(resetForm()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(CreateCamp);
