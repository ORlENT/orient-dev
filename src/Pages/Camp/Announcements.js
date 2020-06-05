import React, { Component } from "react";
import { Header, CenterBox, SummaryCard } from "../../UI";

class Announcements extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Announcements</Header>
        <SummaryCard />
        <SummaryCard read />
        <SummaryCard
          read
          title="Example Announcement"
          content="This is an example."
        />
      </CenterBox>
    );
  }
}

export default Announcements;
