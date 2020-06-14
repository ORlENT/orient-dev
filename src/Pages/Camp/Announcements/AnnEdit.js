import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { editAnn } from "../../../store/actions";

class AnnEdit extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    const { editAnn, history, match, annInfo } = this.props;
    return (
      <CenterBox>
        <Header> Edit Announcement </Header>
        <Form
          admin
          onSubmit={editAnn}
          onSuccess={this.successHandler}
          history={history}
          annID={match.params.annID}
        >
          <Field id="title" value={annInfo[match.params.annID].title}>
            Title
          </Field>
          <Field id="content" long value={annInfo[match.params.annID].content}>
            Content
          </Field>
          <SubmitButton>Edit Announcement</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    annInfo: state.store.camp.announcements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAnn: (state, props) => dispatch(editAnn(state, props)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AnnEdit);
