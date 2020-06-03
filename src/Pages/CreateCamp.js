import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../UI";

class CreateCamp extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Create Camp</Header>
        <NavButton to="/camp/1234">Create camp 1234</NavButton>
      </CenterBox>
    );
  }
}

export default CreateCamp;
