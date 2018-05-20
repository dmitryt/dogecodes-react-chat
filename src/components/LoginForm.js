import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Form, Field } from 'react-final-form'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit
  },
});

class LoginForm extends React.Component {
  onSubmit = values => {
    console.log(JSON.stringify(values, 0, 2));
  }
  render() {
    const { classes } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form className={classes.container} noValidate autoComplete="off">
            <Field
              label="Username"
              placeholder="Type your username"
              name="username"
              type="text"
              className={classes.textField}
              margin="normal"
              component={TextField}
              fullWidth
              required
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
              required
            />
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              type="submit"
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
