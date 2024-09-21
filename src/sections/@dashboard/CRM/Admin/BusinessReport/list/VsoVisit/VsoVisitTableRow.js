import PropTypes from 'prop-types';
// @mui
import { TableCell, TableRow } from '@mui/material';
// utils
// components

// ----------------------------------------------------------------------

VsoVisitTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function VsoVisitTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const {
    id,
    noOfVisitor,
    visitor_id,
    start_Km,
    start_Km_img,
    end_km,
    end_Km_img,
    car_select,
    miscellaneous_amt,
    manager_id,
    created_at,
    updated_at,
  } = row;

  return (
    <TableRow hover selected={selected}>
      {/* <img
        src="https://medical.royalspeeddubai.com/images/admin/vso/20240307_074724_profileimage.jpg"
        alt="start_Km_img"
      /> */}
      <TableCell align="left">{id}</TableCell>
      <TableCell>{noOfVisitor}</TableCell>
      <TableCell>{visitor_id}</TableCell>
      <TableCell align="left">{start_Km}</TableCell>
      <TableCell align="left">
        {start_Km_img && <img src={start_Km_img} alt="start_Km_img" />}
      </TableCell>
      <TableCell align="left">{end_km}</TableCell>
      <TableCell align="left">
        <img src={end_Km_img} alt="end_Km_img" />
      </TableCell>
      <TableCell align="left">
        {/* {car_select.map((car) => {
          return <div>{car}</div>;
        })} */}
        {car_select}
      </TableCell>
      <TableCell align="left">{miscellaneous_amt}</TableCell>
      <TableCell align="left">{manager_id}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {created_at}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {updated_at}
      </TableCell>
    </TableRow>
  );
}
