import React from "react";
import { TextField, withStyles } from "@material-ui/core";

const StyledField = withStyles((theme) => ({
  root: {
    margin: "0px",

    //input
    "& input": {
      color: "#fff",
      //autofill
      "&:-webkit-autofill": {
        transitionDelay: "9999s",
        transitionProperty: "background-color, color",
      },
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

const Field = ({ password, admin, onEnter = null, children, ...rest }) => (
  <StyledField
    label={children}
    variant="outlined"
    margin="dense"
    fullWidth
    autoComplete="off"
    spellCheck="false"
    color={admin ? "secondary" : "primary"}
    type={password ? "password" : undefined}
    //On Enter
    onKeyPress={(ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        onEnter && onEnter();
      }
    }}
    {...rest}
  />
);

export default Field;
