import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Grid, InputBase, styled, Typography } from '@mui/material';

// ----------------------------------------------------------------------

CRMTextFieldCard.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  bgColor: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
};

const StyledTextField = styled(InputBase)(({ theme, error, multiline, standard, readOnly }) => ({
  width: '4rem',
  backgroundColor: 'yellow',
  borderRadius: '7px',
  // padding: '6px 20px',
  minHeight: '2.5rem',
  // minWidth: '2rem',
  border: '#EEEEEE',
  boxSizing: 'border-box',
  fontSize: '14px',
  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
  '& .MuiInputBase-input': {
    backgroundColor: 'yellow',
    width: 'fit-content',
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

export default function CRMTextFieldCard({ name, helperText, bgColor, color, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 0 }}
          justifyContent="center"
          alignItems="center"
          direction="column"
          sx={{
            backgroundColor: bgColor,
            borderRadius: '7px',
            width: 'fit-content',
            padding: '6px 20px',
          }}
        >
          <Grid item xs={12} md={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: color || '#fff',
              }}
            >
              {label}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledTextField
              {...field}
              fullWidth
              value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...other}
            />
          </Grid>
        </Grid>
      )}
    />
  );
}
