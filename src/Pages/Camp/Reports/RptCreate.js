import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { createRpt } from "../../../store/actions";

class RptCreate extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    return (
      <CenterBox>
        <Header>Create New Report</Header>
        <Form
          onSubmit={this.props.createRpt}
          onSuccess={this.successHandler}
          history={this.props.history}
        >
          <Field id="title">Title</Field>
          <Field id="content" long>
            Content
          </Field>
          <SubmitButton>Create New Report</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createRpt: (state) => dispatch(createRpt(state)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(RptCreate);
