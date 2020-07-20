import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";

import { addReaction } from "../store/actions";

import { compose } from "redux";

import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide in={true} ref={ref} {...props} timeout={0} />;
});

class ReactionMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleOption = (option) => {
    this.handleClose();
    option.handler();
  };

  onEmojiClick = (emoji) => {
    this.props.addReaction(emoji, this.props.match.params.annID);
    this.handleClose();
  };
  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          variant="contained"
          size="small"
          onClick={this.handleClick}
          style={{
            backgroundColor: "#666",
            color: "#fff",
            margin: "0px",
            marginRight: "8px",
          }}
        >
          Add Reactions
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <MenuItem
            onClick={() => {
              this.onEmojiClick("😀");
            }}
          >
            😀
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

ReactionMenu.defaultProps = {
  closeConfirmForm: () => null,
  setCallback: () => null,
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addReaction: (emoji, annID) => dispatch(addReaction(emoji, annID)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ReactionMenu);
