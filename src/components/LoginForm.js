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

class LoginForm extends React.Component {
  render() {
    const { classes, onSubmit } = this.props;
    return (
      <Form
        onSubmit={onSubmit}
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
              Login
            </Button>
          </form>
        )}>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
