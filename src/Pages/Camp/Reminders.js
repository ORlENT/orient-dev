import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminRoute from "../../Routes/AdminRoute";

import RemList from "./Reminders/RemList";
import RemCreate from "./Reminders/RemCreate";
import RemDetails from "./Reminders/RemDetails";
import RemEdit from "./Reminders/RemEdit";


class Reminders extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={RemList} />
        <AdminRoute
          path={`${match.path}/create`}
          redirect={`${match.url}`}
          component={RemCreate}
        />
        <Route exact path={`${match.path}/:remID`} component={RemDetails} />
        <AdminRoute
          path={`${match.path}/:remID/edit`}
          redirect={`${match.url}`}
          component={RemEdit}
        />
      </Switch>
    );
  }
}
export default Reminders;
