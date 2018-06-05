import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';

import { helpers, date } from '../utils';

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

const UserMessage = ({ classes, color, user, isOwn, createdAt, content }) => <ListItem className={classNames({ [classes.isOwnItem]: isOwn })}>
  <Avatar style={{ backgroundColor: color }}>{helpers.titleInitials(user.username)}</Avatar>
  <ListItemText className={classes.listItemText}>
    <Paper elevation={4} className={classNames(classes.content, { [classes.isOwnContent]: isOwn })}>
      <ListItemText classes={{ primary: classes.primary, secondary: classes.secondary }} secondary={date.distanceInWords(createdAt)}>
        <span className={classes.username} style={{ color }}>{helpers.getDisplayedName(user)}</span>
        <p className={classes.message}>{content}</p>
      </ListItemText>
    </Paper>
  </ListItemText>
</ListItem>

export default withStyles(styles)(UserMessage);
