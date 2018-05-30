import React from 'react';
import MUITextField from 'material-ui/TextField';

const TextField = ({
  input: { name, onChange, value, ...restInput }, meta, ...rest
}) => (
    <MUITextField
      {...rest}
      name={name}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      inputProps={restInput}
      onChange={onChange}
      value={value}
    />
  );

export default TextField;

