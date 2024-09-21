import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { TableHeadCustom } from 'components/table';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { useGetMaster } from 'services/Master.Services';

// ----------------------------------------------------------------------
function createData(
  doc_id,
  dob,
  ids_attend,
  coupon_received,
  sample_given,
  coupon_settled,
  special_gift,
  last_two_month_visit,
  total_point_pending
) {
  return {
    doc_id,
    dob,
    ids_attend,
    coupon_received,
    sample_given,
    coupon_settled,
    special_gift,
    last_two_month_visit,
    total_point_pending,
  };
}

const TABLE_DATA = [
  createData('ABC12', '12 - 12 - 23', 'MGR2ID', 3, 6, 7, 'Carriage Bag', 1, 30),
  createData('ABC12', '12 - 12 - 23', 'MGR2ID', 3, 6, 7, 'Carriage Bag', 1, 30),
  createData('ABC12', '12 - 12 - 23', 'MGR2ID', 3, 6, 7, 'Carriage Bag', 1, 30),
  createData('ABC12', '12 - 12 - 23', 'MGR2ID', 3, 6, 7, 'Carriage Bag', 1, 30),
  createData('ABC12', '12 - 12 - 23', 'MGR2ID', 3, 6, 7, 'Carriage Bag', 1, 30),
];

const TABLE_HEAD = [
  { id: 'id', label: 'Doc Id & Name', align: 'center', minWidth: 200 },
  { id: 'name', label: 'Name', align: 'center', minWidth: 200 },
  { id: 'dob', label: 'DOB', align: 'center', minWidth: 200 },
  { id: 'ids_attend', label: 'IDs Attend', align: 'center', minWidth: 200 },
  { id: 'coupon_collected', label: 'Coupon Collected', align: 'center', minWidth: 200 },
  { id: 'sample_given', label: 'Sample Given', align: 'center', minWidth: 200 },
  { id: 'coupon_settled', label: 'Coupon Settled', align: 'center', minWidth: 200 },
  { id: 'special_gift', label: 'Special Gift', align: 'center', minWidth: 200 },
  { id: 'last_two_month_visit', label: 'Last Two Month Visit', align: 'center', minWidth: 200 },
  { id: 'total_point', label: 'Total Point pending', align: 'center', minWidth: 200 },
];
VsoTable.propTypes = {
  filteredData: PropTypes.array,
};

function VsoTable({ filteredData }) {
  const navigate = useNavigate();
  const { data: doctorDATA, isLoading } = useGetMaster('doctor');
  // const data = filteredData?.length > 0 ? filteredData : doctorDATA;

  const data = (filteredData?.length > 0 ? filteredData : doctorDATA)?.filter(
    (item) => item.doctor_type === 'doctor'
  );

  console.log('doctor data', data);

  return (
    <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
      <Scrollbar>
        <Table
          sx={{
            minWidth: 800,
            border: '2px solid rgba(218,227,243,255)',
            borderCollapse: 'collapse',

            '& thead': {
              '& tr': {
                '& th': {
                  border: '1px solid rgba(218,227,243,255)',
                  borderCollapse: 'collapse',
                },
              },
            },
            '& tbody': {
              '& tr': {
                '& td': {
                  border: '1px solid rgba(218,227,243,255)',
                  borderCollapse: 'collapse',
                },
              },
            },
          }}
        >
          <TableHeadCustom
            headLabel={TABLE_HEAD}
            sx={{
              '& .MuiTableCell-root': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 'bold',
              },
            }}
          />

          <TableBody>
            {data?.map((row) => (
              <TableRow key={row?.id}>
                <TableCell
                  align="center"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    // console.log('oi', row?.id);
                    // navigate(`/dashboard/vso-transaction`);
                    // navigate(PATH_DASHBOARD.vso.transaction
                    //   .replace(':id', row?.id);
                    navigate(PATH_DASHBOARD.vso.transaction(row?.id));
                  }}
                >
                  {row?.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>

                <TableCell align="center">{moment(row.dob).format('DD-MM-YYYY')}</TableCell>
                <TableCell align="center">{row.ids_attend}</TableCell>
                <TableCell align="center">{row.coupon_collected}</TableCell>
                <TableCell align="center">{row.sample_given}</TableCell>
                <TableCell align="center">{row.coupon_settled}</TableCell>
                <TableCell align="center">{row.special_gift}</TableCell>
                <TableCell align="center">{row.last_two_month_visit}</TableCell>
                <TableCell align="center">{row.total_point}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}

export default VsoTable;
