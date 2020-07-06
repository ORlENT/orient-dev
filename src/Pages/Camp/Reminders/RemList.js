import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, NavButton, ConfirmDialog } from "../../../UI";
import { RemCard } from "../../../UI/SummaryCard";

class RemList extends Component {
  render() {
    let { remInfo, isAuthed, match } = this.props;

    return (
      <ConfirmDialog actionText="Delete reminder" admin>
        <CenterBox>
          <Header>Reminders</Header>

          {/*Create new reminder button (Admin only)*/}
          {isAuthed && (
            <NavButton admin to={`${match.url}/create`}>
              Create new reminder
            </NavButton>
          )}

          {/*No reminders*/}
          {Object.keys(remInfo).length === 0 && (
            <Header>No reminder was found.</Header>
          )}

          {/*reminder List*/}
          {remInfo &&
            Object.keys(remInfo).map((key) => (
              <RemCard
                key={key}
                remID={key}
                title={remInfo[key].title}
                timestamp={remInfo[key].duedate}
              />
            ))}
        </CenterBox>
      </ConfirmDialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    remInfo: state.store.camp.reminders,
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(RemList);
