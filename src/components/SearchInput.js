import React from 'react';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 2}px`,
    minHeight: theme.spacing.unit * 8,
  },
});

class SearchInput extends React.Component {
  onChange = e => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          placeholder="Search chats..."
          onChange={this.onChange}
          fullWidth
          margin="normal"
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchInput);
