import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import * as reduxAction from '../store/actions';

import * as Yup from 'yup';


import CustomTextField from '../Layouts/customTextField';

const initialValues = {
  email: '',
  password: '',
};


const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email not valid')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or longer')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password does not match')
    .required('Required'),
});

const LoginForm = ({
  logOut, logIn, enqueueSnackbar, history, classes, firestore, firebase,auth

}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      firebase.auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      ).then(resp => firestore.set(`users/${resp.user.uid}`, {
        email: values.email,
        password: values.password,
      })).then(() => {
        const user = firebase.auth().currentUser;
        if (user != null) {
          user.sendEmailVerification().then(() => {
            enqueueSnackbar('Verification email sent.', {
              variant: 'success',
            });
          }).catch(() => {
            enqueueSnackbar('Verification email failed to send. Please contact an administrator.', {
              variant: 'error',
            });
          });
        }
      }).then(() => {
        logOut();
        enqueueSnackbar('Account registered.', {
          variant: 'success',
        });
        history.push('/');
      }).catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          enqueueSnackbar(err.message, {
            variant: 'warning',
          });
        } else {
          enqueueSnackbar('Something went wrong. Please try again.', {
            variant: 'error',
          });
          console.log(err);
        }
      }).finally(() => {
        setSubmitting(false);
      });
    }}
  >
    {({
      handleSubmit,
      isSubmitting,
    }) => {
      let content = <CircularProgress />;
      if (!isSubmitting) {
        content = (
          <Form onSubmit={handleSubmit}>
            <Field
              required
              name="email"
              label="Email"
              type="email"
              component={CustomTextField}
            />
            <Field
              required
              name="password"
              label="Password"
              type="password"
              component={CustomTextField}
            />
            <Field
              required
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              component={CustomTextField}
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            >
            Register
            </Button>
          </Form>
        );
      }
      return content;
    }}
  </Formik>
);

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(reduxAction.logOut()),
});


LoginForm.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  enqueueSnackbar: PropTypes.func.isRequired,
  /* eslint-enable */
  history: PropTypes.shape({}).isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSnackbar,
  withRouter,
  withFirebase,
  withFirestore,
)(LoginForm);