import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import Divider from 'material-ui/Divider';

import NavBar from './NavBar';
import SearchInput from './SearchInput';
import ChatsList from './ChatsList';

import { chatShape, activeChatShape } from '../shapes';
import { filterAndSortChats } from '../utils/helpers';

const styles = () => ({
  root: {
    position: 'relative',
  },
});

export class SideBar extends React.Component {
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
    return filterAndSortChats(chatsType === 'my' ? myChats : allChats, filter);
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
  onChatSelect: PropTypes.func,
};

SideBar.defaultProps = {
  activeChat: null,
  width: 300,
  onChatSelect: () => {},
};

export default withStyles(styles)(SideBar);
