import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Field from "./Field";
import { LoadingScreenSmall } from "./LoadingScreen";

class Form extends Component {
  render() {
    const {
      admin,
      onChange,
      onSubmit,
      loading,
      children,
      ...rest
    } = this.props;
    return (
      <div
        style={{
          display: "grid",
        }}
      >
        {/* Loading Screen */}
        {loading ? (
          <LoadingScreenSmall
            style={{
              gridColumn: "1",
              gridRow: "1",
              zIndex: "1",
            }}
          />
        ) : null}

        {/* Form */}
        <form
          onSubmit={onSubmit}
          style={{
            gridColumn: "1",
            gridRow: "1",
          }}
          {...rest}
        >
          <Grid container spacing={2}>
            {React.Children.map(children, (child) =>
              child ? (
                <Grid item style={{ width: "100%" }}>
                  {child.type === Field
                    ? React.cloneElement(child, { admin, onChange })
                    : React.cloneElement(child, { admin })}
                </Grid>
              ) : null
            )}
          </Grid>
        </form>
      </div>
    );
  }
}

export default Form;
