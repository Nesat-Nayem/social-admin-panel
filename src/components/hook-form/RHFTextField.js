import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFTextField({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          type={other.type || 'text'} // Ensure the type is set to 'text' by default
          // sx={{
          //   '& .MuiInputBase-root': {
          //     '& input': { textTransform: 'capitalize' },
          //   },
          // }}
          InputLabelProps={{
            style: {
              fontWeight: '600',
              color: '#000',
            },
          }}
          InputProps={{
            ...field,
            ...other.InputProps,
            readOnly: other.readOnly,
            sx: {
              '& fieldset': {
                borderColor: '#000 !important',
              },
              '&:hover fieldset': {
                borderColor: '#000 !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: '2px solid #000 !important',
              },
              '&.Mui-error fieldset': {
                borderColor: 'red !important',
              },
              // '& .MuiInputBase-input': {
              //   textTransform: 'capitalize',
              // },
              ...other.InputProps?.sx, // Retain any other InputProps styles
            },
          }}
        />
      )}
    />
  );
}
