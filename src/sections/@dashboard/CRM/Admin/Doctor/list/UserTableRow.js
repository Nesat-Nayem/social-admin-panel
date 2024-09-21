import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Avatar, Button, IconButton, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
// components
import ConfirmDialog from '../../../../../../components/confirm-dialog';
import Iconify from '../../../../../../components/iconify';
import MenuPopover from '../../../../../../components/menu-popover';

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
    image,
    id,
    name,
    email,
    dob,
    route,
    created_at,
    updated_at,
    phone,
    area,
    ids_attend,
    coupon_collected,
    sample_given,
    coupon_settled,
    special_gift,
    last_two_month_visit,
    doctor_type,
    total_point,
    qualification,
    adhar_card_no,
    pan_card_no,
    designation,
    account_number,
    account_holder_name,
    bank_name,
    ifsc_code,
  } = row;

  console.log('updated_at', updated_at);

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
        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={image} />

            {/* <Typography variant="subtitle2" noWrap>
              {name}
            </Typography> */}
          </Stack>
        </TableCell>

        <TableCell align="left">{id}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {name}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {email}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {phone}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {designation}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {doctor_type}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {ids_attend}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {coupon_collected}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {sample_given}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {coupon_settled}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {special_gift}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {last_two_month_visit}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {total_point}
        </TableCell>

        <TableCell align="left">
          {created_at}
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

        <TableCell align="left">
          {updated_at}
          {/* <Label
            variant="soft"
            color={(status === 'banned' && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label> */}
        </TableCell>
        {/* <TableCell align="left">{state}</TableCell>
        <TableCell align="left">{city}</TableCell>
        <TableCell align="left">{address}</TableCell>
        <TableCell align="left">{zipCode}</TableCell> */}
      </TableRow>

      <MenuPopover
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
      </MenuPopover>

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
