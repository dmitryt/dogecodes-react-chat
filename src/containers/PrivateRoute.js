import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

import { actions } from '../reducers';

class PrivateRoute extends React.Component {
  componentDidMount() {
    this.props.receiveAuth();
  }

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
      )} />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const { receiveAuth } = actions;
const mapDispatchToProps = dispatch => bindActionCreators({
  receiveAuth,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
