import React, { Component } from "react";
import { Header, SubmitButton, CenterBox } from ".";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { closeConfirmForm, setCallback, fetchCampInfo } from "../store/actions";

class ConfirmDialog extends Component {
  state = {
    visible: false,
  };

  componentDidUpdate() {
    try {
      if (!this.state.visible && this.props.confirmForm) {
        this.setState({
          visible: true,
        });
      }

      if (this.state.visible && !this.props.confirmForm) {
        this.setState({
          visible: false,
        });
        this.props.fetchCampInfo(this.props.match.params.campCode);
      }
    } catch (err) {
      console.log(err);
      this.setState({
        errorText: { [err.id]: err.message },
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "grid",
            position: "sticky",
            top: "0",
          }}
        >
          <div
            style={{
              gridColumn: "1",
              gridRow: "1",
              zIndex: "0",
              height: "100vh",
            }}
          >
            {this.props.children}
          </div>
          {/*Admin login*/}
          {this.state.visible && (
            <div
              style={{
                gridColumn: "1",
                gridRow: "1",
                zIndex: "2",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  height: "100vh",
                  zIndex: "2",
                }}
              >
                <CenterBox>
                  <Header>Confirm {this.props.actionText}?</Header>
                  <SubmitButton
                    admin={this.props.admin}
                    onClick={() => {
                      if (this.props.action) {
                        this.props.action();
                      } else {
                        this.props.setCallback();
                      }
                      this.props.closeConfirmForm();
                    }}
                  >
                    {this.props.actionText}
                  </SubmitButton>
                  <SubmitButton
                    secondary
                    admin={this.props.admin}
                    onClick={this.props.closeConfirmForm}
                  >
                    Back
                  </SubmitButton>
                </CenterBox>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

ConfirmDialog.defaultProps = {
  closeConfirmForm: () => null,
  setCallback: () => null,
};

const mapStateToProps = (state) => {
  return {
    ...state,
    confirmForm: state.store.confirmForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeConfirmForm: () => dispatch(closeConfirmForm()),
    setCallback: () => dispatch(setCallback()),
    fetchCampInfo: (campCode) => dispatch(fetchCampInfo(campCode)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ConfirmDialog);
