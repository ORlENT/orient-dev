import React from "react";
import { Button } from "@material-ui/core";

const Reaction = ({ emoji, count, active }) => (
  <Button
    variant="contained"
    size="small"
    style={{
      backgroundColor: active ? "#ffb74d" : "#666",
      color: active ? "#000" : "#fff",
      margin: "0px",
      marginRight: "8px",
    }}
  >
    {emoji + " " + count}
  </Button>
);

export default Reaction;
