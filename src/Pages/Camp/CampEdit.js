import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../UI";
import { editCamp } from "../../store/actions";
import ValidationError from "../../errors/ValidationError";

class CampEdit extends Component {
  state = { oldCampCode: null };
  successHandler(state, props) {
    console.log(props.history);
    props.history.push("/camp/" + state.campCode);
  }

  componentDidMount() {
    console.log(this.props.camp);
    this.setState({ oldCampCode: this.props.camp.campCode });
  }

  failHandler() {
    throw new ValidationError("campCode", "Camp Code is already in use");
  }

  render() {
    if (!this.state.oldCampCode) {
      this.setState({ oldCampCode: this.props.camp.campCode });
    }
    return (
      <CenterBox>
        <Header>Edit Camp</Header>
        <Form
          onSubmit={this.props.editCamp}
          validate={this.validate}
          onSuccess={this.successHandler}
          onFail={this.failHandler}
          history={this.props.history}
        >
          <Field id="campName" value={this.props.camp.campName}>
            Camp Name
          </Field>
          <Field id="campCode" value={this.props.camp.campCode}>
            Camp Code
          </Field>
          <SubmitButton>Edit Camp</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    camp: state.store.camp,
    isLoaded: state.store.isLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCamp: (state) => dispatch(editCamp(state)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(CampEdit);
