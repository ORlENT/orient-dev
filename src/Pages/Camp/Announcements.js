import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AnnCreate from "./Announcements/AnnCreate";
import AnnDetails from "./Announcements/AnnDetails";
import AnnEdit from "./Announcements/AnnEdit";
import AnnList from "./Announcements/AnnList";

class Announcements extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={AnnList} />
        <Route path={`${match.path}/add`} component={AnnCreate} />
        <Route exact path={`${match.path}/:annID`} component={AnnDetails} />
        <Route path={`${match.path}/:annID/edit`} component={AnnEdit} />
      </Switch>
    );
  }
}

export default Announcements;
