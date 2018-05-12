import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Toolbar from 'material-ui/Toolbar';
import MUIAppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  flex: {
    flex: 1,
  },
});

const ChatHeader = ({ classes, width, selectedChat }) => <MUIAppBar
  position="absolute"
  style={{ width }}
>
  <Toolbar>
    <Typography variant="title" color="inherit" className={classes.flex}>
    {selectedChat.title}
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
</MUIAppBar>

ChatHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedChat: PropTypes.object.isRequired,
  width: PropTypes.string,
};

ChatHeader.defaultProps = {
  width: '300px',
};
export default withStyles(styles)(ChatHeader);
