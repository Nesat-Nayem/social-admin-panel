import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

RHFSelect.propTypes = {
  name: PropTypes.string,
  native: PropTypes.bool,
  children: PropTypes.node,
  helperText: PropTypes.node,
  maxHeight: PropTypes.number,
};

CombinedMultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  helperText: PropTypes.string,
  sx: PropTypes.object,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CombinedMultiSelect({ name, label, options, helperText, sx, ...other }) {
  const { control } = useFormContext();
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(value);
  };
  const [personName, setPersonName] = useState([]);
  const handleByChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          {label && (
            <InputLabel
              sx={{
                fontWeight: '600',
                color: '#000',
              }}
              id={`${name}-label`}
            >
              {label}
            </InputLabel>
          )}
          <Select
            {...field}
            multiple
            value={setPersonName}
            onChange={handleByChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            {...other}
            sx={{
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid black',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid black',
              },
            }}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {/* <Checkbox type="hidden" checked={personName.indexOf(option.value) > -1} /> */}
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

function RHFSelect({ name, native, children, helperText, maxHeight = 220, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          InputLabelProps={{
            style: {
              fontWeight: '600',
              color: '#000',
            },
          }}
          select
          fullWidth
          SelectProps={{
            native,
            MenuProps: {
              PaperProps: {
                sx: {
                  ...(!native && {
                    px: 1,
                    maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                    '& .MuiMenuItem-root': {
                      px: 1,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    },
                  }),
                },
              },
            },
            sx: {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid black',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid black',
              },
            },
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

RHFMultiSelect.propTypes = {
  name: PropTypes.string,
  chip: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array,
  checkbox: PropTypes.bool,
  placeholder: PropTypes.string,
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  sx,
  ...other
}) {
  const { control } = useFormContext();

  const renderValues = (selectedIds) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: 'text.disabled' }}>
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && <InputLabel id={name}> {label} </InputLabel>}
          <Select
            {...field}
            multiple
            displayEmpty={!!placeholder}
            value={field.value || []}
            labelId={name}
            input={<OutlinedInput fullWidth label={label} error={!!error} />}
            renderValue={renderValues}
            {...other}
          >
            {placeholder && (
              <MenuItem
                disabled
                value=""
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 0.75,
                  typography: 'body2',
                }}
              >
                <em> {placeholder} </em>
              </MenuItem>
            )}

            {options?.map((option) => {
              const selected = field?.value?.includes(option.value);

              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 0.75,
                    typography: 'body2',
                    ...(selected && {
                      fontWeight: 'fontWeightMedium',
                    }),
                    ...(checkbox && {
                      p: 0.25,
                    }),
                  }}
                >
                  {checkbox && <Checkbox disableRipple size="small" checked={selected} />}

                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export { CombinedMultiSelect, RHFMultiSelect, RHFSelect };
