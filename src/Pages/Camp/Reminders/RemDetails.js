import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, NavButton, SubmitButton } from "../../../UI";
import timeConverter from "../../../functions/timeConverter";
import { deleteRem } from "../../../store/actions";

class RemDetails extends Component {
  componentDidMount() {
    this.setState({ remID: this.props.match.params.remID });
  }

  handleDelete = () => {
    this.props.deleteRem(this.state);
    this.props.history.goBack();
  };

  render() {
    const { remInfo, isAuthed, match } = this.props;
    const key = match.params.remID;
    return (
      <CenterBox>
        <Header>{remInfo[key].title}</Header>


        {/*Edit Reminder button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/edit`}>
            Edit reminder
          </NavButton>
        )}

        {/*Delete Reminder button (Admin only)*/}
        {isAuthed && (
          <SubmitButton admin secondary onClick={this.handleDelete}>
            Delete reminder
          </SubmitButton>
        )}

        {/*Timestamp*/}
        <p style={{ color: "#bbb", margin: "0px" }}>
          Due on {timeConverter(remInfo[key].duedate)}
        </p>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    remInfo: state.store.camp.reminders,
    isAuthed: state.store.isAuthed,
    camp: state.store.camp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRem: (state) => dispatch(deleteRem(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemDetails);
