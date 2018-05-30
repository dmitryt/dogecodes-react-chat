import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../reducers';
import { getActiveChat, getAllChats, getMyChats } from '../selectors/chatsSelectors';
import ChatPage from '../components/ChatPage';

const {
  logout,
  fetchAllChats,
  fetchMyChats,
  createChat,
  deleteChat,
  setActiveChat,
  sendMessage,
  updateUser,
} = actions;
const mapStateToProps = state => ({
  notification: state.notification,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  messages: state.chats.messages,
  allChats: getAllChats(state),
  myChats: getMyChats(state),
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
  updateUser,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
