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

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuIcon: {
    color: 'white',
    '&:hover': {
      backgroundColor: 'inherit',
    }
  }
});

class ChatHeader extends React.Component {
  state = {
    anchorElUser: null,
    anchorElChat: null,
  };

  handleMenuOpen = ({ currentTarget }) => {
    const key = currentTarget.getAttribute('data-id');
    this.setState({ [key]: currentTarget });
  };

  onLogout = () => {
    this.props.logout();
    this.handleMenuClose();
  };

  onEditProfile = () => {
    this.props.openProfileDialog();
    this.handleMenuClose();
  }

  onDeleteChat = () => {
    this.props.deleteChat();
    this.handleMenuClose();
  };

  handleMenuClose = () => {
    this.setState({ anchorElUser: null });
    this.setState({ anchorElChat: null });
  };

  render() {
    const { classes, width, activeChat } = this.props;
    const { anchorElUser, anchorElChat } = this.state;
    return (
      <MUIAppBar
        position="absolute"
        style={{ width }}
      >
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {activeChat ? (
              <React.Fragment>
                {activeChat.title}
                <IconButton
                  className={classes.menuIcon}
                  data-id="anchorElChat"
                  aria-label="More"
                  aria-owns={anchorElChat ? 'chat-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenuOpen}
                >
                  <MoreVertIcon />
                </IconButton>
              </React.Fragment>
            ) : null}
            <Menu
              id="chat-menu"
              anchorEl={anchorElChat}
              open={Boolean(anchorElChat)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.onDeleteChat}>Delete</MenuItem>
            </Menu>
          </Typography>
          <div>
            <IconButton
              data-id="anchorElUser"
              aria-owns={anchorElUser ? 'user-menu' : null}
              aria-haspopup="true"
              color="inherit"
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
  logout: PropTypes.func.isRequired,
  deleteChat: PropTypes.func.isRequired,
  openProfileDialog: PropTypes.func.isRequired,
  activeChat: PropTypes.object,
  width: PropTypes.string,
};

ChatHeader.defaultProps = {
  width: '300px',
  activeChat: null,
};
export default withStyles(styles)(ChatHeader);
