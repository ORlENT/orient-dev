import React, { Component } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { connect } from "react-redux";
import { openConfirmForm, clearCallback } from "../store/actions";

class AdminMenu extends Component {
  state = {
    anchorEl: null,
    callback: false,
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

  componentDidUpdate() {
    try {
      if (this.state.callback && this.props.callback) {
        this.state.callback();
        this.setState({
          callback: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { menuOptions, openConfirmForm, clearCallback, ...rest } = this.props;
    const { anchorEl } = this.state;
    return (
      <div {...rest}>
        <IconButton
          color="secondary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Settings fontSize="small" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {menuOptions.map((option) => {
            if (option.name === "Delete")
              return (
                <div>
                  <MenuItem
                    key={option.name}
                    onClick={() => {
                      this.handleClose();
                      this.props.openConfirmForm();
                      this.setState({ callback: this.handleOption(option) });
                    }}
                  >
                    {option.name}
                  </MenuItem>
                </div>
              );
            return (
              <MenuItem
                key={option.name}
                onClick={() => {
                  this.handleOption(option);
                }}
              >
                {option.name}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    callback: state.store.callback,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openConfirmForm: () => dispatch(openConfirmForm()),
    clearCallback: () => dispatch(clearCallback()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminMenu);
