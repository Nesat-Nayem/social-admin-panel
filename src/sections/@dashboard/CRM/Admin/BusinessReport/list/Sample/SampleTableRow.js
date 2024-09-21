import PropTypes from 'prop-types';
// @mui
import { TableCell, TableRow } from '@mui/material';
// utils
// components

// ----------------------------------------------------------------------

SampleTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function SampleTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { name, id, point, created_at, updated_at } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{id}</TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {point}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {created_at}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {updated_at}
      </TableCell>
    </TableRow>
  );
}
