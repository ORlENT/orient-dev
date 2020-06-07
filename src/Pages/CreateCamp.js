import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, SubmitButton, CenterBox, Field } from "../UI";
import { signUp } from "../store/actions/authActions";

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
    this.props.signUp(this.state);
  };

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
        <Field id="password" onChange={this.handleChange} password>
          Password
        </Field>
        <div onClick={this.handleSubmit}>
          <SubmitButton>Create New Camp</SubmitButton>
        </div>
      </CenterBox>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (state) => dispatch(signUp(state)),
  };
};

export default connect(null, mapDispatchToProps)(CreateCamp);
