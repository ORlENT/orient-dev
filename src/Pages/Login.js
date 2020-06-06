import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../UI";
import { Field as CustomField } from "../UI";
import { Formik, Form, Field } from "formik";
import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { getFirebase } from "react-redux-firebase";
import { connect } from "react-redux";

import * as Yup from "yup";

import * as reduxAction from "../store/actions";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Email not valid").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or longer")
    .required("Required"),
});

class Login extends Component {
  render() {
    const { enqueueSnackbar, logIn, history } = this.props;
    return (
      <CenterBox>
        <Header>Login</Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const firebase = getFirebase();
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION)
              .then(function () {
                firebase
                  .auth()
                  .signInWithEmailAndPassword(values.email, values.password)
                  .then(() => {
                    const user = firebase.auth().currentUser;
                    if (user != null) {
                      resetForm();
                      logIn();
                      enqueueSnackbar("Authenticated. Logging in...", {
                        variant: "success",
                      });
                      sessionStorage.setItem("isLogin", true);
                      sessionStorage.setItem("user", user);
                      history.push("/camps/view/");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    enqueueSnackbar("Invalid Credentials. Please try again.", {
                      variant: "error",
                    });
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              });
          }}
        >
          {({ handleSubmit, isSubmitting }) => {
            let content = <CircularProgress />;
            if (!isSubmitting) {
              content = (
                <Form onSubmit={handleSubmit}>
                  <Field
                    required
                    name="email"
                    children="Email"
                    type="email"
                    component={CustomField}
                  />
                  <Field
                    required
                    name="password"
                    children="Password"
                    type="password"
                    component={CustomField}
                  />
                  <NavButton to="/camps">Login</NavButton>
                </Form>
              );
            }
            return content;
          }}
        </Formik>
      </CenterBox>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logIn: () => dispatch(reduxAction.logIn()),
  logOut: () => dispatch(reduxAction.logOut()),
});

Login.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default compose(
  withSnackbar,
  withRouter,
  connect(null, mapDispatchToProps)
)(Login);
