import PropTypes from 'prop-types';
// @mui
import { Stack, TableCell, TableRow } from '@mui/material';
// utils
// components

// ----------------------------------------------------------------------

MeetingCreateTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function MeetingCreateTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { id, vso_id, desc, time, date, title, created_at, updated_at } = row;

  return (
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
    </TableRow>
  );
}
