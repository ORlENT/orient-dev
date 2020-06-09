import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Pages from "./Pages.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9800",
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
