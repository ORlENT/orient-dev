import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const MyButton = ({ type, children }) => (
  <Button
    type={type}
    variant="contained"
    style={{ width: "100%", backgroundColor: "#ff9800" }}
  >
    {children}
  </Button>
);

export const NavButton = ({ to, children }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <MyButton>{children}</MyButton>
  </Link>
);

export const SubmitButton = ({ children }) => (
  <MyButton type="submit">{children}</MyButton>
);
