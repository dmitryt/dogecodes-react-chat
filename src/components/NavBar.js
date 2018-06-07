import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

import RestoreIcon from '@material-ui/icons/Restore';
import ExporeIcon from '@material-ui/icons/Explore';

const NavBar = ({ chatsType, onChange }) => (
  <Typography component="div">
    <BottomNavigation
      value={chatsType}
      onChange={onChange}
      showLabels
    >
      <BottomNavigationAction label="My Chats" value="my" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Explore" value="all" icon={<ExporeIcon />} />
    </BottomNavigation>
  </Typography>
);

NavBar.propTypes = {
  chatsType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NavBar;
