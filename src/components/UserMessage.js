import React from 'react';
import PropTypes from 'prop-types';
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
    padding: theme.spacing.unit,
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

const UserMessage = ({
  classes, color, user, isCreator, createdAt, content,
}) => (
  <ListItem className={classNames({ [classes.isOwnItem]: isCreator })}>
    <Avatar style={{ backgroundColor: color }}>{helpers.titleInitials(user.username)}</Avatar>
    <ListItemText className={classes.listItemText}>
      <Paper
        elevation={4}
        className={classNames(classes.content, { [classes.isOwnContent]: isCreator })}
      >
        <ListItemText
          classes={{ primary: classes.primary, secondary: classes.secondary }}
          secondary={date.distanceInWords(createdAt)}
        >
          <span className={classes.username} style={{ color }}>
            {helpers.getDisplayedName(user)}
          </span>
          <p className={classes.message}>{content}</p>
        </ListItemText>
      </Paper>
    </ListItemText>
  </ListItem>
);

UserMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isCreator: PropTypes.bool.isRequired,
};

export default withStyles(styles)(UserMessage);
