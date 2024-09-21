import { TextField } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

RHFTimePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

function RHFTimePicker({ name, label, ...other }) {
  const { control, watch } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileTimePicker
            label={label}
            ampm
            control={control}
            value={watch(name) ? new Date(watch(name)) : null}
            onChange={onChange}
            {...other}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error?.message}
                InputLabelProps={{
                  style: {
                    fontWeight: '600',
                    color: '#000',
                  },
                }}
                InputProps={{
                  sx: {
                    '& fieldset': {
                      borderColor: '#000 !important',
                    },
                    '&:hover fieldset': {
                      borderColor: '#000 !important',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000 !important',
                    },
                    '&.Mui-error fieldset': {
                      borderColor: 'red !important',
                    },
                    '& .MuiInputBase-input': {
                      textTransform: 'capitalize',
                    },
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}

export default RHFTimePicker;
