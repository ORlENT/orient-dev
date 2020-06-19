import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RptList from "./Reports/RptList";
import RptCreate from "./Reports/RptCreate";
import RptDetails from "./Reports/RptDetails";

class Report extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={RptList} />
        <Route path={`${match.path}/create`} component={RptCreate} />
        <Route exact path={`${match.path}/:rptID`} component={RptDetails} />
      </Switch>
    );
  }
}

export default Report;
