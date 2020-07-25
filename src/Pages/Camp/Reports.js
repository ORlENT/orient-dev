import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RptList from "./Reports/RptList";
import RptCreate from "./Reports/RptCreate";
import RptDetails from "./Reports/RptDetails";
import { NotFound } from "../../UI";

class Report extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={RptList} />
        <Route path={`${match.path}/create`} component={RptCreate} />
        <Route exact path={`${match.path}/:rptID`} component={RptDetails} />
        <Route path={'*'} component={NotFound} />
      </Switch>
    );
  }
}

export default Report;
