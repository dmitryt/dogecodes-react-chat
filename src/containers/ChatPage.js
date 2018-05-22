import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../reducers';
import ChatPage from '../pages/Chat';

const { logout } = actions;
const mapStateToProps = state => ({
  notification: state.notification,
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
