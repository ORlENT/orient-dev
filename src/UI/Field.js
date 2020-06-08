import React from "react";
import { TextField, withStyles } from "@material-ui/core";

const StyledField = withStyles({
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
      //focused
      "&.Mui-focused": {
        color: "#ff9800",
      },
    },

    //border
    "& .MuiOutlinedInput-root": {
      //default
      "& fieldset": {
        borderColor: "#ddd",
      },
      //hover
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      //focused
      "&.Mui-focused fieldset": {
        borderColor: "#ff9800",
      },
    },
  },
})(TextField);

const Field = ({ password = false, onChange, id, children }) => (
  <StyledField
    label={children}
    variant="outlined"
    margin="dense"
    fullWidth
    type={password ? "password" : undefined}
    onChange={onChange}
    id={id}
  />
);

export default Field;
