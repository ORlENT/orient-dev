import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminRoute from "../../Routes/AdminRoute";

import AnnCreate from "./Announcements/AnnCreate";
import AnnDetails from "./Announcements/AnnDetails";
import AnnEdit from "./Announcements/AnnEdit";
import AnnList from "./Announcements/AnnList";
import RemCreate from "./Announcements/Reminder/RemCreate";

class Announcements extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={AnnList} />
        <AdminRoute
          path={`${match.path}/create`}
          redirect={`${match.url}`}
          component={AnnCreate}
        />
        <Route exact path={`${match.path}/:annID`} component={AnnDetails} />
        <AdminRoute
          path={`${match.path}/:annID/edit`}
          redirect={`${match.url}`}
          component={AnnEdit}
        />
        <AdminRoute
          path={`${match.path}/:annID/rem/create`}
          redirect={`${match.url}`}
          component={RemCreate}
        />
      </Switch>
    );
  }
}

export default Announcements;
