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
    const { chatsType, onChange } = this.props;
    return <Typography component="div">
      <BottomNavigation
        value={chatsType}
        onChange={onChange}
        showLabels>
        <BottomNavigationAction label="My Chats" value="my" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Explore" value="all" icon={<ExporeIcon />} />
      </BottomNavigation>
    </Typography>
  }
}

export default NavBar;
