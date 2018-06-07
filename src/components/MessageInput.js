import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

class MessageInput extends React.Component {
  state = {
    value: '',
  };
  onKeyUp = ({ target, key }) => {
    const { value } = target;
    if (value && key === 'Enter') {
      this.props.onSubmit(value);
      this.setState({ value: '' });
    }
  }

  onChange = ({ target }) => {
    const { value } = target;
    this.setState({ value });
  }

  render() {
    const { disabled } = this.props;
    const { value } = this.state;
    return (
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Type your message..."
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
        disabled={disabled}
        value={value}
        fullWidth
        margin="none"
      />
    );
  }
}

MessageInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MessageInput;
