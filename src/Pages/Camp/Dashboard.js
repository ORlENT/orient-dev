import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, NavButton, CenterBox } from "../../UI";

class Dashboard extends Component {
  render() {
    const { match, isAuthed } = this.props;
    return (
      <CenterBox>
        <Header>Dashboard</Header>
        <NavButton to={`${match.url}/ann`}>Announcements</NavButton>
        <NavButton to={`${match.url}/rem`}>Reminders</NavButton>
        <NavButton to={`${match.url}/qna`}>Questions</NavButton>
        <NavButton to={`${match.url}/rpt`}>Report</NavButton>

        {/*Edit Announcement button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/edit`}>
            Edit camp
          </NavButton>
        )}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(Dashboard);
