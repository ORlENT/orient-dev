import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import { getFirebase } from 'react-redux-firebase';

import styles from './login.styles';
import * as Yup from 'yup';


import TextField from '../Layouts/textField';

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
});

const LoginForm = ({
    enqueueSnackbar,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      const firebase = getFirebase();
      firebase.auth().signInWithEmailAndPassword(
        values.email,
        values.password,
      ).then(() => {
        const user = firebase.auth().currentUser;
        if (user != null) {
            resetForm();
            enqueueSnackbar('Authenticated. Logging in...', {
              variant: 'success',
            });
            // history.push(''); go to the next link
          }
      }).catch((err) => {
        console.log(err);
        enqueueSnackbar('Invalid Credentials. Please try again.', {
          variant: 'error',
        });
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
              component={TextField}
            />
            <Field
              required
              name="password"
              label="Password"
              type="password"
              component={TextField}
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            >
            LOGIN
            </Button>
          </Form>
        );
      }
      return content;
    }}
  </Formik>
);


LoginForm.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default compose(withSnackbar, withRouter, withStyles(styles))(LoginForm);
