import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { fCurrency } from 'utils/formatNumber';

// ----------------------------------------------------------------------

ProfileData.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  price: PropTypes.number,
  total: PropTypes.number,
  percent: PropTypes.number,
  title_one: PropTypes.string,
  title_two: PropTypes.string,
  title_one_value: PropTypes.string,
  title_two_value: PropTypes.string,
  title_three: PropTypes.string,
  title_three_value: PropTypes.string,
};

function ProfileData({
  title,
  total,
  icon,
  color,
  percent,
  price,
  title_one,
  title_two,
  title_one_value,
  title_two_value,
  title_three,
  title_three_value,
}) {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="flex-start"
      sx={{ width: 1, minWidth: 200 }}
    >
      <Stack spacing={0.5} sx={{ ml: 2 }}>
        {title && <Typography variant="h6">{title}</Typography>}
        <Typography variant="body1">
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            {title_one}
          </Box>
          &nbsp; &nbsp;
          <Box component="span">{title_one_value}</Box>
        </Typography>
        <Typography variant="body1">
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            {title_two}
          </Box>
          &nbsp; &nbsp;
          <Box component="span">{title_two_value}</Box>
        </Typography>
        <Typography variant="body1">
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            {title_three}
          </Box>
          &nbsp; &nbsp;
          <Box component="span">{title_three_value}</Box>
        </Typography>

        <Typography variant="body1" sx={{ color }}>
          {fCurrency(price)}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProfileData;
