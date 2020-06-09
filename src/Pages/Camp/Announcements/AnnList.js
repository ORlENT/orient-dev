import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Header, CenterBox, NavButton, SummaryCard } from "../../../UI";

class AnnList extends Component {
  render() {
    let { announcements, isAuthed, match } = this.props;
    let announcementsList = JSON.parse(sessionStorage.getItem("announcements"));

    // Announcements loading
    if (!isLoaded(announcements)) {
      return <div>Loading</div>;
    }

    // Set session variables for annoucements
    if (!announcementsList) {
      sessionStorage.setItem("announcements", JSON.stringify(announcements));
      announcementsList = JSON.parse(sessionStorage.getItem("announcements"));
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
        {isEmpty(announcementsList) && (
          <Header>No announcement was found.</Header>
        )}

        {/*Announcement List*/}
        {announcementsList &&
          Object.keys(announcementsList).map((key) => (
            <SummaryCard
              key={key}
              title={announcementsList[key].title}
              content={announcementsList[key].content}
              timestamp={announcements[key].timestamp}
              read={announcementsList[key].readStatus}
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

const setReadStatusFalse = (data) => {
  return Object.keys(data).map((item) => ({
    ...data[item],
    readStatus: false,
  }));
};

const mapStateToProps = (state) => {
  let announcements = state.firestore.data.announcements;
  if (announcements) announcements = setReadStatusFalse(announcements);
  return {
    announcements,
    isAuthed: state.auth.isAuthed,
  };
};

const firestoreQuery = () =>
  firestoreConnect((props) => [
    {
      collection: "camps",
      doc: props.match.params.id,
      subcollections: [{ collection: "announcements" }],
      storeAs: "announcements",
    },
  ]);

export default compose(connect(mapStateToProps), firestoreQuery())(AnnList);
