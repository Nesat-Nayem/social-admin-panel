import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Avatar, Button, Stack, TableCell, TableRow } from '@mui/material';
// components
import ConfirmDialog from '../../../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const {
    profile_image,
    id,
    name,
    headoffice,
    advance,
    allowancepending,
    dob,
    reportingmanager,
    created_at,
    updated_at,
    current_month_visit,
    email,
    phone,
    qualification,
    adhar_card_no,
    pan_card_no,

    account_number,
    account_holder_name,
    bank_name,
    ifsc_code,
    total_visit,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={profile_image} />
          </Stack>
        </TableCell>
        <TableCell align="left">{id}</TableCell>

        <TableCell align="left">{name}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {dob}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {phone}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {email}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {qualification}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {headoffice}
        </TableCell>

        <TableCell align="left">
          {advance}
          {/* <Iconify
          icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isVerified && { color: 'warning.main' }),
          }}
        /> */}
        </TableCell>

        <TableCell align="left">{allowancepending}</TableCell>
        <TableCell align="left">{reportingmanager}</TableCell>
        <TableCell align="left">{bank_name}</TableCell>
        <TableCell align="left">{account_holder_name}</TableCell>
        <TableCell align="left">{account_number}</TableCell>
        <TableCell align="left">{ifsc_code}</TableCell>
        <TableCell align="left">{pan_card_no}</TableCell>
        <TableCell align="left">{adhar_card_no}</TableCell>
        <TableCell align="left">{current_month_visit}</TableCell>
        <TableCell align="left">{total_visit}</TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {created_at}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {updated_at}
        </TableCell>
        {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {zipCode}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {managerName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {branch}
      </TableCell> */}
        {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover> */}

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
