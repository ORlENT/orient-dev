import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminRoute from "../../Routes/AdminRoute";

import RemList from "./Reminders/RemList";
import RemEdit from "./Reminders/RemEdit";
import RemCreate from './Reminders/RemCreate';


class Reminders extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={RemList} />
        <AdminRoute
          path={`${match.path}/:remID/edit`}
          redirect={`${match.url}`}
          component={RemEdit}
        />
        <AdminRoute
          path={`${match.path}/create`}
          redirect={`${match.url}`}
          component={RemCreate}
        />
      </Switch>
    );
  }
}
export default Reminders;
