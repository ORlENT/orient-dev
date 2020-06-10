import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Header, CenterBox, NavButton, SummaryCard } from "../../../UI";
import { fetchCampInfo } from "../../../store/actions/campActions";

class AnnList extends Component {
  render() {
    let { announcements, isAuthed, match, isLoaded } = this.props;
    let announcementsList = announcements;

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
        {!announcementsList && <Header>No announcement was found.</Header>}

        {/*Announcement List*/}
        {announcementsList &&
          Object.keys(announcementsList).map((key) => (
            <SummaryCard
              key={key}
              title={announcementsList[key].title}
              content={announcementsList[key].content}
              timestamp={announcementsList[key].timestamp}
              read={announcementsList[key].readStatus}
              to={`${match.url}/${key}`}
              onClick={() => {
                announcementsList[key].readStatus = true;
                sessionStorage.setItem(
                  "announcements",
                  JSON.stringify(announcementsList)
                );
                this.forceUpdate();
              }}
            />
          ))}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  let announcements = sessionStorage.getItem("announcements")
    ? JSON.parse(sessionStorage.getItem("announcements"))
    : state.camp.camp.announcements;
  return {
    announcements,
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
