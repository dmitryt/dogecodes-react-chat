import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import Divider from 'material-ui/Divider';

import NavBar from './NavBar';
import SearchInput from './SearchInput';
import ChatsList from './ChatsList';

import { chatShape, activeChatShape } from '../shapes';

const styles = () => ({
  root: {
    position: 'relative',
  },
});

class SideBar extends React.Component {
  state = {
    chatsType: 'all',
    filter: '',
  };

  onTypeChange = (e, chatsType) => {
    this.setState({ chatsType });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  getChats() {
    const { myChats, allChats } = this.props;
    const { chatsType, filter } = this.state;
    const sortFn = (a, b) => (a.title.toLowerCase() <= b.title.toLowerCase() ? -1 : 1);
    const chats = (chatsType === 'my' ? myChats : allChats).sort(sortFn);
    if (!filter) {
      return chats;
    }
    return chats.filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()));
  }

  render() {
    const {
      classes, width, onChatSelect, activeChat, disabled, children,
    } = this.props;
    const { chatsType } = this.state;
    const chatsData = this.getChats();
    return (
      <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.root }}>
        <SearchInput onChange={this.onFilterChange} />
        <Divider />
        <ChatsList
          chats={chatsData}
          onSelect={onChatSelect}
          activeChat={activeChat}
          disabled={disabled}
        />
        {children}
        <NavBar chatsType={chatsType} onChange={this.onTypeChange} />
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  allChats: PropTypes.arrayOf(chatShape).isRequired,
  myChats: PropTypes.arrayOf(chatShape).isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  activeChat: activeChatShape,
  width: PropTypes.number,
  onChatSelect: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  activeChat: null,
  width: '300px',
};

export default withStyles(styles)(SideBar);
