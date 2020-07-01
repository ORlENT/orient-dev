import React, { Component } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import ConfirmDialog from "./ConfirmDialog";

class AdminMenu extends Component {
  state = {
    anchorEl: null,
    visible: false,
  };

  toggleVisibility = () => {
    this.setState({
      visible: !this.state.visible,
    });
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

  render() {
    const { menuOptions, ...rest } = this.props;
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
                      this.toggleVisibility();
                    }}
                  >
                    {option.name}
                  </MenuItem>
                  <ConfirmDialog
                    key={option.name}
                    toggleVisibility={() => {
                      this.toggleVisibility();
                    }}
                    action={() => {
                      this.handleOption(option);
                    }}
                    actionText="Delete"
                    admin
                    open={this.state.visible}
                  />
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

export default AdminMenu;
