import React from "react";
import { TextField, withStyles } from "@material-ui/core";

const StyledField = withStyles((theme) => ({
  root: {
    margin: "0px",

    //input
    "& input": {
      color: "#fff",
    },

    //placeholder
    "& label": {
      //default
      color: "#bbb",
    },

    //border
    "& .MuiOutlinedInput-root": {
      //default
      "& fieldset": {
        borderColor: "#ddd",
      },
      //hover
      "&:hover": {
        borderColor: "#fff",
      },
    },
  },
}))(TextField);

const Field = ({ password, admin, long, children, ...rest }) => (
  <StyledField
    label={children}
    variant="outlined"
    margin="dense"
    fullWidth
    autoComplete="off"
    spellCheck="false"
    //Admin/User color
    color={admin ? "secondary" : "primary"}
    //Password
    type={password ? "password" : undefined}
    //Long Inputs
    multiline={long}
    InputProps={{
      style: { minHeight: long ? "200px" : null, alignItems: "flex-start" },
    }}
    {...rest}
  />
);

export default Field;
