import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  CenterBox,
  NavButton,
  DeleteButton,
  ConfirmDialog,
  ReactionButtons,
} from "../../../UI";
import timeConverter from "../../../functions/timeConverter";
import { deleteAnn, dispatchType } from "../../../store/actions";

class AnnDetails extends Component {
  handleDelete = () => {
    this.props.deleteAnn(this.props.match.params.annID);
  };

  render() {
    const { annInfo, isAuthed, match } = this.props;
    const key = match.params.annID;
    return (
      <ConfirmDialog actionText="Delete Announcement" admin>
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
            <DeleteButton
              admin
              secondary
              id={key}
              onClick={() => {
                this.handleDelete();
              }}
            >
              Delete announcement
            </DeleteButton>
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

          {/*Reactions*/}
          <div
            style={{
              width: "100%",
            }}
          >
            <ReactionButtons
              id={this.props.match.params.annID}
              info={annInfo[key].reactions ? annInfo[key].reactions : {}}
              collection={"announcements"}
            ></ReactionButtons>
          </div>
        </CenterBox>
      </ConfirmDialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    annInfo: state.store.camp.announcements,
    isAuthed: state.store.isAuthed,
    camp: state.store.camp,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteAnn: (annID) => dispatch(deleteAnn(annID, ownProps)),
    dispatchType: (type) => dispatch(dispatchType(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnDetails);
