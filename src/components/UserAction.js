import React from 'react';
import { withStyles } from 'material-ui/styles';

import { ListItem, ListItemText } from 'material-ui/List';

import { date } from '../utils';

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

const UserAction = ({ classes, color, user, createdAt, content }) => <ListItem>
  <ListItemText classes={{ primary: classes.primary, secondary: classes.secondary, root: classes.root }} secondary={date.distanceInWords(createdAt)}>
    <span style={{ color }} className={classes.username}>{user.username}</span> {content}
  </ListItemText>
</ListItem>

export default withStyles(styles)(UserAction);
