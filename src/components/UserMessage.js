import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Avatar from 'material-ui/Avatar';
import { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';

import { titleInitials, getDisplayedName } from '../utils/helpers';
import { distanceInWords } from '../utils/date';
import { userShape } from '../shapes';

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

export const UserMessage = ({
  classes, color, user, isCreator, createdAt, content,
}) => (
  <ListItem className={classNames({ [classes.isOwnItem]: isCreator })}>
    <Avatar style={{ backgroundColor: color }}>{titleInitials(user.username)}</Avatar>
    <ListItemText className={classes.listItemText}>
      <Paper
        elevation={4}
        className={classNames(classes.content, { [classes.isOwnContent]: isCreator })}
      >
        <ListItemText
          classes={{ primary: classes.primary, secondary: classes.secondary }}
          secondary={distanceInWords(createdAt)}
        >
          <span className={classes.username} style={{ color }}>
            {getDisplayedName(user)}
          </span>
          <p className={classes.message}>{content}</p>
        </ListItemText>
      </Paper>
    </ListItemText>
  </ListItem>
);

UserMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: userShape,
  color: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isCreator: PropTypes.bool.isRequired,
};

UserMessage.defaultProps = {
  user: null,
};

export default withStyles(styles)(UserMessage);
