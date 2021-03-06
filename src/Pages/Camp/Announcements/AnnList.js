import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  CenterBox,
  NavButton,
  AnnCard,
  ConfirmDialog,
} from "../../../UI";

class AnnList extends Component {
  state = {
    annCachedInfo: {},
  };

  setSessionStorage(key) {
    var annCachedInfo = JSON.parse(sessionStorage.getItem("announcements"));
    if (!annCachedInfo) {
      annCachedInfo = {};
    }
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
    let { annInfo, isAuthed, match } = this.props;
    const { annCachedInfo } = this.state;

    return (
      <ConfirmDialog actionText="Delete Announcement" admin>
        <CenterBox>
          <Header>Announcements</Header>

          {/*Create new Announcement button (Admin only)*/}
          {isAuthed && (
            <NavButton admin to={`${match.url}/create`}>
              Create new announcement
            </NavButton>
          )}

          {/*No announcements*/}
          {Object.keys(annInfo).length === 0 && (
            <Header>No announcement was found.</Header>
          )}

          {/*Announcement List*/}
          {annInfo &&
            Object.keys(annInfo).map((key) => (
              <AnnCard
                key={key}
                annID={key}
                title={annInfo[key].title}
                content={annInfo[key].content}
                timestamp={annInfo[key].timestamp}
                reactions={annInfo[key].reactions}
                read={
                  annCachedInfo[key] ? annCachedInfo[key].readStatus : false
                }
                to={`${match.url}/${key}`}
                onClick={() => {
                  this.setSessionStorage(key);
                  this.forceUpdate();
                }}
              />
            ))}
        </CenterBox>
      </ConfirmDialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    annInfo: state.store.camp.announcements,
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(AnnList);
