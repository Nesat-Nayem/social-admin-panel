import PropTypes from 'prop-types';
// @mui
import { TableCell, TableRow } from '@mui/material';
// utils
// components

// ----------------------------------------------------------------------

MeetingSubmitTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function MeetingSubmitTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { id, vso_id, title, allowance, created_at, updated_at } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{id}</TableCell>
      <TableCell>{vso_id}</TableCell>
      <TableCell>{title}</TableCell>

      <TableCell align="left">{allowance}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {created_at}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {updated_at}
      </TableCell>
    </TableRow>
  );
}
