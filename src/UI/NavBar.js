import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import AdminLogin from "./AdminLogin";

class NavBar extends Component {
  state = {
    visible: false,
  };

  toggleVisibility = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  componentDidUpdate() {
    if (this.props.isAuthed && this.state.visible) {
      this.setState({
        visible: false,
      });
    }
  }

  render() {
    const { isAuthed, children } = this.props;
    return (
      <div
        style={{
          display: "grid",
          position: "sticky",
          top: "0",
        }}
      >
        {/*Navbar*/}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
            display: "grid",
            height: "60px",
          }}
        >
          {/*Admin login button*/}
          <Button
            color="secondary"
            style={{
              gridColumn: "1",
              gridRow: "1",
              justifySelf: "end",
              zIndex: "1",
              width: "150px",
            }}
            onClick={this.toggleVisibility}
          >
            {isAuthed ? "Logout" : "Login as admin"}
          </Button>

          {/*Title*/}
          <div
            className="centerContent"
            style={{
              gridColumn: "1",
              gridRow: "1",
              backgroundColor: "#222",
            }}
          >
            {children}
          </div>
        </div>

        {/*Admin login*/}
        {this.state.visible && (
          <div
            style={{
              gridColumn: "1",
              gridRow: "1",
              zIndex: "1",
            }}
          >
            <AdminLogin toggleVisibility={this.toggleVisibility} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthed: state.auth.isAuthed,
  };
};

export default connect(mapStateToProps)(NavBar);
