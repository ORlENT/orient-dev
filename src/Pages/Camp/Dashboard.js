import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Header, NavButton, CenterBox, SubmitButton } from "../../UI";
import { deleteCamp } from "../../store/actions";

class Dashboard extends Component {
  handleDelete = () => {
    this.props.deleteCamp(this.state);
    this.props.history.push("/");
  };

  render() {
    const { match, isAuthed } = this.props;
    return (
      <CenterBox>
        <Header>Dashboard</Header>
        <NavButton to={`${match.url}/ann`}>Announcements</NavButton>
        <NavButton to={`${match.url}/rem`}>Reminders</NavButton>
        <NavButton to={`${match.url}/qna`}>Questions</NavButton>
        <NavButton to={`${match.url}/pt`}>Points</NavButton>

        {/*View Reports button (Admin only)*/}
        {!isAuthed && (
          <NavButton to={`${match.url}/rpt/create`}>Create A Report</NavButton>
        )}
        {/*View Reports button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/rpt`}>
            Reports
          </NavButton>
        )}

        {/*Edit Camp button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/edit`}>
            Edit camp
          </NavButton>
        )}

        {/*Edit Password button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/passwordedit`}>
            Edit password
          </NavButton>
        )}

        {/*Delete Camp button (Admin only)*/}
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
