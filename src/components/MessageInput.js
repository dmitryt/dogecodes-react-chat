import React from 'react';

import TextField from 'material-ui/TextField';

class MessageInput extends React.Component {
  onKeyUp = ({ target, key }) => {
    const { value } = target;
    if (value && key === 'Enter') {
      this.props.onSubmit(value);
    }
  }

  render() {
    return (
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Type your message..."
        onKeyUp={this.onKeyUp}
        fullWidth
        margin="none"
      />
    );
  }
}

export default MessageInput;
