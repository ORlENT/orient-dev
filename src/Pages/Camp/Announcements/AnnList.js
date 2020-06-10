import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Header, CenterBox, NavButton, SummaryCard } from "../../../UI";
import { fetchCampInfo } from "../../../store/actions/campActions";

class AnnList extends Component {
  state = {
    annCachedInfo: {},
  };

  setSessionStorage(key) {
    var annCachedInfo = JSON.parse(sessionStorage.getItem("announcements"));
    if (!annCachedInfo) {
      annCachedInfo = {};
    }
    annCachedInfo[`${key}`] = {};
    annCachedInfo[`${key}`].readStatus = true;
    sessionStorage.setItem("announcements", JSON.stringify(annCachedInfo));
    this.getCachedInfo();
  }

  componentDidMount() {
    this.getCachedInfo();
  }

  getCachedInfo() {
    var annCachedInfo = JSON.parse(sessionStorage.getItem("announcements"));
    if (!annCachedInfo) annCachedInfo = {};
    this.setState({ annCachedInfo });
  }

  render() {
    let { annInfo, isAuthed, match, isLoaded } = this.props;
    const { annCachedInfo } = this.state;

    // Announcements loading
    if (!isLoaded) {
      return <div>Loading</div>;
    }

    // Render the announcements
    return (
      <CenterBox>
        <Header>Announcements</Header>

        {/*Create new Announcement button (Admin only)*/}
        {isAuthed && (
          <NavButton to={`${match.url}/create`} admin>
            Create new announcement
          </NavButton>
        )}

        {/*No announcements*/}
        {!annInfo && <Header>No announcement was found.</Header>}

        {/*Announcement List*/}
        {annInfo &&
          Object.keys(annInfo).map((key) => (
            <SummaryCard
              key={key}
              title={annInfo[key].title}
              content={annInfo[key].content}
              timestamp={annInfo[key].timestamp}
              read={annCachedInfo[key] ? annCachedInfo[key].readStatus : false}
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
  let annInfo = state.camp.camp.announcements;
  return {
    annInfo,
    isAuthed: state.auth.isAuthed,
    isLoaded: state.camp.isLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampInfo: (campID) => dispatch(fetchCampInfo(campID)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(AnnList);
