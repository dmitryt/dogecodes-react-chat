import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit
  },
});

const SignupForm = ({ classes, width, selectedChat }) => (
  <form className={classes.container} noValidate autoComplete="off">
    <TextField
      label="Username"
      placeholder="Type your username"
      className={classes.textField}
      margin="normal"
      fullWidth
      required
    />
    <TextField
      label="Password"
      placeholder="Type your password"
      className={classes.textField}
      margin="normal"
      type="password"
      fullWidth
      required
    />
    <TextField
      label="Password Confirmation"
      placeholder="Repeat your password"
      className={classes.textField}
      margin="normal"
      type="password"
      fullWidth
      required
    />
    <Button variant="raised" color="primary" fullWidth className={classes.button}>
      Sign Up
    </Button>
  </form>
);

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupForm);
