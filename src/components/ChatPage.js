import React from 'react';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';

import SideBar from '../components/SideBar';
import ChatContent from '../components/ChatContent';
import ChatHeader from '../components/ChatHeader';
import CreateChatForm from './forms/CreateChatForm';
import EditProfileForm from './forms/EditProfileForm';
import MessageInput from '../components/MessageInput';
import AddChatBtn from '../components/AddChatBtn';
import { userShape, activeChatShape, chatShape, notificationShape } from '../shapes';

const sidebarWidth = 320;

const styles = () => ({
  root: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});

export class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this._notificationSystem = React.createRef();
  }

  state = {
    isChatDialogOpened: false,
    isProfileDialogOpened: false,
  };

  componentDidMount() {
    const {
      fetchAllChats, fetchMyChats, match, setActiveChat, initWsConnection,
    } = this.props;
    const { chatId } = match.params;
    initWsConnection();
    fetchAllChats();
    fetchMyChats();
    if (chatId) {
      setActiveChat({ chatId });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      setActiveChat, match, activeChat, mountChat, unmountChat,
    } = this.props;
    const getChatId = chat => chat && chat._id;
    if (this.props.notification && prevProps.notification !== this.props.notification) {
      const { level, message } = this.props.notification;
      this._notificationSystem.current.addNotification({ message, level });
    }
    if (prevProps.match.params.chatId !== match.params.chatId && match.params.chatId) {
      setActiveChat({ chatId: match.params.chatId });
    }
    const prevChatId = getChatId(prevProps.activeChat);
    const currentChatId = getChatId(activeChat);
    if (prevChatId !== currentChatId) {
      if (prevChatId) {
        unmountChat(prevChatId);
      }
      if (currentChatId) {
        mountChat(currentChatId);
      }
    }
  }

  componentWillUnmount() {
    this.props.wsConnectionClose();
  }

  onCreateChat = (data) => {
    this.closeChatDialog();
    this.props.createChat(data);
  };

  onEditProfile = (data) => {
    this.closeProfileDialog();
    this.props.updateUser(data);
  };

  onChatSelect = (chatId) => {
    this.props.redirectToChat({ chatId });
  };

  closeProfileDialog = () => {
    this.setState({ isProfileDialogOpened: false });
  };

  openProfileDialog = () => {
    this.setState({ isProfileDialogOpened: true });
  };

  closeChatDialog = () => {
    this.setState({ isChatDialogOpened: false });
  };

  openChatDialog = () => {
    this.setState({ isChatDialogOpened: true });
  };

  render() {
    const {
      classes,
      logout,
      user,
      allChats,
      myChats,
      deleteChat,
      joinChat,
      leaveChat,
      activeChat,
      sendMessage,
      isChatMember,
      isCreator,
      redirectToChatsList,
      isConnected,
    } = this.props;
    const { isChatDialogOpened, isProfileDialogOpened } = this.state;
    const disabled = !isConnected;
    return (
      <div className={classes.root}>
        <ChatHeader
          width={`calc(100% - ${sidebarWidth}px)`}
          activeChat={activeChat}
          logout={logout}
          isCreator={isCreator}
          isChatMember={isChatMember}
          disabled={disabled}
          deleteChat={deleteChat}
          leaveChat={leaveChat}
          redirectToChatsList={redirectToChatsList}
          openProfileDialog={this.openProfileDialog}
        />
        <SideBar
          width={sidebarWidth}
          onChatSelect={this.onChatSelect}
          disabled={disabled}
          allChats={allChats}
          myChats={myChats}
          activeChat={activeChat}
        >
          <AddChatBtn onClick={this.openChatDialog} disabled={disabled} />
        </SideBar>
        <ChatContent activeChat={activeChat} user={user} disabled={disabled}>
          {isChatMember ? (
            <MessageInput onSubmit={sendMessage} disabled={disabled} />
          ) : (
            <Button
              variant="raised"
              color="primary"
              onClick={joinChat}
              disabled={disabled}
              fullWidth
            >
              Join Chat
            </Button>
          )}
        </ChatContent>
        <NotificationSystem ref={this._notificationSystem} />
        <CreateChatForm
          onSubmit={this.onCreateChat}
          open={isChatDialogOpened}
          onClose={this.closeChatDialog}
        />
        <EditProfileForm
          user={user}
          onSubmit={this.onEditProfile}
          open={isProfileDialogOpened}
          onClose={this.closeProfileDialog}
        />
      </div>
    );
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: userShape,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  allChats: PropTypes.arrayOf(chatShape).isRequired,
  myChats: PropTypes.arrayOf(chatShape).isRequired,
  notification: notificationShape,
  activeChat: activeChatShape,
  isCreator: PropTypes.bool.isRequired,
  isChatMember: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,

  logout: PropTypes.func,
  createChat: PropTypes.func,
  fetchAllChats: PropTypes.func,
  fetchMyChats: PropTypes.func,
  redirectToChat: PropTypes.func,
  redirectToChatsList: PropTypes.func,
  joinChat: PropTypes.func,
  leaveChat: PropTypes.func,
  deleteChat: PropTypes.func,
  mountChat: PropTypes.func,
  unmountChat: PropTypes.func,
  setActiveChat: PropTypes.func,
  initWsConnection: PropTypes.func,
  wsConnectionClose: PropTypes.func,
  updateUser: PropTypes.func,
  sendMessage: PropTypes.func,
};

ChatPage.defaultProps = {
  notification: null,
  user: null,
  activeChat: null,
  logout: () => {},
  createChat: () => {},
  fetchAllChats: () => {},
  fetchMyChats: () => {},
  redirectToChat: () => {},
  redirectToChatsList: () => {},
  joinChat: () => {},
  leaveChat: () => {},
  deleteChat: () => {},
  mountChat: () => {},
  unmountChat: () => {},
  setActiveChat: () => {},
  initWsConnection: () => {},
  wsConnectionClose: () => {},
  updateUser: () => {},
  sendMessage: () => {},
};

export default withStyles(styles)(ChatPage);
