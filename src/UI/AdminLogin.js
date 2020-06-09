import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, SubmitButton, CenterBox, Field } from "../UI";
import { signIn } from "../store/actions/authActions";

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
    this.props.signIn(this.props.camp, this.state);
  };

  render() {
    return (
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", height: "100vh" }}>
        <CenterBox>
          <Header>Admin Login</Header>
          <Field id="password" onChange={this.handleChange} password>
            Password
          </Field>
          <div onClick={this.handleSubmit}>
            <SubmitButton>Login</SubmitButton>
          </div>
          <div onClick={this.props.toggleVisibility}>
            <SubmitButton secondary>Back</SubmitButton>
          </div>
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const camp = state.camp.camp;
  return {
    camp: camp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (camp, state) => dispatch(signIn(camp, state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
