import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import {
  Header,
  NavButton,
  CenterBox,
  SubmitButton,
  Notification,
} from "../../UI";
import { deleteCamp } from "../../store/actions";

class Dashboard extends Component {
  handleDelete = () => {
    this.props.deleteCamp(this.state);
    this.props.history.push("/");
  };

  componentDidMount() {
    this.getCachedInfo();
  }

  getCachedInfo() {
    var annCachedInfo = JSON.parse(sessionStorage.getItem("announcements"));
    if (!annCachedInfo) annCachedInfo = {};
    console.log("ANNOUNCEMENTS", annCachedInfo);
  }

  render() {
    const { match, isAuthed } = this.props;
    return (
      <CenterBox>
        <Header>Dashboard</Header>

        <Notification>
          <NavButton to={`${match.url}/ann`}>Announcements</NavButton>
        </Notification>

        <Notification>
          <NavButton to={`${match.url}/rem`}>Reminders</NavButton>
        </Notification>

        <Notification>
          <NavButton to={`${match.url}/qna`}>Questions</NavButton>
        </Notification>

        <NavButton to={`${match.url}/pt`}>Points</NavButton>

        {/*User only*/}
        {!isAuthed && (
          <NavButton to={`${match.url}/rpt/create`}>Create A Report</NavButton>
        )}

        {/*Admin only*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/rpt`}>
            Reports
          </NavButton>
        )}

        {isAuthed && (
          <NavButton admin to={`${match.url}/edit`}>
            Edit camp
          </NavButton>
        )}

        {isAuthed && (
          <NavButton admin to={`${match.url}/passwordedit`}>
            Edit password
          </NavButton>
        )}

        {isAuthed && (
          <SubmitButton admin secondary onClick={this.handleDelete}>
            Delete Camp
          </SubmitButton>
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCamp: (state) => dispatch(deleteCamp(state)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Dashboard);
