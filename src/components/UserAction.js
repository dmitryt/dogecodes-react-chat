import React from 'react';
import PropTypes from 'prop-types';
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

const UserAction = ({
  classes, color, user, createdAt, content,
}) => (
  <ListItem>
    <ListItemText
      classes={{ primary: classes.primary, secondary: classes.secondary, root: classes.root }}
      secondary={date.distanceInWords(createdAt)}
    >
      <span style={{ color }} className={classes.username}>
        {user.username}
      </span>{' '}
      {content}
    </ListItemText>
  </ListItem>
);

UserAction.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserAction);
