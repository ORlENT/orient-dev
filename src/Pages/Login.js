import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, SubmitButton, CenterBox, Field } from "../UI";
import { signIn } from "../store/actions/authActions";

class Login extends Component {
  state = {
    email: "",
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
      <CenterBox>
        <Header>Login</Header>
        <Field id="email" onChange={this.handleChange}>
          Email
        </Field>
        <Field id="password" onChange={this.handleChange} password>
          Password
        </Field>
        <div onClick={this.handleSubmit}>
          <SubmitButton>Login</SubmitButton>
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
    signIn: (state) => dispatch(signIn(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
