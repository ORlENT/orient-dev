import React from "react";
import { Grid, Paper } from "@material-ui/core";

const CenterBox = ({ children }) => (
  <div
    className="centerContent"
    style={{
      height: "100%",
    }}
  >
    <Paper
      elevation={3}
      color="secondary"
      style={{
        width: "480px",
        padding: "32px",
        margin: "32px",
        backgroundColor: "#424242",
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
          <Grid item style={{ width: "100%" }}>
            {child}
          </Grid>
        ))}
      </Grid>
    </Paper>
  </div>
);

export default CenterBox;
