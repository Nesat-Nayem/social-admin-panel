import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-root': {
    minWidth: 800,
    borderRadius: 0,
    border: '2px solid rgba(218,227,243,255)',
    borderCollapse: 'collapse',
  },
  '& .MuiDataGrid-colCell, & .MuiDataGrid-row': {
    border: '1px solid rgba(218,227,243,255)',
    borderCollapse: 'collapse',
    backgroundColor: 'primary.main',
  },
  '& .MuiDataGrid-cell': {
    textAlign: 'center',
    border: '1px solid rgba(218,227,243,255)',
    backgroundColor: 'primary.main',
  },
  '& .MuiDataGrid-colCell': {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    border: '1px solid rgba(218,227,243,255)',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    border: '1px solid rgba(218,227,243,255)',
    color: theme.palette.primary.contrastText,
  },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70, editable: true },
  { field: 'copon_name', headerName: 'MEDICINE NAME', width: 200, editable: true },
  { field: 'point', headerName: 'POINTS PER COUPON', width: 200, editable: true },
  { field: 'quantity', headerName: 'NO OF COUPON COLLECTED', width: 200, editable: true },
];

// const rows = [
//   { id: 1, medicineName: 'Snow', point: 2, couponCollected: 1 },
//   { id: 2, medicineName: 'Lannister', point: 2, couponCollected: 2 },
//   { id: 3, medicineName: 'Lannister', point: 2, couponCollected: 3 },
//   { id: 4, medicineName: 'Snow', point: 2, couponCollected: 4 },
//   { id: 5, medicineName: 'Lannister', point: 2, couponCollected: 4 },
//   { id: 6, medicineName: 'Lannister', point: 2, couponCollected: 5 },
//   { id: 7, medicineName: 'Snow', point: 2, couponCollected: 6 },
//   { id: 8, medicineName: 'Lannister', point: 2, couponCollected: 4 },
//   { id: 9, medicineName: 'Lannister', point: 2, couponCollected: 2 },
// ];

DoctorDataGridBasic.propTypes = {
  data: PropTypes.array,
};
export default function DoctorDataGridBasic({ data }) {
  const rows = data || [];
  return (
    <div style={{ height: 640, width: '100%' }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        editMode="row"
        // pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
