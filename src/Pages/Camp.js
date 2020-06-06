import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Camp/Dashboard.js";
import Announcements from "./Camp/Announcements.js";
import Reminders from "./Camp/Reminders.js";
import Questions from "./Camp/Questions.js";
import Report from "./Camp/Report.js";
import { Header, NavBar } from "../UI";

class Camp extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <NavBar>
          <Header>Camp {match.params.id}</Header>
        </NavBar>
        <div
          class="centerContent"
          style={{
            height: "100%",
          }}
        >
          <div>
            <Switch>
              <Route exact path={`${match.path}`} component={Dashboard} />
              <Route
                path={`${match.path}/announcements`}
                component={Announcements}
              />
              <Route path={`${match.path}/reminders`} component={Reminders} />
              <Route path={`${match.path}/questions`} component={Questions} />
              <Route path={`${match.path}/report`} component={Report} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Camp;
