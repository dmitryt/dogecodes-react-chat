import React from 'react';

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
    const { value } = this.state;
    return (
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Type your message..."
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
        value={value}
        fullWidth
        margin="none"
      />
    );
  }
}

export default MessageInput;
