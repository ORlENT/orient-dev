import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Navbar from './navbar';

const styles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
      width: '100%',
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    contentForLogin: {
        width: '100%',
        flexGrow: 1,
    }
});


class Layout extends Component {
  render() {
    const {
      classes,
      children,
    } = this.props;
    return (
    <React.Fragment>
        <Navbar/>
      {/* <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div> */}
      <div className={classes.root}>
        <main className={classes.contentForLogin}>
          {children}
        </main>
      </div>
      </React.Fragment>
    );
  }
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default compose(withStyles(styles), withRouter)(Layout);
