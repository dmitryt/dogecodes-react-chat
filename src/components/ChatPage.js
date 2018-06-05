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

const sidebarWidth = 320;

const styles = theme => ({
  root: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});

class ChatPage extends React.Component {
  state = {
    isChatDialogOpened: false,
    isProfileDialogOpened: false,
  };

  onCreateChat = data => {
    this.closeChatDialog();
    this.props.createChat(data);
  }

  onEditProfile = data => {
    this.closeProfileDialog();
    this.props.updateUser(data);
  }

  openChatDialog = () => {
    this.setState({ isChatDialogOpened: true });
  };

  closeChatDialog = () => {
    this.setState({ isChatDialogOpened: false });
  };

  openProfileDialog = () => {
    this.setState({ isProfileDialogOpened: true });
  };

  closeProfileDialog = () => {
    this.setState({ isProfileDialogOpened: false });
  };

  onChatSelect = chatId => {
    this.props.redirectToChat({ chatId });
    this.props.setActiveChat({ chatId });
  };

  constructor(props) {
    super(props);
    this._notificationSystem = React.createRef();
  }

  componentDidMount() {
    const {
      fetchAllChats,
      fetchMyChats,
      match,
      setActiveChat,
      initWsConnection,
    } = this.props;
    const { chatId } = match.params;
    initWsConnection();
    if (chatId) {
      setActiveChat({ chatId });
    }
    fetchAllChats();
    fetchMyChats();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notification !== this.props.notification) {
      const { level, message } = this.props.notification || {};
      this._notificationSystem.current.addNotification({ message, level });
    }
  }

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
    } = this.props;
    const { isChatDialogOpened, isProfileDialogOpened } = this.state;
    return (
      <div className={classes.root}>
        <ChatHeader
          width={`calc(100% - ${sidebarWidth}px)`}
          activeChat={activeChat}
          logout={logout}
          isCreator={isCreator}
          isChatMember={isChatMember}
          deleteChat={deleteChat}
          leaveChat={leaveChat}
          redirectToChatsList={redirectToChatsList}
          openProfileDialog={this.openProfileDialog}
        />
        <SideBar
          width={sidebarWidth}
          onChatSelect={this.onChatSelect}
          allChats={allChats}
          myChats={myChats}
          activeChat={activeChat}
        >
          <AddChatBtn onClick={this.openChatDialog} />
        </SideBar>
        <ChatContent activeChat={activeChat} user={user}>
          {
            isChatMember ? (
              <MessageInput onSubmit={sendMessage} />
            ) : (
                <Button
                  variant="raised"
                  color="primary"
                  onClick={joinChat}
                  fullWidth
                >
                  Join Chat
            </Button>
              )
          }
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
  logout: PropTypes.func.isRequired,
  fetchAllChats: PropTypes.func.isRequired,
  fetchMyChats: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  allChats: PropTypes.array.isRequired,
  myChats: PropTypes.array.isRequired,
  notification: PropTypes.object,
  activeChat: PropTypes.object,
};

ChatPage.defaultProps = {
  notification: {},
  activeChat: null,
};

export default withStyles(styles)(ChatPage);
