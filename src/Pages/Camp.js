import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CampNotFound from "./Camp/CampNotFound.js";
import Dashboard from "./Camp/Dashboard.js";
import Announcements from "./Camp/Announcements.js";
import Reminders from "./Camp/Reminders.js";
import Questions from "./Camp/Questions.js";
import Report from "./Camp/Report.js";
import { Header, NavBar } from "../UI";

class Camp extends Component {
  render() {
    const { match, camp, isLoaded } = this.props;

    console.log(camp);

    // If firestore is loaded
    if (!isLoaded) {
      return <div>loading</div>;
    }

    //Camp not found
    if (!camp) {
      console.log("camp not found");
      return <Route path={`${match.path}`} component={CampNotFound} />;
    }

    //Render Camp
    console.log("camp found");
    return (
      <div>
        <NavBar>
          <Header>Camp {camp.campName}</Header>
        </NavBar>
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const campCode = ownProps.match.params.id;
  const camps = state.firestore.data.camps;
  const camp = camps ? camps[campCode] : null;
  var isLoaded = false;
  if (camps) isLoaded = true;
  return {
    camp: camp,
    isLoaded,
  };
};

const firestoreQuery = () => firestoreConnect([{ collection: "camps" }]);

export default compose(connect(mapStateToProps), firestoreQuery())(Camp);
