import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import {
  Typography,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import RouteButton from './routeButton'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    width: '80%',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  color: {
      backgroundColor: '#424242',
  }
});


class NavBar extends Component {
  render() {
    const {
      classes,
    } = this.props;
    return (
        <AppBar position="static" className={classes.color}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Orient ProtoType
          </Typography>
          <RouteButton route=""></RouteButton>
        </Toolbar>
      </AppBar>
    );
  }
}


NavBar.propTypes = {
  classes: PropTypes.any.isRequired,
};


export default compose(withStyles(styles))(NavBar);
