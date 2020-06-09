import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const MyButton = ({ type, secondary, admin, children }) => (
  <Button
    type={type}
    variant={secondary ? "outlined" : "contained"}
    color={admin ? "secondary" : "primary"}
    style={{
      width: "100%",
    }}
  >
    {children}
  </Button>
);

export const NavButton = ({ to, secondary, admin, children }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <MyButton secondary={secondary} admin={admin}>
      {children}
    </MyButton>
  </Link>
);

export const SubmitButton = ({ secondary, admin, children }) => (
  <MyButton type="submit" secondary={secondary} admin={admin}>
    {children}
  </MyButton>
);
