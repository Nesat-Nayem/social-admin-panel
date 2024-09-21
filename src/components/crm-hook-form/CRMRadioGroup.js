import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

// ----------------------------------------------------------------------

CRMRadioGroup.propTypes = {
  row: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  spacing: PropTypes.number,
  helperText: PropTypes.node,
};

export default function CRMRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  ...other
}) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" id={labelledby} sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio sx={{ fontSize: 'small', padding: '2px' }} />}
                label={option.label}
                sx={{
                  fontSize: '4px',
                  '&:not(:last-of-type)': {
                    // mb: spacing || 0,
                    mb: spacing ? spacing / 0 : 0, //
                  },
                  ...(row && {
                    mr: 0,
                    '&:not(:last-of-type)': {
                      mr: spacing || 2,
                    },
                  }),
                }}
              />
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
