import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, AnnCard } from "../../../UI";

class RepList extends Component {
  render() {
    let { rptInfo, match } = this.props;
    return (
      <CenterBox>
        <Header>Reports</Header>

        {/*No reports (Admin only) */}
        {Object.keys(rptInfo).length === 0 && (
          <Header>No report was found.</Header>
        )}

        {/*Report List*/}
        {rptInfo &&
          Object.keys(rptInfo).map((key) => (
            <AnnCard
              key={key}
              title={rptInfo[key].title}
              content={rptInfo[key].content}
              timestamp={rptInfo[key].timestamp}
              to={`${match.url}/${key}`}
            />
          ))}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rptInfo: state.store.camp.reports,
  };
};

export default connect(mapStateToProps)(RepList);
