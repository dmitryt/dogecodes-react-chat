import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';

import { chatsData, messagesData, selectedChat } from './mock-data';

import { withStyles } from 'material-ui/styles';

import SideBar from './components/SideBar';
import ChatContent from './components/ChatContent';
import ChatHeader from './components/ChatHeader';

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

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ChatHeader width={`calc(100% - ${sidebarWidth}px)`} selectedChat={selectedChat} />
        <SideBar width={sidebarWidth} chats={chatsData} />
        <ChatContent messages={messagesData} />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
