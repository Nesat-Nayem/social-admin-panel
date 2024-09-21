import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

CouponCard.propTypes = {
  title: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  count: PropTypes.number,
};

function CouponCard({
  title = 'Coupon Collected',
  bgColor = '#2f5597',
  color = '#fff',
  onClick,
  count,
}) {
  const parts = title.split(' ');
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: '8px',
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
        p: { xs: 0.5, md: 0.5 },
        backgroundColor: bgColor,
        color,
        cursor: 'pointer',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        m={1}
      >
        <Typography variant="h6" textAlign="center">
          {parts[0]}
          <br />
          {parts.slice(1).join(' ')}
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: 'yellow',
            textTransform: 'uppercase',
            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
            px: 1.5,
            py: 0.5,
            borderRadius: '8px',
            fontSize: '15px',
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          {count || 0}
        </Box>
      </Box>
    </Box>
  );
}

export default CouponCard;
