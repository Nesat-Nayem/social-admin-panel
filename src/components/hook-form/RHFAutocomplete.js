import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  defaultValue: PropTypes.any, // Add propType for defaultValue
};

export default function RHFAutocomplete({ name, label, helperText, defaultValue, ...other }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} // Ensure defaultValue is passed to Controller
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          // Ensure the value is set from field.value or defaultValue
          value={field.value ? field.value : defaultValue}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error ? error.message : helperText}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
