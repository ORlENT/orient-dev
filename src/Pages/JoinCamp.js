import React, { Component } from "react";
import { Header, NavButton, CenterBox, Field } from "../UI";

class JoinCamp extends Component {
  state = {
    campCode: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <CenterBox>
        <Header>Join Camp</Header>
        <Field id="campCode" onChange={this.handleChange}>
          Camp Code
        </Field>
        <NavButton to={"/camp/" + this.state.campCode}>Join Camp</NavButton>
      </CenterBox>
    );
  }
}

export default JoinCamp;
