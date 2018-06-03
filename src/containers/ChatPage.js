import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../reducers';
import {
  getAllChats,
  getMyChats,
  isMember,
  isCreator,
  isChatMember
} from '../selectors/chats';
import ChatPage from '../components/ChatPage';

const {
  logout,
  fetchAllChats,
  fetchMyChats,
  createChat,
  joinChat,
  leaveChat,
  deleteChat,
  setActiveChat,
  sendMessage,
  updateUser,
  redirectToChat,
  redirectToChatsList,
  initWsConnection,
} = actions;
const mapStateToProps = state => ({
  notification: state.notification,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  activeChat: state.chats.activeChat,
  allChats: getAllChats(state),
  myChats: getMyChats(state),
  isMember: isMember(state),
  isCreator: isCreator(state),
  isChatMember: isChatMember(state),
});
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  fetchAllChats,
  fetchMyChats,
  createChat,
  deleteChat,
  joinChat,
  leaveChat,
  setActiveChat,
  sendMessage,
  updateUser,
  redirectToChat,
  redirectToChatsList,
  initWsConnection,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
