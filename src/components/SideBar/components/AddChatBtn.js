import React from 'react';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';

import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing.unit * 9,
    right: theme.spacing.unit * 3,
  },
});

const AddChatBtn = ({ classes }) =>
  <Button variant="fab" color="primary" aria-label="add" className={classes.root}>
    <AddIcon />
  </Button>

export default withStyles(styles)(AddChatBtn);
