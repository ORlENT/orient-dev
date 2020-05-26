import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import styles from './login.styles';

import Container from './Container';

class Login extends Component {
  render() {
    const {
        classes
      } = this.props;
    return (
        <Grid container className={classes.root}>
            <Grid item xs={6}>
                <Container/>
            </Grid>
        </Grid>
    );
  }
}

Login.propTypes = {
  /* eslint-enable */
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Login);
