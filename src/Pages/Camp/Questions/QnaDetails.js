import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  CenterBox,
  NavButton,
  ConfirmDialog,
  DeleteButton,
} from "../../../UI";
import timeConverter from "../../../functions/timeConverter";
import { deleteQna } from "../../../store/actions";

class QnaDetails extends Component {
  handleDelete = () => {
    this.props.deleteQna(this.props.match.params.qnaID);
    this.props.history.goBack();
  };

  render() {
    const { qnaInfo, isAuthed, match } = this.props;
    const key = match.params.qnaID;
    return (
      <ConfirmDialog actionText="Delete question" admin>
        <CenterBox>
          <Header>{qnaInfo[key].question}</Header>

          {/*Answer Question button (Admin only)*/}
          {isAuthed && (
            <NavButton admin to={`${match.url}/answer`}>
              Answer question
            </NavButton>
          )}

          {/*Delete Question button (Admin only)*/}
          {isAuthed && (
            <DeleteButton admin secondary onClick={this.handleDelete}>
              Delete question
            </DeleteButton>
          )}

          {/*timestamp*/}
          <p style={{ color: "#bbb", margin: "0px" }}>
            Posted on {timeConverter(qnaInfo[key].timestamp)}
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
            {qnaInfo[key].answer}
          </p>
        </CenterBox>
      </ConfirmDialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    qnaInfo: state.store.camp.questions,
    isAuthed: state.store.isAuthed,
    camp: state.store.camp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteQna: (qnaID) => dispatch(deleteQna(qnaID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QnaDetails);
