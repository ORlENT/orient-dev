import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminRoute from "../../Routes/AdminRoute";

import QnaAsk from "./Questions/QnaAsk";
import QnaDetails from "./Questions/QnaDetails";
import QnaList from "./Questions/QnaList";
import QnaAnswer from "./Questions/QnaAnswer";

class Questions extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={QnaList} />
        <Route path={`${match.path}/ask`} component={QnaAsk} />
        <Route exact path={`${match.path}/:qnaID`} component={QnaDetails} />
        <AdminRoute
          path={`${match.path}/:qnaID/answer`}
          redirect={`${match.url}`}
          component={QnaAnswer}
        />
      </Switch>
    );
  }
}

export default Questions;
