import React from "react";

const NavBar = ({ children }) => (
  <div
    className="centerContent"
    style={{
      position: "sticky",
      height: "60px",
      backgroundColor: "rgb(255, 255, 255, 0.1)",
    }}
  >
    {children}
  </div>
);

export default NavBar;
