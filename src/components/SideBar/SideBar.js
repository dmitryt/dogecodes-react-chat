import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import Divider from 'material-ui/Divider';

import NavBar from './components/NavBar';
import SearchInput from './components/SearchInput';
import ChatsList from './components/ChatsList';

const styles = theme => ({
  root: {
    position: 'relative',
  },
});

class SideBar extends React.Component {
  state = {
    chatsType: 'all',
  };

  onTypeChange = (e, chatsType) => {
    this.setState({ chatsType });
  }

  render() {
    const {
      classes,
      chats,
      width,
      setActiveChat,
      activeChat,
      children,
    } = this.props;
    const { chatsType } = this.state;
    const chatsData = chatsType === 'my' ? chats.myIds : chats.allIds;
    return (
      <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.root }}>
        <SearchInput />
        <Divider />
        <ChatsList chats={chatsData} onSelect={setActiveChat} activeChat={activeChat} />
        {children}
        <NavBar chatsType={chatsType} onChange={this.onTypeChange} />
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  chats: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.number,
};

SideBar.defaultProps = {
  width: '300px',
};

export default withStyles(styles)(SideBar);
