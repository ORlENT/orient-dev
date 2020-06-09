import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../../UI";

class Dashboard extends Component {
  render() {
    const { match } = this.props;
    return (
      <CenterBox>
        <Header>Dashboard</Header>
        <NavButton to={`${match.url}/ann`}>Announcements</NavButton>
        <NavButton to={`${match.url}/rem`}>Reminders</NavButton>
        <NavButton to={`${match.url}/qna`}>Questions</NavButton>
        <NavButton to={`${match.url}/rpt`}>Report</NavButton>
      </CenterBox>
    );
  }
}

export default Dashboard;
