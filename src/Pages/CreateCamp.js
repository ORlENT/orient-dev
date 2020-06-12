import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../UI";
import { signUp, resetForm } from "../store/actions/authActions";

class CreateCamp extends Component {
  state = {
    campName: "",
    campCode: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT");
    this.props.signUp(this.state);
  };

  componentDidUpdate() {
    if (this.props.formCompleted) {
      resetForm();
      this.props.history.push(
        `${this.props.match.url}`.replace(
          "/create",
          `/camp/${this.state.campCode}`
        )
      );
    }
  }

  render() {
    return (
      <CenterBox>
        <Header>Create New Camp</Header>
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Field id="campName">Camp Name</Field>
          <Field id="campCode">Camp Code</Field>
          <Field id="password" password>
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
    formCompleted: state.auth.formCompleted,
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
