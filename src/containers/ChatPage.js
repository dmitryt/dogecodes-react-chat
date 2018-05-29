import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../reducers';
import { getActiveChat } from '../selectors/chatsSelectors';
import ChatPage from '../pages/Chat';

const {
  logout,
  fetchAllChats,
  fetchMyChats,
  createChat,
  deleteChat,
  setActiveChat,
  sendMessage,
} = actions;
const mapStateToProps = state => ({
  notification: state.notification,
  chats: state.chats,
  isAuthenticated: state.auth.isAuthenticated,
  activeChat: getActiveChat(state),
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  fetchAllChats,
  fetchMyChats,
  createChat,
  deleteChat,
  setActiveChat,
  sendMessage,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
