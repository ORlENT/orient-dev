import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Header, NavButton, CenterBox, Field } from "../UI";

class JoinCamp extends Component {
  state = {
    campCode: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.history.push("/camp/" + this.state.campCode);
  };

  render() {
    return (
      <CenterBox>
        <Header>Join Camp</Header>
        <Field
          id="campCode"
          onChange={this.handleChange}
          onEnter={this.handleSubmit}
        >
          Camp Code
        </Field>
        <NavButton to={"/camp/" + this.state.campCode}>Join Camp</NavButton>
      </CenterBox>
    );
  }
}

export default withRouter(JoinCamp);
