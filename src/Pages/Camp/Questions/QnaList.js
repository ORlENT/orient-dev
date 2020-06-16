import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, NavButton, SummaryCard } from "../../../UI";

class QnaList extends Component {
  state = {
    qnaCachedInfo: {},
  };

  setSessionStorage(key) {
    var qnaCachedInfo = JSON.parse(sessionStorage.getItem("questions"));
    if (!qnaCachedInfo) {
      qnaCachedInfo = {};
    }
    qnaCachedInfo[`${key}`] = {};
    qnaCachedInfo[`${key}`].readStatus = true;
    sessionStorage.setItem("questions", JSON.stringify(qnaCachedInfo));
    this.getCachedInfo();
  }

  componentDidMount() {
    this.getCachedInfo();
  }

  getCachedInfo() {
    var qnaCachedInfo = JSON.parse(sessionStorage.getItem("questions"));
    if (!qnaCachedInfo) qnaCachedInfo = {};
    this.setState({ qnaCachedInfo });
  }

  render() {
    let { qnaInfo, isAuthed, match } = this.props;
    const { qnaCachedInfo } = this.state;

    return (
      <CenterBox>
        <Header>Questions</Header>

        {/*Ask new Question button*/}
        <NavButton to={`${match.url}/ask`}>Ask new question</NavButton>

        {/*No questions*/}
        {Object.keys(qnaInfo).length === 0 && (
          <Header>No question was found.</Header>
        )}

        {/*Question List*/}
        {qnaInfo &&
          Object.keys(qnaInfo).map((key) => (
            <SummaryCard
              key={key}
              title={qnaInfo[key].question}
              content={qnaInfo[key].answer}
              timestamp={qnaInfo[key].timestamp}
              read={qnaCachedInfo[key] ? qnaCachedInfo[key].readStatus : false}
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
    qnaInfo: state.store.camp.questions,
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(QnaList);
