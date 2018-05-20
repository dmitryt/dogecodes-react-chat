import React from 'react';

import Typography from 'material-ui/Typography';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

import RestoreIcon from '@material-ui/icons/Restore';
import ExporeIcon from '@material-ui/icons/Explore';

class NavBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return <Typography component="div">
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels>
        <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Explore" icon={<ExporeIcon />} />
      </BottomNavigation>
    </Typography>
  }
}

export default NavBar;
