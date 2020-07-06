import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox } from "../../../UI";
import timeConverter from "../../../functions/timeConverter";
import { deleteRpt } from "../../../store/actions";

class RptDetails extends Component {
  componentDidMount() {
    this.setState({ rptID: this.props.match.params.rptID });
  }

  handleDelete = () => {
    this.props.deleteRpt(this.state);
    this.props.history.goBack();
  };

  render() {
    const { rptInfo, match } = this.props;
    const key = match.params.rptID;
    return (
      <CenterBox>
        <Header>{rptInfo[key].title}</Header>

        {/*timestamp*/}
        <p style={{ color: "#bbb", margin: "0px" }}>
          Posted on {timeConverter(rptInfo[key].timestamp)}
        </p>

        {/*content*/}
        <p
          style={{
            color: "#fff",
            margin: "0px",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          {rptInfo[key].content}
        </p>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rptInfo: state.store.camp.reports,
    camp: state.store.camp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRpt: (state) => dispatch(deleteRpt(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RptDetails);
