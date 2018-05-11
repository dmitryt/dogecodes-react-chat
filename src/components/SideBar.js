import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import Button from 'material-ui/Button';

import RestoreIcon from '@material-ui/icons/Restore';
import ExporeIcon from '@material-ui/icons/Explore';
import AddIcon from '@material-ui/icons/Add';

import { titleInitials } from '../utils';

const styles = theme => ({
  chatsList: {
    height: `calc(100% - ${theme.spacing.unit * 15}px)`,
    overflow: 'auto',
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing.unit * 9,
    right: theme.spacing.unit * 3,
  },
  topSearch: {
    padding: `0 ${theme.spacing.unit * 2}px`,
    minHeight: theme.spacing.unit * 8,
  },
  drawerPaper: {
    position: 'relative',
  },
});

const SideBar = ({ classes, chats, width }) => <Drawer
  variant="permanent"
  style={{ width }}
  classes={{
    paper: classes.drawerPaper
  }}
>
  <div className={classes.topSearch}>
    <TextField
      placeholder="Search chats..."
      fullWidth
      margin="normal"
    />
  </div>
  <Divider />
  <List className={classes.chatsList}>
    {chats.map(d =>
      <ListItem key={d.id} button>
        <Avatar style={{ color: 'white', backgroundColor: d.color }}>{titleInitials(d.username)}</Avatar>
        <ListItemText primary={d.title} secondary={d.time} />
      </ListItem>
    )}
  </List>
  <Button variant="fab" color="primary" aria-label="add" className={classes.addButton}>
    <AddIcon />
  </Button>
  <Typography component="div">
    <BottomNavigation showLabels>
      <BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Explore" icon={<ExporeIcon />} />
    </BottomNavigation>
  </Typography>
</Drawer>

SideBar.propTypes = {
  chats: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.number,
};

SideBar.defaultProps = {
  width: '300px',
};

export default withStyles(styles)(SideBar);
