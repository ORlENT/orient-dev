import React, { Component } from "react";
import { Header, CenterBox } from "../../../UI";

class AnnEdit extends Component {
  render() {
    const { match } = this.props;
    return (
      <CenterBox>
        <Header>Announcement {match.params.annID} Edit</Header>
      </CenterBox>
    );
  }
}

export default AnnEdit;
