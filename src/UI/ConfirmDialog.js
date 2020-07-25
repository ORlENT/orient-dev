import React, { Component } from "react";
import { Header, SubmitButton, CenterBox } from ".";
import { connect } from "react-redux";

import { compose } from "redux";
import { dispatchType } from "../store/actions";

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
            height: "100%",
            top: "0",
          }}
        >
          <div
            style={{
              gridColumn: "1",
              gridRow: "1",
              zIndex: "0",
              height: "100%",
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
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                height: "100%",
              }}
            >
              <div
                style={{
                  height: "100vh",
                  zIndex: "2",
                  position: "fixed",
                  width: "100vw",
                }}
              >
                <CenterBox>
                  <Header>Confirm {this.props.actionText}?</Header>
                  <SubmitButton
                    admin={this.props.admin}
                    onClick={() => {
                      this.props.dispatchType("CONFIRMFORM_CONFIRM");
                    }}
                  >
                    {this.props.actionText}
                  </SubmitButton>
                  <SubmitButton
                    secondary
                    admin={this.props.admin}
                    onClick={() => {
                      this.props.dispatchType("CONFIRM_FORM_CLOSE");
                    }}
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
    confirmForm: state.store.confirmForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchType: (type) => dispatch(dispatchType(type)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ConfirmDialog
);
