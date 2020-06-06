import React, { Component } from "react";
import { Header, CenterBox, SummaryCard } from "../../UI";

class Announcements extends Component {
  render() {
    return (
      <CenterBox>
        <Header>Announcements</Header>
        <SummaryCard />
        <SummaryCard
          read
          title="Example Announcement"
          content="This is an example."
        />
        <SummaryCard read />
        <SummaryCard read />
        <SummaryCard read />
      </CenterBox>
    );
  }
}

export default Announcements;
