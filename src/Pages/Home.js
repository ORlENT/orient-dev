import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../UI";

class Home extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Home</Header>
        <NavButton to="/join">Join Camp</NavButton>
        <NavButton to="/create">Create New Camp</NavButton>
      </CenterBox>
    );
  }
}

export default Home;
