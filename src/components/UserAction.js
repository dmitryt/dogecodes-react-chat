import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { ListItem, ListItemText } from 'material-ui/List';

import { distanceInWords } from '../utils/date';
import { userShape } from '../shapes';

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

export const UserAction = ({
  classes, color, user, createdAt, content,
}) => (
  <ListItem>
    <ListItemText
      classes={{ primary: classes.primary, secondary: classes.secondary, root: classes.root }}
      secondary={distanceInWords(createdAt)}
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
  user: userShape,
  color: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

UserAction.defaultProps = {
  user: null,
};

export default withStyles(styles)(UserAction);
