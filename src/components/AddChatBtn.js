import React from 'react';
import PropTypes from 'prop-types';
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

const AddChatBtn = ({ classes, onClick }) =>
  <Button variant="fab" color="primary" aria-label="add" className={classes.root} onClick={onClick}>
    <AddIcon />
  </Button>

AddChatBtn.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddChatBtn);
