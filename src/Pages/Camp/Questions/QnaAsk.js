import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { askQna } from "../../../store/actions";

class QnaAsk extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    return (
      <CenterBox>
        <Header>Ask New Question</Header>
        <Form
          onSubmit={this.props.askQna}
          onSuccess={this.successHandler}
          history={this.props.history}
        >
          <Field id="question">Question</Field>
          <SubmitButton>Ask New Question</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    askQna: (state) => dispatch(askQna(state)),
  };
};

export default compose(connect(null, mapDispatchToProps), withRouter)(QnaAsk);
