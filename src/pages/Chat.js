import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { chatsData, messagesData, selectedChat } from '../mock-data';

import { withStyles } from 'material-ui/styles';

import SideBar from '../components/SideBar';
import ChatContent from '../components/ChatContent';
import ChatHeader from '../components/ChatHeader';

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
  render() {
    const { classes, logout, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className={classes.root}>
        <ChatHeader width={`calc(100% - ${sidebarWidth}px)`} selectedChat={selectedChat} logout={logout} />
        <SideBar width={sidebarWidth} chats={chatsData} />
        <ChatContent messages={messagesData} />
      </div>
    );
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ChatPage);
