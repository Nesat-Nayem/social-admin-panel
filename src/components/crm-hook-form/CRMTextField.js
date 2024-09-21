import { Box, FormHelperText, InputBase, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

const StyledTextField = styled(InputBase)(({ theme, bgColor }) => ({
  width: '100%',
  // color: bgColor === '#fff' ? '#000' : '#fff',
  color: '#000',
  backgroundColor: bgColor,
  borderRadius: '7px',
  padding: '11px 20px',
  border: '1px solid #dae3f3',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
  fontSize: '14px',
  '& .MuiInputBase-input': {
    backgroundColor: bgColor,
    width: '100%',
    '&::placeholder': {
      color: bgColor === '#fff' || bgColor === '#dae3f3' ? '#000' : '#fff',
      // color: '#000',
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: '14px',
    },
  },
}));

CRMTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
  bgColor: PropTypes.string,
  label: PropTypes.string,
};

export default function CRMTextField({ name, helperText, bgColor, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box m={0} p={0}>
          <StyledTextField
            {...field}
            fullWidth
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            error={!!error}
            helperText={error ? error.message : helperText}
            {...other}
            type={other.type || 'text'}
            bgColor={bgColor}
          />
          <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
        </Box>
      )}
    />
  );
}
