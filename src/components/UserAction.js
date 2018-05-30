import React from 'react';
import { withStyles } from 'material-ui/styles';

import { ListItem, ListItemText } from 'material-ui/List';

const styles = {
  username: {
    fontSize: 12,
  },
  root: {
    textAlign: 'center',
  },
  primary: {
    fontSize: 14,
  },
  secondary: {
    fontSize: 12,
  },
};

const UserAction = ({ classes, color, username, time, action }) => <ListItem>
  <ListItemText classes={{ primary: classes.primary, secondary: classes.secondary, root: classes.root }} secondary={time}>
    <span style={{ color }} className={classes.username}>{username}</span> {action}
  </ListItemText>
</ListItem>

export default withStyles(styles)(UserAction);
