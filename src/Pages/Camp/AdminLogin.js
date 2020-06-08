import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../../UI";

class AdminLogin extends Component {
  render() {
    const { match } = this.props;
    return (
      <CenterBox>
        <Header>Camp {match.params.id} was not found</Header>
        <NavButton to="/join">Join Another Camp</NavButton>
        <NavButton to="/create">Create New Camp</NavButton>
      </CenterBox>
    );
  }
}

export default AdminLogin;
