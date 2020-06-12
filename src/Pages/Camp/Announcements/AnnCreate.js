import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { createAnn } from "../../../store/actions";

class AnnCreate extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    return (
      <CenterBox>
        <Header>Create New Announcement</Header>
        <Form
          admin
          onSubmit={this.props.createAnn}
          onSuccess={this.successHandler}
          history={this.props.history}
        >
          <Field id="title">Title</Field>
          <Field id="content" long>
            Content
          </Field>
          <SubmitButton>Create New Announcement</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createAnn: (state) => dispatch(createAnn(state)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(AnnCreate);
