import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../../UI";

class Dashboard extends Component {
  render() {
    const { match } = this.props;
    return (
      <CenterBox>
        <Header>Dashboard</Header>
        <NavButton to={`${match.url}/announcements`}>Announcements</NavButton>
        <NavButton to={`${match.url}/reminders`}>Reminders</NavButton>
        <NavButton to={`${match.url}/questions`}>Questions</NavButton>
        <NavButton to={`${match.url}/report`}>Report</NavButton>
      </CenterBox>
    );
  }
}

export default Dashboard;
