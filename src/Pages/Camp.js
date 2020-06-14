import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import CampNotFound from "./Camp/CampNotFound.js";
import Dashboard from "./Camp/Dashboard.js";
import Announcements from "./Camp/Announcements.js";
import Reminders from "./Camp/Reminders.js";
import Questions from "./Camp/Questions.js";
import Report from "./Camp/Report.js";
import CampEdit from "./Camp/CampEdit";
import PasswordEdit from "./Camp/PasswordEdit";

import { Header, NavBar, LoadingScreen } from "../UI";
import { fetchCampInfo } from "../store/actions";
import AdminRoute from "../Routes/AdminRoute";

class Camp extends Component {
  componentDidMount() {
    this.props.fetchCampInfo(this.props.match.params.campCode);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("Route Changed");
    this.props.fetchCampInfo(this.props.match.params.campCode);
  }

  render() {
    const { match, camp, campLoaded } = this.props;

    //Firestore loading
    if (campLoaded !== match.params.campCode) {
      return <LoadingScreen />;
    }

    //Camp not found
    if (camp == null) {
      return <Route path={`${match.path}`} component={CampNotFound} />;
    }

    //Render Camp
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
            paddingTop: "60px",
          }}
        >
          <Switch>
            <Route exact path={`${match.path}`} component={Dashboard} />
            <Route path={`${match.path}/ann`} component={Announcements} />
            <Route path={`${match.path}/rem`} component={Reminders} />
            <Route path={`${match.path}/qna`} component={Questions} />
            <Route path={`${match.path}/rpt`} component={Report} />
            <AdminRoute
              path={`${match.path}/edit`}
              redirect={`${match.url}`}
              component={CampEdit}
            />
            <AdminRoute
              path={`${match.path}/passwordedit`}
              redirect={`${match.url}`}
              component={PasswordEdit}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    camp: state.store.camp,
    campLoaded: state.store.campLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampInfo: (campCode) => dispatch(fetchCampInfo(campCode)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Camp);
