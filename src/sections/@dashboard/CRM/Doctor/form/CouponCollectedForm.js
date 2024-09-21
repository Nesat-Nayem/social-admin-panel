import { Box, Button } from '@mui/material';
import DoctorDataGridBasic from '../list/DoctorDataGridBasic';

function CouponCollectedForm() {
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
        data={[
          { medicineName: 'Paracetamol', couponCollected: 10 },
          { medicineName: 'Paracetamol', couponCollected: 10 },
          { medicineName: 'Paracetamol', couponCollected: 10 },
          { medicineName: 'Paracetamol', couponCollected: 10 },
        ]}
      />
      <Button
        variant="contained"
        sx={{
          px: '45px',
          py: '6px',
          color: '#000',
          backgroundColor: '#8faadc !important',
          mt: 6.5,
        }}
      >
        {' '}
        SUBMIT
      </Button>
    </Box>
  );
}

export default CouponCollectedForm;
