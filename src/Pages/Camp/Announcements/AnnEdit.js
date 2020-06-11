import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field } from "../../../UI";
import { editAnn, resetForm } from "../../../store/actions/campActions";

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

  handleSubmit = () => {
    this.props.editAnn(
      this.props.camp,
      this.state,
      this.props.match.params.annID
    );
    this.props.history.goBack();
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
        <Header> Edit Announcement </Header>{" "}
        <Field
          id="title"
          admin
          value={this.state.title}
          onChange={this.handleChange}
        >
          Title{" "}
        </Field>{" "}
        <Field
          id="content"
          admin
          long
          value={this.state.content}
          onChange={this.handleChange}
        >
          Content{" "}
        </Field>{" "}
        <SubmitButton admin onClick={this.handleSubmit}>
          Edit Announcement{" "}
        </SubmitButton>{" "}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    camp: state.camp.camp,
    annInfo: state.camp.camp.announcements,
    formCompleted: state.camp.formCompleted,
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
