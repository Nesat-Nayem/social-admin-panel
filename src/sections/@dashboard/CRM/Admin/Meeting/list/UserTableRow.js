import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Button, IconButton, MenuItem, Stack, TableCell, TableRow } from '@mui/material';
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
  const { id, vso_id, desc, time, date, title, created_at, updated_at } = row;

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
        <TableCell align="left">{id}</TableCell>
        <TableCell>{title}</TableCell>

        <TableCell align="left">{date}</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {time}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {desc}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {vso_id.map((vso, index) => {
            return (
              <Stack key={index} direction="row" spacing={1}>
                {vso}
              </Stack>
            );
          })}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {created_at}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {updated_at}
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
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
