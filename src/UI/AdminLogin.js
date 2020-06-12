import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, SubmitButton, CenterBox, Field, Form } from "../UI";
import { signIn } from "../store/actions";

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
          <Form admin onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Field id="password" password>
              Password
            </Field>
            <SubmitButton>Login</SubmitButton>
          </Form>
          <SubmitButton secondary admin onClick={this.props.toggleVisibility}>
            Back
          </SubmitButton>
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const camp = state.store.camp;
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
