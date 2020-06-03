import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Camp from "./Pages/Camp.js";
import ChooseCamp from "./Pages/ChooseCamp.js";
import CreateCamp from "./Pages/CreateCamp.js";
import Home from "./Pages/Home.js";
import JoinCamp from "./Pages/JoinCamp.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";

class Pages extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/join" component={JoinCamp} />
        <Route path="/camps" component={ChooseCamp} />
        <Route path="/create" component={CreateCamp} />
        <Route path="/camp/:id" component={Camp} />
      </Switch>
    );
  }
}

export default Pages;
