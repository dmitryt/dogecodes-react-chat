import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Form, Field } from 'react-final-form';

import Button from 'material-ui/Button';

import TextField from './TextField';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit
  },
});

const validate = ({ username, password, passwordConfirmation }) => {
  const errors = {};
  if (!username) {
    errors.username = 'Required';
  }
  if (!password) {
    errors.password = 'Required';
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords don\'t match';
  }
  return errors;
};

const submitHandler = onSubmit => ({ username, password }) =>
  onSubmit({ username, password })

const SignupForm = ({ classes, onSubmit }) => {
  return (
    <Form
      onSubmit={submitHandler(onSubmit)}
      validate={validate}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form className={classes.container} onSubmit={handleSubmit} noValidate autoComplete="off">
          <Field
            label="Username"
            placeholder="Type your username"
            name="username"
            type="text"
            className={classes.textField}
            margin="normal"
            component={TextField}
            autoComplete="new-username"
            fullWidth
          />
          <Field
            label="Password"
            placeholder="Type your password"
            name="password"
            type="password"
            className={classes.textField}
            margin="normal"
            component={TextField}
            autoComplete="new-password"
            fullWidth
          />
          <Field
            label="Password Confirmation"
            placeholder="Repeat your password"
            name="passwordConfirmation"
            type="password"
            className={classes.textField}
            margin="normal"
            component={TextField}
            autoComplete="new-password-confirm"
            fullWidth
          />
          <Button
            className={classes.button}
            variant="raised"
            color="primary"
            type="submit"
            disabled={submitting}
            fullWidth
          >
            Sign Up
            </Button>
        </form>
      )}>
    </Form>
  );
};

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignupForm);
