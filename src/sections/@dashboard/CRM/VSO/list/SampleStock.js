import { Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

SampleStock.propTypes = {
  title: PropTypes.string,
  total_stock: PropTypes.number,
  stockLength: PropTypes.number,
  stock: PropTypes.array,
};

function SampleStock({ title, total_stock, stockLength, stock }) {
  console.log('JJJJJJ', title, total_stock, stockLength, stock);
  return (
    <>
      {stockLength < 1 && <Typography variant="subtitle2">Your Stock is empty</Typography>}

      {stockLength > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          // sx={{ width: 1, minWidth: 160 }}
        >
          <Stack spacing={0.5} sx={{ ml: 2 }}>
            <Typography variant="subtitle2">
              <Box
                component="span"
                sx={{ typography: 'body1', color: 'text.primary', fontWeight: 'bold' }}
              >
                {title}
              </Box>
              &nbsp; &nbsp;
              <Box
                component="span"
                sx={{
                  //   color: 'text.secondary',
                  color: 'white',
                  typography: 'body2',
                  backgroundColor: 'warning.main',
                  borderRadius: '5px',
                  px: 1.5,
                  py: 0.5,
                  fontWeight: 'bold',
                }}
              >
                {total_stock}
              </Box>
            </Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default SampleStock;
