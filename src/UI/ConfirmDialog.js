import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Header, SubmitButton, CenterBox } from ".";
import { withStyles } from "@material-ui/core/styles";

class ConfirmDialog extends Component {
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.toggleVisibility}>
        <StyledButton>
          <Header>Confirm {this.props.actionText}?</Header>
          <SubmitButton
            admin={this.props.admin}
            onClick={() => {
              this.props.action();
              this.props.toggleVisibility();
            }}
          >
            {this.props.actionText}
          </SubmitButton>
          <SubmitButton
            secondary
            admin={this.props.admin}
            onClick={this.props.toggleVisibility}
          >
            Back
          </SubmitButton>
        </StyledButton>
      </Dialog>
    );
  }
}

const StyledButton = withStyles({
  centerContent: {
    margin: "0px !important",
  },
})(CenterBox);

export default ConfirmDialog;
