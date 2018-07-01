import React from 'react';
import PropTypes from 'prop-types';
import MUITextField from 'material-ui/TextField';

const TextField = ({
  input: {
    name, onChange, value, ...restInput
  }, meta, ...rest
}) => (
  <MUITextField
    {...rest}
    name={name}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
);

TextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default TextField;
