import React from "react";
import { Grid, Paper } from "@material-ui/core";

const CenterBox = ({ children, ...rest }) => (
  <div
    className="centerContent"
    style={{
      height: "100%",
    }}
    {...rest}
  >
    <Paper
      elevation={3}
      style={{
        width: "480px",
        padding: "32px",
        margin: "32px",
        backgroundColor: "#444",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ width: "100%" }}
      >
        {React.Children.map(children, (child) => (
          <Grid item style={{ width: "100%", padding: child ? null : "0" }}>
            {child}
          </Grid>
        ))}
      </Grid>
    </Paper>
  </div>
);

export default CenterBox;
