import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Pages from "./Pages.js";
import ErrorBoundary from "./UI/ErrorBoundary.js";

const theme = createMuiTheme({
  palette: {
    type: "dark",

    // Normal user color: Orange
    primary: {
      main: "#ff9800",
    },

    // Admin color: Blue
    secondary: {
      main: "#2196f3",
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary>
            <Pages />
          </ErrorBoundary>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
