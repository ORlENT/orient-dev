import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, NavButton, SubmitButton } from "../../../UI";
import timeConverter from "../../../functions/timeConverter";
import { deleteAnn } from "../../../store/actions";

class AnnDetails extends Component {
  handleDelete = () => {
    this.props.deleteAnn(
      this.props.camp,
      this.state,
      this.props.match.params.annID
    );
    this.props.history.goBack();
  };

  render() {
    const { annInfo, isAuthed, match } = this.props;
    const key = match.params.annID;
    return (
      <CenterBox>
        <Header>{annInfo[key].title}</Header>

        {/*Edit Announcement button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/edit`}>
            Edit announcement
          </NavButton>
        )}

        {/*Delete Announcement button (Admin only)*/}
        {isAuthed && (
          <SubmitButton admin secondary onClick={this.handleDelete}>
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
    deleteAnn: (camp, state, annID) => dispatch(deleteAnn(camp, state, annID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnDetails);
