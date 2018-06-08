import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Paper from 'material-ui/Paper';

const styles = theme => ({
  username: {
    fontSize: 12,
  },
  root: {
    fontSize: '0.875rem',
    padding: theme.spacing.unit * 3,
    height: theme.spacing.unit * 10,
    width: theme.spacing.unit * 45,
    margin: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

const InviteLabel = ({ classes }) => (
  <Paper className={classes.root}>
    <Typography variant="headline" component="h1" className={classes.title}>
      Start messaging...
    </Typography>
    <Typography component="p">
      Use <b>Global</b> to explore communities around here.
    </Typography>
    <Typography component="p">
      Use <b>Recents</b> to see your recent conversations.
    </Typography>
  </Paper>
);

InviteLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InviteLabel);
