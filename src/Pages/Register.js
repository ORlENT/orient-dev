import React, { Component } from "react";
import { Header, NavButton, CenterBox, Field } from "../UI";

class Register extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Register</Header>
        <Field>Email</Field>
        <Field>Username</Field>
        <Field>Password</Field>
        <NavButton to="/camps">Register</NavButton>
      </CenterBox>
    );
  }
}

export default Register;
