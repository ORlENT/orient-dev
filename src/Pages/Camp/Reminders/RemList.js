import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, NavButton } from "../../../UI";
import { RemCard } from "../../../UI/SummaryCard";

class RemList extends Component {
  state = {
    remCachedInfo: {},
  };

  setSessionStorage(key) {
    var remCachedInfo = JSON.parse(sessionStorage.getItem("reminders"));
    if (!remCachedInfo) {
      remCachedInfo = {};
    }
    remCachedInfo[`${key}`] = {};
    remCachedInfo[`${key}`].readStatus = true;
    sessionStorage.setItem("reminders", JSON.stringify(remCachedInfo));
    this.getCachedInfo();
  }

  componentDidMount() {
    this.getCachedInfo();
  }

  getCachedInfo() {
    var remCachedInfo = JSON.parse(sessionStorage.getItem("reminders"));
    if (!remCachedInfo) remCachedInfo = {};
    this.setState({ remCachedInfo });
  }

  render() {
    let { remInfo, isAuthed, match } = this.props;
    const { remCachedInfo } = this.state;

    return (
      <CenterBox>
        <Header>Reminders</Header>

        {/*Create new reminder button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/create`}>
            Create new reminder
          </NavButton>
        )}

        {/*No reminders*/}
        {Object.keys(remInfo).length === 0 && (
          <Header>No reminder was found.</Header>
        )}

        {/*reminder List*/}
        {remInfo &&
          Object.keys(remInfo).map((key) => (
            <RemCard
              key={key}
              title={remInfo[key].title}
              content={remInfo[key].content}
              timestamp={remInfo[key].duedate}
              read={remCachedInfo[key] ? remCachedInfo[key].readStatus : false}
              to={`${match.url}/${key}`}
              onClick={() => {
                this.setSessionStorage(key);
                this.forceUpdate();
              }}
            />
          ))}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    remInfo: state.store.camp.reminders,
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(RemList);
