import React from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";

export default function AdminMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOption = (option) => {
    handleClose();
    option.handler();
  };

  const { menuOptions, ...rest } = props;
  return (
    <div {...rest}>
      <IconButton
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Settings fontSize="small" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuOptions.map((option) => (
          <MenuItem key={option.name} onClick={() => handleOption(option)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
