import PropTypes from 'prop-types';
// @mui
import { Avatar, TableCell, TableRow } from '@mui/material';
// utils
// components

// ----------------------------------------------------------------------

DoctorTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function DoctorTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
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

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <Avatar alt={name} src={image} />
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
        {qualification}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {dob}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {route}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {area}
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
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {adhar_card_no}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {pan_card_no}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {account_holder_name}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {bank_name}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {account_number}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {ifsc_code}
      </TableCell>

      <TableCell align="left">{created_at}</TableCell>

      <TableCell align="left">{updated_at}</TableCell>
    </TableRow>
  );
}
