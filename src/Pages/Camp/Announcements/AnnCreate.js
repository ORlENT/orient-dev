import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, SubmitButton, CenterBox, Field } from "../../../UI";
import { createAnn } from "../../../store/actions/campActions";

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAnn: (camp, state) => dispatch(createAnn(camp, state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnCreate);
