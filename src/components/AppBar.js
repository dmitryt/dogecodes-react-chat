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

const AppBar = ({ classes, width }) => <MUIAppBar
  position="absolute"
  style={{ width }}
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
</MUIAppBar>

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string,
};

AppBar.defaultProps = {
  width: '300px',
};
export default withStyles(styles)(AppBar);
