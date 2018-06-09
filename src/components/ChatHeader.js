import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Toolbar from 'material-ui/Toolbar';
import MUIAppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { chatShape } from '../shapes';

const styles = () => ({
  flex: {
    flex: 1,
  },
  menuIcon: {
    color: 'white',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
});

class ChatHeader extends React.Component {
  state = {
    anchorElUser: null,
    anchorElChat: null,
  };

  onLogout = () => {
    this.props.logout();
    this.handleMenuClose();
  };

  onEditProfile = () => {
    this.props.openProfileDialog();
    this.handleMenuClose();
  };

  onDeleteChat = () => {
    this.props.deleteChat();
    this.props.redirectToChatsList();
    this.handleMenuClose();
  };

  onLeaveChat = () => {
    this.props.leaveChat();
    this.handleMenuClose();
  };

  handleMenuOpen = ({ currentTarget }) => {
    const key = currentTarget.getAttribute('data-id');
    this.setState({ [key]: currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorElUser: null });
    this.setState({ anchorElChat: null });
  };

  render() {
    const {
      classes, width, activeChat, isCreator, isChatMember, disabled,
    } = this.props;
    const { anchorElUser, anchorElChat } = this.state;
    return (
      <MUIAppBar position="absolute" style={{ width }}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {activeChat ? (
              <React.Fragment>
                {activeChat.title}
                {isChatMember ? (
                  <IconButton
                    className={classes.menuIcon}
                    data-id="anchorElChat"
                    aria-label="More"
                    aria-owns={anchorElChat ? 'chat-menu' : null}
                    aria-haspopup="true"
                    disabled={disabled}
                    onClick={this.handleMenuOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                ) : null}
              </React.Fragment>
            ) : null}
            <Menu
              id="chat-menu"
              anchorEl={anchorElChat}
              open={Boolean(anchorElChat)}
              onClose={this.handleMenuClose}
            >
              {' '}
              {isCreator ? (
                <MenuItem onClick={this.onDeleteChat}>Delete</MenuItem>
              ) : (
                <MenuItem onClick={this.onLeaveChat}>Leave</MenuItem>
              )}
            </Menu>
          </Typography>
          <div>
            <IconButton
              data-id="anchorElUser"
              aria-owns={anchorElUser ? 'user-menu' : null}
              aria-haspopup="true"
              color="inherit"
              disabled={disabled}
              onClick={this.handleMenuOpen}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.onEditProfile}>Edit Profile</MenuItem>
              <MenuItem onClick={this.onLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </MUIAppBar>
    );
  }
}

ChatHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  isCreator: PropTypes.bool.isRequired,
  isChatMember: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  activeChat: chatShape,
  width: PropTypes.string,

  logout: PropTypes.func.isRequired,
  deleteChat: PropTypes.func.isRequired,
  openProfileDialog: PropTypes.func.isRequired,
  redirectToChatsList: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
};

ChatHeader.defaultProps = {
  width: '300px',
  activeChat: null,
};
export default withStyles(styles)(ChatHeader);
