import React from 'react';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 2}px`,
    minHeight: theme.spacing.unit * 8,
  },
});

const SearchInput = ({ classes }) =>
  <div className={classes.root}>
    <TextField
      placeholder="Search chats..."
      fullWidth
      margin="normal"
    />
  </div>

export default withStyles(styles)(SearchInput);
