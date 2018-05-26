import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../reducers';
import ChatPage from '../pages/Chat';

const {
  logout,
  fetchAllChats,
  fetchMyChats,
  createChat,
} = actions;
const mapStateToProps = state => ({
  notification: state.notification,
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  fetchAllChats,
  fetchMyChats,
  createChat,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
