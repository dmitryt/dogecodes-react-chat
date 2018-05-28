import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import { Form, Field } from 'react-final-form';
import TextField from './TextField';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  title: {
    padding: 0,
  },
  container: {
    padding: theme.spacing.unit * 3,
    width: '30%',
    minWidth: '300px',
  },
  content: {
    padding: 0,
    overflow: 'hidden',
  },
  openBtn: {
    position: 'absolute',
    bottom: theme.spacing.unit * 9,
    right: theme.spacing.unit * 3,
  },
});

class EditProfileForm extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, onSubmit, open, onClose } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form className={classes.container} onSubmit={handleSubmit} noValidate autoComplete="off">
                <DialogTitle className={classes.title}>Create new chat</DialogTitle>
                <DialogContent className={classes.content}>
                  <Field
                    label="Username"
                    name="username"
                    type="text"
                    margin="normal"
                    component={TextField}
                    disabled
                    fullWidth
                    required
                  />
                  <Field
                    label="First Name"
                    placeholder="Enter First Name"
                    name="firstName"
                    type="text"
                    margin="normal"
                    component={TextField}
                    fullWidth
                  />
                  <Field
                    label="Last Name"
                    placeholder="Enter Last Name"
                    name="lastName"
                    type="text"
                    margin="normal"
                    component={TextField}
                    fullWidth
                  />
                  <Field
                    label="City"
                    placeholder="Enter City"
                    name="city"
                    type="text"
                    margin="normal"
                    component={TextField}
                    fullWidth
                  />
                  <Button color="primary" type="submit" disabled={submitting}>
                    Create
                  </Button>
                </DialogContent>
              </form>
            )}>
          </Form>
        </Dialog>
      </div>
    );
  }
}

EditProfileForm.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(EditProfileForm);
