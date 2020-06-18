import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../../UI";
import { createAnnRem } from "../../../../store/actions";

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
          onSubmit={this.props.createAnnRem}
          onSuccess={this.successHandler}
          history={this.props.history}
          annID={this.props.match.params.annID}
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
    createAnnRem: (state,props) => dispatch(createAnnRem(state,props)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(remCreate);
