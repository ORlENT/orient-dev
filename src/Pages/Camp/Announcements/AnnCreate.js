import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, SubmitButton, CenterBox, Field } from "../UI";

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

  /* handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }; */

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

/* const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (state) => dispatch(signUp(state)),
  };
}; */

export default connect(null, mapDispatchToProps)(AnnCreate);
