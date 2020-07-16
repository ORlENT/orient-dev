import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import CampNotFound from "./Camp/CampNotFound.js";
import Dashboard from "./Camp/Dashboard.js";
import Announcements from "./Camp/Announcements.js";
import Reminders from "./Camp/Reminders.js";
import Questions from "./Camp/Questions.js";
import Reports from "./Camp/Reports.js";
import Points from "./Camp/Points.js";
import RptCreate from "./Camp/Reports/RptCreate";
import CampEdit from "./Camp/CampEdit";
import PasswordEdit from "./Camp/PasswordEdit";

import { NavBar, LoadingScreen, Message } from "../UI";
import { addCampListener, fetchCampInfo } from "../store/actions";
import AdminRoute from "../Routes/AdminRoute";

class Camp extends Component {
  state = {
    isLoading: false,
  };
  componentDidMount() {
    this.props.addCampListener(this.props.match.params.campCode);
  }

  render() {
    const { match, camp, campLoaded } = this.props;

    //Firestore loading
    if (campLoaded !== match.params.campCode || this.state.isLoading) {
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
          <NavBar />
        </div>

        {/*Layer 2: Page content */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
            zIndex: "0",
            paddingTop: "60px",
          }}
        >
          <Switch>
            <Route exact path={`${match.path}`} component={Dashboard} />
            <Route path={`${match.path}/ann`} component={Announcements} />
            <Route path={`${match.path}/rem`} component={Reminders} />
            <Route path={`${match.path}/qna`} component={Questions} />
            <Route path={`${match.path}/pt`} component={Points} />
            <Route path={`${match.path}/rpt/create`} component={RptCreate} />
            <AdminRoute
              path={`${match.path}/rpt`}
              redirect={`${match.url}`}
              component={Reports}
            />
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
        <Message></Message>
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
    addCampListener: (campCode) => dispatch(addCampListener(campCode)),
    fetchCampInfo: (campCode) => dispatch(fetchCampInfo(campCode)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Camp);
