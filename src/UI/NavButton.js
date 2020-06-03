import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const NavButton = ({ to, children }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <Button
      variant="contained"
      style={{ width: "100%", backgroundColor: "#ff9800" }}
    >
      {children}
    </Button>
  </Link>
);

export default NavButton;
