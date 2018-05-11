import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import { chatsData, messagesData } from './mock-data';

import { withStyles } from 'material-ui/styles';

import AppBar from './components/AppBar';
import SideBar from './components/SideBar';
import { titleInitials } from './utils';

const sidebarWidth = 320;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  chatMessage: {
    margin: theme.spacing.unit,
  },
  messagesList: {
  },
  bottomSearch: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    bottom: 0,
    boxSizing: 'border-box',
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

function ChatMessage({ classes, color, username, time, message }) {
  return <ListItem>
    <Avatar style={{ backgroundColor: color }}>{titleInitials(username)}</Avatar>
    <ListItemText>
      <Paper elevation={4}>
        <ListItemText primary={message} secondary={time} />
      </Paper>
    </ListItemText>
  </ListItem>
}

function ChatInfo({ color, username, time, action }) {
  return <ListItem>
    <ListItemText secondary={time}>
      <span style={{ color }}>{username}</span> {action}
    </ListItemText>
  </ListItem>
}

function prepareChatMessages(data) {
  return data.map(item => {
    const Component = {
      message: ChatMessage,
      info: ChatInfo,
    }[item.type] || null;
    return <Component key={item.id} {...item} />;
  });
}

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar width={`calc(100% - ${sidebarWidth}px)`} />
          <SideBar width={sidebarWidth} chats={chatsData} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <List className={classes.messagesList}>
              {prepareChatMessages(messagesData)}
            </List>
            <Paper elevation={4} className={classes.bottomSearch}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Type your message..."
                fullWidth
                margin="none"
              />
            </Paper>
          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
