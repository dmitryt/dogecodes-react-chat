import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'typeface-roboto';

import Drawer from 'material-ui/Drawer';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

import RestoreIcon from '@material-ui/icons/Restore';
import ExporeIcon from '@material-ui/icons/Explore';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { chatsData, messagesData } from './mock-data';

import { withStyles } from 'material-ui/styles';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  chatsList: {
    height: `calc(100% - ${theme.spacing.unit * 15}px)`,
    overflow: 'auto',
  },
  chatMessage: {
    margin: theme.spacing.unit,
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 8,
    right: theme.spacing.unit,
  },
  topSearch: {
    padding: `0 ${theme.spacing.unit * 2}px`,
    minHeight: theme.spacing.unit * 8,
  },
  bottomSearch: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    bottom: 0,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    position: 'relative',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
});

function ChatMessage({ color, user, time, message }) {
  return <div>
    <Avatar className={color}>{user[0].toUpperCase()}</Avatar>
    <Paper elevation={4}>
      <ListItemText primary={message} secondary={time} />
    </Paper>
  </div>
}

function ChatInfo({ color, user, time, action }) {
  return <div>
    <div><span style={{ color }}>{user}</span> {action}</div>
    <div>{time}</div>
  </div>
}

function prepareChatMessages(data) {
  return data.map(item => {
    const Component = {
      message: ChatMessage,
      info: ChatInfo,
    }[item.type] || null;
    return <ListItem key={item.id}><Component {...item} /></ListItem>;
  });
}

class PermanentDrawer extends React.Component {
  state = {
    value: 0,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.topSearch}>
          <TextField
            placeholder="Search chats..."
            fullWidth
            margin="normal"
          />
        </div>
        <Divider />
        <List className={classes.chatsList}>
          {chatsData.map(d =>
            <ListItem key={d.id}>
              <Avatar style={{ color: 'white', backgroundColor: d.color }}>{d.abbr}</Avatar>
              <ListItemText primary={d.title} secondary={d.time} />
            </ListItem>
          )}
        </List>
        <Button variant="fab" color="primary" aria-label="add" className={classes.addButton}>
          <AddIcon />
        </Button>
        <Typography component="div">
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Explore" icon={<ExporeIcon />} />
          </BottomNavigation>
        </Typography>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar)}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                DogeCodes Chat
              </Typography>
              <div>
                <IconButton
                  aria-owns="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {drawer}
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

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawer);
