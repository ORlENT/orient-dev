import React, { Component } from "react";
import { Header, CenterBox, SummaryCard } from "../../UI";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class Announcements extends Component {
  render() {
    const { announcements, isLoaded } = this.props;
    if (!isLoaded) {
      return <div>Loading</div>;
    }

    return (
      <CenterBox>
        <Header>Announcements</Header>
        {isLoaded && !announcements && (
          <Header>No announcement was not found</Header>
        )}
        {announcements &&
          Object.keys(announcements).map((key) => {
            return (
              <SummaryCard
                title={announcements[key].title}
                content={announcements[key].content}
                timestamp={announcements[key].timestamp}
              ></SummaryCard>
            );
          })}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const announcements = state.firestore.data.announcements;
  const camp = state.firestore.data.camp;
  var isLoaded = false;
  if (camp) isLoaded = true;
  return { announcements, camp, isLoaded };
};

const firestorequery = () =>
  firestoreConnect((props) => [
    {
      collection: "camps",
      doc: props.match.params.id,
      subcollections: [{ collection: "announcements" }],
      storeAs: "announcements",
    },
    {
      collection: "camps",
      doc: props.match.params.id,
      storeAs: "camp",
    },
  ]);

export default compose(
  connect(mapStateToProps),
  firestorequery()
)(Announcements);
