import React,  {Component} from 'react';
import {
  Paper,
  Grid,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import styles from './login.styles';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


class Container extends Component {

    state= {
        loginForm: true,
    }

    constructor(props) {
    super(props);
        this.setLogin = this.setLogin.bind(this);
        this.setRegister = this.setRegister.bind(this);
    }

    setLogin(e) {
        this.setState({
            loginForm: true
        })
    }

    setRegister(e) {
        this.setState({
            loginForm: false
        })
    }

    handleSubmit(e) {
        
    }

    render() {
      const {
          classes
        } = this.props;
        const {
            loginForm
        } = this.state;
      return (
          <Paper className={classes.logRegForm} style={{ width: '50%'}}>
            <Grid container className={classes.greyColor} justify="center">
            <Grid item xs={6} style={{display:'flex'}}>
            <Button className={classes.formButton} disableElevation onClick={this.setLogin}>
                Login
            </Button>
            </Grid>
            <Grid item xs={6} style={{display:'flex'}}>
            <Button className={classes.formButton} disableElevation onClick={this.setRegister}>
                Register
            </Button>
            </Grid>
            </Grid>
            <div className={classes.form}>
                {loginForm && (<LoginForm props={this.handleSubmit}></LoginForm>)}
                {!loginForm && (<RegisterForm></RegisterForm>)}
            </div> 
          </Paper>
      );
    }
  }
  

  Container.propTypes = {
    /* eslint-enable */
    classes: PropTypes.shape({}).isRequired,
  };

  export default withStyles(styles)(Container);
  
