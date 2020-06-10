import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field } from "../UI";
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

  handleSubmit = () => {
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
        <Field id="campName" onChange={this.handleChange}>
          Camp Name
        </Field>
        <Field id="campCode" onChange={this.handleChange}>
          Camp Code
        </Field>
        <Field
          id="password"
          password
          onChange={this.handleChange}
          onEnter={this.handleSubmit}
        >
          Password
        </Field>
        <SubmitButton onClick={this.handleSubmit}>Create New Camp</SubmitButton>
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
