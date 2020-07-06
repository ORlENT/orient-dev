import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Header,
  CenterBox,
  NavButton,
  QnaCard,
  ConfirmDialog,
} from "../../../UI";

class QnaList extends Component {
  state = {
    qnaCachedInfo: {},
  };

  componentDidMount() {
    this.getCachedInfo();
  }

  getCachedInfo() {
    var qnaCachedInfo = JSON.parse(sessionStorage.getItem("questions"));
    if (!qnaCachedInfo) qnaCachedInfo = {};
    this.setState({ qnaCachedInfo });
  }

  render() {
    let { qnaInfo, match } = this.props;
    const { qnaCachedInfo } = this.state;

    return (
      <ConfirmDialog actionText="Delete question" admin>
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
              <QnaCard
                key={key}
                qnaID={key}
                title={qnaInfo[key].question}
                content={qnaInfo[key].answer}
                timestamp={qnaInfo[key].timestamp}
                asked={
                  qnaCachedInfo[key] ? qnaCachedInfo[key].askedStatus : false
                }
                answered={!!qnaInfo[key].answer}
                to={`${match.url}/${key}`}
              />
            ))}
        </CenterBox>
      </ConfirmDialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    qnaInfo: state.store.camp.questions,
  };
};

export default connect(mapStateToProps)(QnaList);
