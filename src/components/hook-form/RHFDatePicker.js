import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

function RHFDatePicker({ name, label, ...other }) {
  const { control, watch } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label={label}
            control={control}
            inputFormat="dd/MM/yyyy"
            // value={value}
            value={watch(name) ? new Date(watch(name)) : null}
            onChange={(event) => {
              onChange(event);
            }}
            {...other}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error?.message}
                {...other}
                InputLabelProps={{
                  style: {
                    fontWeight: '600',
                    color: '#000',
                  },
                }}
                InputProps={{
                  sx: {
                    '& fieldset': {
                      // borderColor: '#2f5597 !important',
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

export default RHFDatePicker;
