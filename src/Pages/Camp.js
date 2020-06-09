import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import CampNotFound from "./Camp/CampNotFound.js";
import Dashboard from "./Camp/Dashboard.js";
import Announcements from "./Camp/Announcements.js";
import Reminders from "./Camp/Reminders.js";
import Questions from "./Camp/Questions.js";
import Report from "./Camp/Report.js";
import { Header, NavBar } from "../UI";
import { storeCampInfo } from "../store/actions/campActions";

class Camp extends Component {
  render() {
    const { match, camp, storeCampInfo } = this.props;

    //Firestore loading
    if (!isLoaded(camp)) {
      return <div>loading</div>;
    }

    //Camp not found
    if (isEmpty(camp)) {
      console.log("camp not found");
      return <Route path={`${match.path}`} component={CampNotFound} />;
    }

    //Render Camp
    console.log("camp found");
    storeCampInfo(camp);
    return (
      <div
        style={{
          display: "grid",
          minHeight: "100%",
        }}
      >
        {/*Layer 1: NavBar and AdminLogin */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
            zIndex: "1",
            height: "60px",
          }}
        >
          <NavBar>
            <Header>Camp {camp.campName}</Header>
          </NavBar>
        </div>

        {/*Layer 2: Page content */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
          }}
        >
          <Switch>
            <Route exact path={`${match.path}`} component={Dashboard} />
            <Route path={`${match.path}/ann`} component={Announcements} />
            <Route path={`${match.path}/rem`} component={Reminders} />
            <Route path={`${match.path}/qna`} component={Questions} />
            <Route path={`${match.path}/rpt`} component={Report} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    camp: state.firestore.data.camp,
    announcements: state.firestore.data.announcements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeCampInfo: (camp) => dispatch(storeCampInfo(camp)),
  };
};

const firestoreQuery = () =>
  firestoreConnect((props) => [
    {
      collection: "camps",
      doc: props.match.params.id,
      storeAs: "camp",
    },
    {
      collection: "camps",
      doc: props.match.params.id,
      subcollections: [{ collection: "announcements" }],
      storeAs: "announcements",
    },
  ]);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreQuery()
)(Camp);
