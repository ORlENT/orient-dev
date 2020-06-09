import React, { Component } from "react";
import { Header, CenterBox } from "../../../UI";

class AnnDetails extends Component {
  render() {
    const { match } = this.props;
    return (
      <CenterBox>
        <Header>Announcement {match.params.annID} Details</Header>
      </CenterBox>
    );
  }
}

export default AnnDetails;
