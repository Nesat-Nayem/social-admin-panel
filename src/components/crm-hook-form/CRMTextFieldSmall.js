import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { FormHelperText, Grid, InputBase, styled, Typography } from '@mui/material';

// ----------------------------------------------------------------------

CRMTextFieldSmall.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  bgColor: PropTypes.string,
  label: PropTypes.string,
};

const StyledTextField = styled(InputBase)(({ theme, error, multiline, standard, readOnly }) => ({
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: '7px',
  // padding: '6px 20px',
  minHeight: '2.5rem',
  minWidth: '2rem',
  border: '#EEEEEE',
  boxSizing: 'border-box',
  fontSize: '14px',
  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
  '& .MuiInputBase-input': {
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: '10px',
    '&::placeholder': {
      // Style placeholder text
      color: '#000', // Dark color
      fontWeight: 'bold', // Bold font weight
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: '14px',
    },
  },
}));

export default function CRMTextFieldSmall({ name, helperText, bgColor, label, ...other }) {
  const { control, trigger } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={8} md={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                // textAlign: {
                //   xs: 'left',
                //   sm: 'left',
                //   md: 'right',
                // },
              }}
            >
              {label}
            </Typography>
          </Grid>
          <Grid item xs={4} md={6}>
            <StyledTextField
              {...field}
              fullWidth
              value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
              error={!!error}
              // helperText={error ? error?.message : helperText}
              {...other}
            />
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          </Grid>
        </Grid>
      )}
    />
  );
}
