import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Toolbar from 'material-ui/Toolbar';
import MUIAppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  flex: {
    flex: 1,
  },
});

class ChatHeader extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClick = event => {
    this.props.logout();
    this.handleMenuClose();
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes, width, selectedChat } = this.props;
    const { anchorEl } = this.state;
    return (
      <MUIAppBar
        position="absolute"
        style={{ width }}
      >
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {selectedChat.title}
          </Typography>
          <div>
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              color="inherit"
              onClick={this.handleMenuOpen}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </MUIAppBar>
    );
  }
}


ChatHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedChat: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  width: PropTypes.string,
};

ChatHeader.defaultProps = {
  width: '300px',
};
export default withStyles(styles)(ChatHeader);
