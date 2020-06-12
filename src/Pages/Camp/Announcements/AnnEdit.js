import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { editAnn, resetForm } from "../../../store/actions";

class AnnEdit extends Component {
  state = {
    title: this.props.annInfo[this.props.match.params.annID].title,
    content: this.props.annInfo[this.props.match.params.annID].content,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editAnn(
      this.props.camp,
      this.state,
      this.props.match.params.annID
    );
  };

  componentDidUpdate() {
    if (this.props.formCompleted) {
      resetForm();
      this.props.history.push(`${this.props.match.url}`.replace("/edit", ""));
    }
  }

  render() {
    return (
      <CenterBox>
        <Header> Edit Announcement </Header>
        <Form admin onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <Field id="title" value={this.state.title}>
            Title
          </Field>
          <Field id="content" long value={this.state.content}>
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
    camp: state.store.camp,
    annInfo: state.store.camp.announcements,
    formCompleted: state.store.formCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAnn: (camp, state, annID) => dispatch(editAnn(camp, state, annID)),
    resetForm: () => dispatch(resetForm()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AnnEdit);
