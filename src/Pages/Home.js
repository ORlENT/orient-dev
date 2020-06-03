import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../UI";

class Home extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Home</Header>
        <NavButton to="/login">Login</NavButton>
        <NavButton to="/register">Register</NavButton>
        <NavButton to="/join">Join Camp as Guest</NavButton>
      </CenterBox>
    );
  }
}

export default Home;
