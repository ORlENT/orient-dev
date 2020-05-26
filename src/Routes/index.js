import React, { Component } from 'react';
import {
  Switch,
  withRouter,
} from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

// import NotFound from '../../components/Error/404';
// import Unknown from '../../components/Error/unknown';

import AdminRoutes from './adminRoutes';
import GuestRoutes from './guestRoutes';
import campAdminRoutes from './campAdminroutes';
import freshmanRoutes from './freshmanroutes';

const userType = {
  ADMIN: 'admin',
  FRESHMAN: 'freshman',
  CAMPADMIN: 'campadmin',
}


class routes extends Component {
  elements(){
    const { isAuthenticated , user } = this.props;
    var result = [];
    if (isAuthenticated){
      switch(user.type){
        case userType.ADMIN:
          result = AdminRoutes;
          break;
        case userType.CAMPADMIN:
          result = campAdminRoutes;
          break;
        case userType.FRESHMAN:
          result = freshmanRoutes;
          break;
        default:
          break;
      }
    } else {
      result = GuestRoutes;
    }
    return result;
  }

  render(){
  return (
    <Switch>
      {this.elements()}
    </Switch>
  );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.firestore.data.user,
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps),
)(routes);
