import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import { Form, Field } from 'react-final-form';
import TextField from './TextField';

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

const validate = ({ title }) => {
  const errors = {};
  if (!title) {
    errors.title = 'Required';
  }
  return errors;
};

export const CreateChatForm = ({
  classes, onSubmit, open, onClose,
}) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting }) => (
        <form className={classes.container} onSubmit={handleSubmit} noValidate autoComplete="off">
          <DialogTitle className={classes.title}>Create new chat</DialogTitle>
          <DialogContent className={classes.content}>
            <Field
              label="New Chat"
              placeholder="Type the title"
              name="title"
              type="text"
              margin="normal"
              component={TextField}
              autoComplete="title"
              fullWidth
              required
            />
            <Button color="primary" type="submit" disabled={submitting}>
              Create
            </Button>
          </DialogContent>
        </form>
      )}
    />
  </Dialog>
);

CreateChatForm.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

CreateChatForm.defaultProps = {
  onSubmit: () => {},
  onClose: () => {},
};

export default withStyles(styles)(CreateChatForm);
