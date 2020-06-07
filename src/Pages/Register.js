import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, SubmitButton, CenterBox, Field } from "../UI";
import { signUp } from "../store/actions/authActions";

class Register extends Component {
  state = {
    email: "",
    username: "",
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
        <Header>Register</Header>
        <Field id="email" onChange={this.handleChange}>
          Email
        </Field>
        <Field id="username" onChange={this.handleChange}>
          Username
        </Field>
        <Field id="password" onChange={this.handleChange} password>
          Password
        </Field>
        <div onClick={this.handleSubmit}>
          <SubmitButton>Register</SubmitButton>
        </div>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (state) => dispatch(signUp(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
