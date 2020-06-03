import React, { Component } from "react";
import { Header, NavButton, CenterBox, Field } from "../UI";

class JoinCamp extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Join Camp</Header>
        <Field>Camp Code</Field>
        <NavButton to="/camp/1234">Join Camp 1234</NavButton>
      </CenterBox>
    );
  }
}

export default JoinCamp;
