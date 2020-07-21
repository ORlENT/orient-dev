import React from "react";
import { Button } from "@material-ui/core";

export const Reaction = ({
  emoji,
  count,
  active,
  onClick,
  disabled,
  undoClick,
}) => (
  <Button
    variant="contained"
    size="small"
    disabled={disabled}
    onClick={() => {
      if (!active) onClick();
      else undoClick();
    }}
    style={{
      backgroundColor: active ? "#ffb74d" : "#666",
      color: active ? "#000" : "#fff",
      margin: "0px",
      marginRight: "8px",
      marginBottom: "8px",
    }}
  >
    {emoji + " " + count}
  </Button>
);
