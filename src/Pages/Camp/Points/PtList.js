import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, AnnCard, NavButton } from "../../../UI";

class PtList extends Component {
  render() {
    let { grpInfo, match, isAuthed } = this.props;
    return (
      <CenterBox>
        <Header>Points</Header>

        {/*No reports (Admin only) */}
        {Object.keys(grpInfo).length === 0 && (
          <Header>No group was found.</Header>
        )}

        {/*Create new Group button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/create`}>
            Create new group
          </NavButton>
        )}

        {/*Report List*/}
        {grpInfo &&
          Object.keys(grpInfo).map((key) => (
            <AnnCard
              key={key}
              title={grpInfo[key].groupName}
              content={grpInfo[key].point}
              timestamp={grpInfo[key].timestamp}
              to={`${match.url}/${key}`}
            />
          ))}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grpInfo: state.store.camp.groups,
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(PtList);
