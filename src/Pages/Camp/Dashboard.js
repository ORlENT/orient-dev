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
  state = {
    annNotif: false,
    remNotif: false,
    qnaNotif: false,
  };

  handleDelete = () => {
    this.props.deleteCamp(this.state);
    this.props.history.push("/");
  };

  componentDidMount() {
    this.getCachedInfo();
  }

  getCachedInfo() {
    // Ann - Notif if any unread
    var annCachedInfo = JSON.parse(sessionStorage.getItem("announcements"));
    if (!annCachedInfo) annCachedInfo = {};

    this.setState({ annNotif: false });
    for (var key in annCachedInfo) {
      if (!annCachedInfo[key].readStatus) {
        this.setState({ annNotif: true });
      }
    }

    //Rem - Notif if any due in less than a week
    const week = 1000 * 60 * 60 * 24 * 7;

    this.setState({ remNotif: false });
    for (var key in this.props.remInfo) {
      const diff = this.props.remInfo[key].duedate.toDate() - Date.now();
      if (diff < week && diff > 0) {
        this.setState({ remNotif: true });
      }
    }

    //Qna - Notif if question is asked by you and answered
    var qnaCachedInfo = JSON.parse(sessionStorage.getItem("questions"));
    if (!qnaCachedInfo) qnaCachedInfo = {};

    this.setState({ qnaNotif: false });
    for (var key in this.props.qnaInfo) {
      if (
        qnaCachedInfo[key] &&
        qnaCachedInfo[key].askedStatus &&
        !!this.props.qnaInfo[key].answer
      ) {
        this.setState({ qnaNotif: true });
      }
    }
  }

  render() {
    const { match, isAuthed } = this.props;
    const { annNotif, remNotif, qnaNotif } = this.state;
    return (
      <CenterBox>
        <Header>Dashboard</Header>

        <Notification active={annNotif}>
          <NavButton to={`${match.url}/ann`}>Announcements</NavButton>
        </Notification>

        <Notification active={remNotif}>
          <NavButton to={`${match.url}/rem`}>Reminders</NavButton>
        </Notification>

        <Notification active={qnaNotif}>
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
    remInfo: state.store.camp.reminders,
    qnaInfo: state.store.camp.questions,
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
