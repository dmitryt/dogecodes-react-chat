import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import Divider from 'material-ui/Divider';

import NavBar from './components/NavBar';
import SearchInput from './components/SearchInput';
import ChatsList from './components/ChatsList';
import AddChatBtn from './components/AddChatBtn';

const styles = theme => ({
  root: {
    position: 'relative',
  },
});

const SideBar = ({ classes, chats, width }) => <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.root }}>
  <SearchInput />
  <Divider />
  <ChatsList chats={chats} />
  <AddChatBtn />
  <NavBar />
</Drawer>

SideBar.propTypes = {
  chats: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.number,
};

SideBar.defaultProps = {
  width: '300px',
};

export default withStyles(styles)(SideBar);
