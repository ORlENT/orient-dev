import React from "react";
import { Grid } from "@material-ui/core";
import Field from "./Field";

const Form = ({ admin, onChange, onSubmit, children, ...rest }) => (
  <form onSubmit={onSubmit} {...rest}>
    <Grid container spacing={2}>
      {React.Children.map(children, (child) =>
        child ? (
          <Grid item style={{ width: "100%" }}>
            {child.type === Field
              ? React.cloneElement(child, { admin, onChange })
              : React.cloneElement(child, { admin })}
          </Grid>
        ) : null
      )}
    </Grid>
  </form>
);

export default Form;
