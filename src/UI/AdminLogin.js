import React, { Component } from "react";
import { Header, SubmitButton, CenterBox, Field } from "../UI";

class AdminLogin extends Component {
  state = {
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    return (
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", height: "100vh" }}>
        <CenterBox>
          <Header>Admin Login</Header>
          <Field id="password" onChange={this.handleChange}>
            Password
          </Field>
          <div onClick={this.handleSubmit}>
            <SubmitButton>Login</SubmitButton>
          </div>
          <div onClick={this.props.toggleVisibility}>
            <SubmitButton>Back</SubmitButton>
          </div>
        </CenterBox>
      </div>
    );
  }
}

export default AdminLogin;
