import PropTypes from 'prop-types';
// @mui
import { Avatar, TableCell, TableRow } from '@mui/material';
// utils
// components

// ----------------------------------------------------------------------

ManagerTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function ManagerTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
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

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <Avatar alt={name} src={profile_image} />
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

      <TableCell align="left">{advance}</TableCell>

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
    </TableRow>
  );
}
