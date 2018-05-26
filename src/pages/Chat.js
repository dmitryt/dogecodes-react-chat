import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import { chatsData, messagesData, selectedChat } from '../mock-data';

import { withStyles } from 'material-ui/styles';

import SideBar from '../components/SideBar';
import ChatContent from '../components/ChatContent';
import ChatHeader from '../components/ChatHeader';
import CreateChatForm from '../components/CreateChatForm';
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
    const { fetchAllChats, fetchMyChats } = this.props;
    Promise.all([
      fetchAllChats(),
      fetchMyChats(),
    ]);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notification !== this.props.notification) {
      const { level, message } = this.props.notification || {};
      this._notificationSystem.current.addNotification({ message, level });
    }
  }

  render() {
    const { classes, logout, isAuthenticated } = this.props;
    const { open } = this.state;
    if (!isAuthenticated) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className={classes.root}>
        <ChatHeader width={`calc(100% - ${sidebarWidth}px)`} selectedChat={selectedChat} logout={logout} />
        <SideBar width={sidebarWidth} chats={chatsData}>
          <AddChatBtn onClick={this.openChatDialog} />
        </SideBar>
        <ChatContent messages={messagesData} />
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
  notification: PropTypes.object,
};

ChatPage.defaultProps = {
  notification: {},
};

export default withStyles(styles)(ChatPage);
