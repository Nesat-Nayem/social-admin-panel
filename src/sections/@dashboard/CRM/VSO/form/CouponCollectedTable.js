import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import DoctorDataGridBasic from '../../Doctor/list/DoctorDataGridBasic';

CouponCollectedTable.propTypes = {
  COUPONS_DATA: PropTypes.array,
  isLoading: PropTypes.bool,
};

function CouponCollectedTable({ COUPONS_DATA, isLoading }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('COUPONS_DATA', COUPONS_DATA);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      justifyContent="center"
      alignItems="center"
      mt={5}
    >
      <DoctorDataGridBasic
        // data={[
        //   { medicineName: 'Paracetamol', couponCollected: 10 },
        //   { medicineName: 'Paracetamol', couponCollected: 10 },
        //   { medicineName: 'Paracetamol', couponCollected: 10 },
        //   { medicineName: 'Paracetamol', couponCollected: 10 },
        // ]}
        data={COUPONS_DATA}
      />
    </Box>
  );
}

export default CouponCollectedTable;
