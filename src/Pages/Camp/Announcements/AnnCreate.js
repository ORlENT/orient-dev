import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field } from "../../../UI";
import { createAnn, resetForm } from "../../../store/actions/campActions";

class AnnCreate extends Component {
  state = {
    title: "",
    content: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createAnn(this.props.camp, this.state);
  };

  componentDidUpdate() {
    if (this.props.formCompleted) {
      resetForm();
      this.props.history.push(`${this.props.match.url}`.replace("/create", ""));
    }
  }

  render() {
    return (
      <CenterBox>
        <Header>Create New Announcement</Header>
        <Field id="title" onChange={this.handleChange}>
          Title
        </Field>
        <Field id="content" onChange={this.handleChange}>
          Content
        </Field>
        <div onClick={this.handleSubmit}>
          <SubmitButton>Create New Announcement</SubmitButton>
        </div>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    camp: state.camp.camp,
    formCompleted: state.camp.formCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAnn: (camp, state) => dispatch(createAnn(camp, state)),
    resetForm: () => dispatch(resetForm()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AnnCreate);
