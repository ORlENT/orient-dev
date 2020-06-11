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
import { Header, NavBar } from "../UI";
import { fetchCampInfo } from "../store/actions/campActions";

class Camp extends Component {
  componentDidMount() {
    this.props.fetchCampInfo(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("Route Changed");
    this.props.fetchCampInfo(this.props.match.params.id);
  }

  render() {
    const { match, camp, isLoaded } = this.props;

    //Firestore loading
    if (!isLoaded) {
      return <div>loading</div>;
    }

    //Camp not found
    if (isLoaded && camp == null) {
      console.log("camp not found");
      return <Route path={`${match.path}`} component={CampNotFound} />;
    }

    //Render Camp
    // console.log("camp found");
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
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    camp: state.camp.camp,
    isLoaded: state.camp.isLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampInfo: (campID) => dispatch(fetchCampInfo(campID)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Camp);
