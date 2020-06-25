import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Header,
  SubmitButton,
  CenterBox,
  Field,
  Form,
  Select,
} from "../../../UI";
import { transferPt } from "../../../store/actions";

class PtTransfer extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    console.log(this.props.grpInfo);
    return (
      <CenterBox>
        <Header>Point Transfer</Header>
        <Form
          admin
          onSubmit={this.props.transferPt}
          onSuccess={this.successHandler}
          history={this.props.history}
        >
          <Select
            label="From: Group Name"
            id="groupname"
            object={this.props.grpInfo}
          ></Select>
          <Select
            label="To: Group Name"
            id="groupname2"
            object={this.props.grpInfo}
          ></Select>
          <Field id="point">Points</Field>
          <SubmitButton>Transfer points</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  var grpInfo = Object.keys(state.store.camp.groups).map((key) => {
    return {
      key: key,
      text: state.store.camp.groups[key].groupName,
    };
  });
  return {
    grpInfo: grpInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transferPt: (state) => dispatch(transferPt(state)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(PtTransfer);
