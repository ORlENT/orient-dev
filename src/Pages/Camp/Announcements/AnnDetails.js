import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  CenterBox,
  NavButton,
  SubmitButton,
  ConfirmDialog,
} from "../../../UI";
import timeConverter from "../../../functions/timeConverter";
import { deleteAnn, dispatchType } from "../../../store/actions";

class AnnDetails extends Component {
  handleDelete = () => {
    this.props.deleteAnn(this.props.match.params.annID);
    this.props.history.goBack();
  };

  render() {
    const { annInfo, isAuthed, match } = this.props;
    const key = match.params.annID;
    return (
      <ConfirmDialog actionText="Delete" action={this.handleDelete} admin>
        <CenterBox>
          <Header>{annInfo[key].title}</Header>

          {/*Edit Announcement button (Admin only)*/}
          {isAuthed && (
            <NavButton admin to={`${match.url}/edit`}>
              Edit announcement
            </NavButton>
          )}

          {/*Create new reminder button (Admin only)*/}
          {isAuthed && !annInfo[key].reminder && (
            <NavButton admin to={`${match.url}/rem/create`}>
              Create a new reminder
            </NavButton>
          )}

          {/*Create new reminder button (Admin only)*/}
          {isAuthed && annInfo[key].reminder && (
            <NavButton admin to={`/camp/${this.props.camp.campCode}/rem`}>
              View reminder
            </NavButton>
          )}

          {/*Delete Announcement button (Admin only)*/}
          {isAuthed && (
            <SubmitButton
              admin
              secondary
              onClick={() => {
                this.props.dispatchType("CONFIRM_FORM_OPEN");
              }}
            >
              Delete announcement
            </SubmitButton>
          )}

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
      </ConfirmDialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    annInfo: state.store.camp.announcements,
    isAuthed: state.store.isAuthed,
    camp: state.store.camp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAnn: (annID) => dispatch(deleteAnn(annID)),
    dispatchType: (type) => dispatch(dispatchType(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnDetails);
