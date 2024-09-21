import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, Typography, Box, CircularProgress } from '@mui/material';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

InvoiceAnalytic.propTypes = {
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

export default function InvoiceAnalytic({
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
      alignItems="center"
      justifyContent="flex-start"
      sx={{ width: 1, minWidth: 200 }}
    >
      {/* <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Iconify icon={icon} width={24} sx={{ color, position: 'absolute' }} />

        <CircularProgress
          variant="determinate"
          value={percent}
          size={56}
          thickness={4}
          sx={{ color, opacity: 0.48 }}
        />

        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={4}
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.grey[500], 0.16),
          }}
        />
      </Stack> */}

      <Stack spacing={0.5} sx={{ ml: 2 }}>
        {title && <Typography variant="h6">{title}</Typography>}
        <Typography variant="subtitle2">
          <Box
            component="span"
            sx={{ typography: 'body1', color: 'text.primary', fontWeight: 'bold' }}
          >
            {title_one}
          </Box>
          &nbsp; &nbsp;
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            {title_one_value}
          </Box>
        </Typography>
        <Typography variant="subtitle2">
          <Box
            component="span"
            sx={{ typography: 'body1', color: 'text.primary', fontWeight: 'bold' }}
          >
            {title_two}
          </Box>
          &nbsp; &nbsp;
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            {title_two_value}
          </Box>
        </Typography>
        <Typography variant="subtitle2">
          <Box
            component="span"
            sx={{ typography: 'body1', color: 'text.primary', fontWeight: 'bold' }}
          >
            {title_three}
          </Box>
          &nbsp; &nbsp;
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            {title_three_value}
          </Box>
        </Typography>

        <Typography variant="subtitle2" sx={{ color }}>
          {fCurrency(price)}
        </Typography>
      </Stack>
    </Stack>
  );
}
