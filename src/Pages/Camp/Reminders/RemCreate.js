import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { createRem } from "../../../store/actions";

class remCreate extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    return (
      <CenterBox>
        <Header>Create New Reminder</Header>
        <Form
          admin
          onSubmit={this.props.createRem}
          onSuccess={this.successHandler}
          history={this.props.history}
        >
          <Field id="title">Title</Field>
          <Field id="duedate" type="date" label="Due Date" InputLabelProps={{
      shrink: true,
    }}>
          </Field>
          <SubmitButton>Create New Reminder</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRem: (state) => dispatch(createRem(state)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(remCreate);
