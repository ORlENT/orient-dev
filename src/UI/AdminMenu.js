import React, { Component } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import DeleteMenuItem from "./DeleteMenuItem";

class AdminMenu extends Component {
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

  render() {
    const { menuOptions, id, ...rest } = this.props;
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
                  <DeleteMenuItem
                    id={this.props.id}
                    key={option.name}
                    handleClose={this.handleClose}
                    onClick={() => {
                      this.handleOption(option);
                    }}
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
