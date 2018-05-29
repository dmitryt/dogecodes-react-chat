import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import Button from 'material-ui/Button';

import { messagesData } from '../mock-data';

import { withStyles } from 'material-ui/styles';

import SideBar from '../components/SideBar';
import ChatContent from '../components/ChatContent';
import ChatHeader from '../components/ChatHeader';
import CreateChatForm from '../forms/CreateChatForm';
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
    open: false,
    isChatMember: true,
  };

  onCreateChat = data => {
    this.closeChatDialog();
    this.props.createChat(data);
  }

  openChatDialog = () => {
    this.setState({ open: true });
  };

  closeChatDialog = () => {
    this.setState({ open: false });
  };

  constructor(props) {
    super(props);
    this._notificationSystem = React.createRef();
  }

  componentDidMount() {
    const { fetchAllChats, fetchMyChats, match, setActiveChat } = this.props;
    const { chatId } = match.params;
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
      chats,
      deleteChat,
      isAuthenticated,
      joinChat,
      setActiveChat,
      activeChat,
      sendMessage,
    } = this.props;
    const { open, isChatMember } = this.state;
    if (!isAuthenticated) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className={classes.root}>
        <ChatHeader
          width={`calc(100% - ${sidebarWidth}px)`}
          activeChat={activeChat}
          logout={logout}
          deleteChat={deleteChat}
        />
        <SideBar
          width={sidebarWidth}
          setActiveChat={setActiveChat}
          chats={chats}
          activeChat={activeChat}
        >
          <AddChatBtn onClick={this.openChatDialog} />
        </SideBar>
        <ChatContent messages={messagesData}>
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
        <CreateChatForm onSubmit={this.onCreateChat} open={open} onClose={this.closeChatDialog} />
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
  chats: PropTypes.object.isRequired,
  notification: PropTypes.object,
  activeChat: PropTypes.object,
};

ChatPage.defaultProps = {
  notification: {},
  activeChat: null,
};

export default withStyles(styles)(ChatPage);
