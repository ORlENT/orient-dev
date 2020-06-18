import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { editRem } from "../../../store/actions";

class remEdit extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    const { editRem, history, match, remInfo } = this.props;
    return (
      <CenterBox>
        <Header> Edit Reminder</Header>
        <Form
          admin
          onSubmit={editRem}
          onSuccess={this.successHandler}
          history={history}
          remID={match.params.remID}
        >
          <Field id="title" value={remInfo[match.params.remID].title}>
            Title
          </Field>
          <Field id="duedate" type="date" label="Due Date" 
          InputLabelProps={{
            shrink: true,
          }}
          value={remInfo[match.params.remID].duedate.toDate().toISOString().slice(0,10)
            }
          >
          </Field>
          <SubmitButton>Edit Reminder</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    remInfo: state.store.camp.reminders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editRem: (state, props) => dispatch(editRem(state, props)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(remEdit);
