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
    created_at,
    updated_at,
    name,
    email,
    phoneNumber,
    dob,
    state,
    city,
    address,
    zipCode,
    noOfVso,
    branch,
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
        {/* <TableCell align="left">{city}</TableCell>
        <TableCell align="left">{address}</TableCell>
        <TableCell align="left">{zipCode}</TableCell>
        <TableCell align="left">{noOfVso}</TableCell>
        <TableCell align="left">{branch}</TableCell> */}


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
