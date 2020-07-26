import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  CenterBox,
  DeleteButton,
  NavButton,
  ConfirmDialog,
} from "../../../UI";
import timeConverter from "../../../functions/timeConverter";
import { deleteGrp } from "../../../store/actions";

class GrpDetails extends Component {

  handleDelete = () => {
    this.props.deleteGrp(this.props.match.params.grpID);
  };

  render() {
    const { grpInfo, isAuthed, match } = this.props;
    const key = match.params.grpID;
    return (
      <ConfirmDialog actionText="Delete group" admin>
        <CenterBox>
          <Header>{grpInfo[key].groupName}</Header>

          {/*Delete Group button (Admin only)*/}
          {isAuthed && (
            <DeleteButton admin secondary id={key}
            onClick={() => {
              this.handleDelete();
            }}>
              Delete Group
            </DeleteButton>
          )}

          {/*Edit Announcement button (Admin only)*/}
          {isAuthed && (
            <NavButton admin to={`${match.url}/ptAdd`}>
              Add Points
            </NavButton>
          )}

          {/*timestamp*/}
          <p style={{ color: "#bbb", margin: "0px" }}>
            Posted on {timeConverter(grpInfo[key].timestamp)}
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
            {grpInfo[key].point}
          </p>
        </CenterBox>
      </ConfirmDialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grpInfo: state.store.camp.groups,
    isAuthed: state.store.isAuthed,
    camp: state.store.camp,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteGrp: (grpID) => dispatch(deleteGrp(grpID, ownProps)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GrpDetails);
