import React, { Component } from "react";
import { Header, NavButton, CenterBox, Field } from "../UI";

class Login extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Login</Header>
        <Field>Username</Field>
        <Field>Password</Field>
        <NavButton to="/camps">Login</NavButton>
      </CenterBox>
    );
  }
}

export default Login;
