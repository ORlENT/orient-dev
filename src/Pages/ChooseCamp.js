import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../UI";

class ChooseCamp extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Choose Camp</Header>
        <NavButton to="/camp/1234">Camp 1234</NavButton>
        <NavButton to="/join">Join new camp</NavButton>
        <NavButton to="/create">Create new camp</NavButton>
      </CenterBox>
    );
  }
}

export default ChooseCamp;
