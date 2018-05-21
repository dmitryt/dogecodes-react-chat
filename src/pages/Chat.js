import React from 'react';
import PropTypes from 'prop-types';

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

const ChatPage = ({ classes }) => (
  <div className={classes.root}>
    <ChatHeader width={`calc(100% - ${sidebarWidth}px)`} selectedChat={selectedChat} />
    <SideBar width={sidebarWidth} chats={chatsData} />
    <ChatContent messages={messagesData} />
  </div>
);


ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);