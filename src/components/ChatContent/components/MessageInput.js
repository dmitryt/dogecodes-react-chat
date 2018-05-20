import React from 'react';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    bottom: 0,
    boxSizing: 'border-box',
  },
});

const MessageInput = ({ classes, color, username, time, action }) =>
  <Paper elevation={4} className={classes.root}>
    <TextField
      InputLabelProps={{
        shrink: true,
      }}
      placeholder="Type your message..."
      fullWidth
      margin="none"
    />
  </Paper>

export default withStyles(styles)(MessageInput);
