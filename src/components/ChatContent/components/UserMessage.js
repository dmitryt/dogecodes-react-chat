import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';

import { helpers } from '../../../utils';

const styles = theme => ({
  listItemText: {
    flex: 'none',
  },
  isOwnItem: {
    flexDirection: 'row-reverse',
  },
  content: {
    padding: theme.spacing.unit
  },
  isOwnContent: {
    backgroundColor: '#e6dcff',
  },
  username: {
    fontSize: 12,
  },
  root: {
    flex: 'none',
  },
  primary: {
    fontSize: 14,
  },
  secondary: {
    fontSize: 12,
  },
  message: {
    margin: 0,
  },
});

const UserMessage = ({ classes, color, username, isOwn, time, message }) => <ListItem className={classNames({ [classes.isOwnItem]: isOwn })}>
  <Avatar style={{ backgroundColor: color }}>{helpers.titleInitials(username)}</Avatar>
  <ListItemText className={classes.listItemText}>
    <Paper elevation={4} className={classNames(classes.content, { [classes.isOwnContent]: isOwn })}>
      <ListItemText classes={{ primary: classes.primary, secondary: classes.secondary }} secondary={time}>
        <span className={classes.username} style={{ color }}>{username}</span>
        <p className={classes.message}>{message}</p>
      </ListItemText>
    </Paper>
  </ListItemText>
</ListItem>

export default withStyles(styles)(UserMessage);
