import React, { Component } from "react";
import { Header, CenterBox, SummaryCard } from "../../UI";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

class Announcements extends Component {
  render() {
    const { announcements } = this.props;

    if (!isLoaded(announcements)) {
      return <div>Loading</div>;
    }

    return (
      <CenterBox>
        <Header>Announcements</Header>
        {isEmpty(announcements) && (
          <Header>No announcement was not found</Header>
        )}
        {announcements &&
          Object.keys(announcements).map((key) => (
            <SummaryCard
              key={key}
              title={announcements[key].title}
              content={announcements[key].content}
              timestamp={announcements[key].timestamp}
            />
          ))}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const announcements = state.firestore.data.announcements;
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
    {
      collection: "camps",
      doc: props.match.params.id,
      storeAs: "camp",
    },
  ]);

export default compose(
  connect(mapStateToProps),
  firestoreQuery()
)(Announcements);
