import PropTypes from 'prop-types';
// @mui
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
// components
import { MobileDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import Iconify from '../../../../../../components/iconify';

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  setFromDate: PropTypes.func,
  setToDate: PropTypes.func,
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) {
  console.log({ fromDate, toDate });
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      {/* <TextField
        fullWidth
        select
        label="Name"
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField> */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <MobileDatePicker
          // orientation="portrait"
          label="Form Date"
          value={fromDate}
          size="small"
          onChange={(newValue) => {
            const dateFormated = moment(newValue).format('YYYY-MM-DD');
            setFromDate(dateFormated);
          }}
          renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
        />
        <MobileDatePicker
          // orientation="portrait"
          label="To Date"
          value={toDate}
          size="small"
          onChange={(newValue) => {
            const dateFormated = moment(newValue).format('YYYY-MM-DD');
            setToDate(dateFormated);
          }}
          renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
        />
      </Stack>

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        // variant="outlined"
        color="primary"
        // onClick={handleExportData}
        startIcon={<Iconify icon="eva:download-outline" />}
      >
        Export
      </Button>

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
