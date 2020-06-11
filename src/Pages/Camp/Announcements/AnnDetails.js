import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox } from "../../../UI";
import timeConverter from "../../../functions/timeConverter";

class AnnDetails extends Component {
  render() {
    const { annInfo, match } = this.props;
    const key = match.params.annID;
    return (
      <CenterBox>
        <Header>{annInfo[key].title}</Header>

        {/*timestamp*/}
        <p style={{ color: "#bbb", margin: "0px" }}>
          Posted on {timeConverter(annInfo[key].timestamp)}
        </p>

        {/*content*/}
        <p
          style={{
            color: "#fff",
            margin: "0px",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          {annInfo[key].content}
        </p>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    annInfo: state.camp.camp.announcements,
    isAuthed: state.auth.isAuthed,
  };
};

export default connect(mapStateToProps)(AnnDetails);
