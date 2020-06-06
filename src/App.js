import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Pages from "./Pages.js";
import { SnackbarProvider } from "notistack";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SnackbarProvider>
          <Pages />
        </SnackbarProvider>
      </BrowserRouter>
    );
  }
}

export default App;
