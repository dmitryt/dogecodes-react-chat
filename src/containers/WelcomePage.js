import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../reducers';
import WelcomePage from '../components/WelcomePage';

const { login, signup } = actions;
const mapStateToProps = state => ({
  notification: state.notification,
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      signup,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomePage);
