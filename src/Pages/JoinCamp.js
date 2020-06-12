import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../UI";

class JoinCamp extends Component {
  state = {
    campCode: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/camp/" + this.state.campCode);
  };

  render() {
    return (
      <CenterBox>
        <Header>Join Camp</Header>
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Field id="campCode">Camp Code</Field>
          <SubmitButton>Join Camp</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

export default withRouter(JoinCamp);
