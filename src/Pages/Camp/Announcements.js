import React, { Component } from "react";
import { Header, CenterBox, SummaryCard } from "../../UI";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Button } from "@material-ui/core";

class Announcements extends Component {
  render() {
    let { announcements } = this.props;
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
        {isEmpty(announcementsList) && (
          <Header>No announcement was not found.</Header>
        )}
        {announcementsList &&
          Object.keys(announcementsList).map((key) => (
            <React.Fragment>
              <SummaryCard
                key={key}
                title={announcementsList[key].title}
                content={announcementsList[key].content}
                timestamp={announcements[key].timestamp}
                read={announcementsList[key].readStatus}
              />
              <Button
                onClick={() => {
                  announcementsList[key].readStatus = true;
                  sessionStorage.setItem(
                    "announcements",
                    JSON.stringify(announcementsList)
                  );
                  this.forceUpdate();
                }}
              >
                Button to read the above announcement.
              </Button>
            </React.Fragment>
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
  return { announcements };
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

export default compose(
  connect(mapStateToProps),
  firestoreQuery()
)(Announcements);
