import React, { Component } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import DeleteMenuItem from "./DeleteMenuItem";

import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide in={true} ref={ref} {...props} timeout={0} />;
});

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
          TransitionComponent={Transition}
        >
          {menuOptions.map((option) => {
            if (option.name === "Delete")
              return (
                <div key={option.name}>
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
