import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { answerQna } from "../../../store/actions";

class QnaAnswer extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    const { answerQna, history, match, qnaInfo } = this.props;
    return (
      <CenterBox>
        <Header>{qnaInfo[match.params.qnaID].question}</Header>
        <Form
          admin
          onSubmit={answerQna}
          onSuccess={this.successHandler}
          history={history}
          qnaID={match.params.qnaID}
        >
          <Field id="answer" long>
            Content
          </Field>
          <SubmitButton>Answer Question</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    qnaInfo: state.store.camp.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    answerQna: (state, props) => dispatch(answerQna(state, props)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(QnaAnswer);
