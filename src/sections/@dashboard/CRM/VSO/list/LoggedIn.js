import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { useGetVSOById, useGetVSOCountById } from 'services/VSO.Services';

LoggedIn.propTypes = {
  user: PropTypes.object,
};
function LoggedIn({ user }) {
  const { name, id } = user;
  const { data } = useGetVSOById('vso', id);
  const { conutn } = useGetVSOCountById('vso-visit', id);
  console.log('conutn', conutn);
  const todayDate = new Date();
  const formattedDate = moment(todayDate).format('DD-MM-YYYY');
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 1,
        minWidth: 200,
        height: 1,
        p: 2,
        py: 2,
        minHeight: {
          md: 662,
          lg: 662,
          xl: 662,
        },
      }}
    >
      <Stack
        spacing={0.5}
        sx={{ ml: 2 }}
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Typography variant="body2">
          <Box
            component="span"
            sx={{
              typography: 'body1',
              color: 'text.primary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            VSO Logged In
          </Box>{' '}
        </Typography>
        <Typography variant="subtitle1">
          <Box
            component="span"
            sx={{
              // typography: 'body1',
              color: 'text.primary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            {name && name.toUpperCase()}
          </Box>
        </Typography>
        <Typography variant="subtitle1">
          <Box
            component="span"
            sx={{
              // typography: 'body1',
              color: 'text.primary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Id Number &nbsp; : &nbsp; {id && id.toUpperCase()}
          </Box>
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1">
            <Box
              component="span"
              sx={{
                // typography: 'body1',
                color: 'text.primary',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              TOTAL VISIT IN
            </Box>
          </Typography>
          <Typography variant="subtitle1">
            <Box
              component="span"
              sx={{
                // typography: 'body1',
                color: 'text.primary',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              The current
            </Box>
          </Typography>
          <Typography variant="subtitle1">
            <Box
              component="span"
              sx={{
                // typography: 'body1',
                color: 'text.primary',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Month
            </Box>
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            <Box
              component="span"
              sx={{
                // typography: 'body1',
                color: 'text.primary',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center',
                backgroundColor: '#fff',
                borderRadius: '5px',
                px: 2,
                py: 1,
                cursor: 'pointer',
              }}
            >
              {/* {console.log('data', data)} */}
              {/* {current_month_visit && current_month_visit} */}
              {conutn}
            </Box>
          </Typography>
        </Box>

        <Typography variant="subtitle1">
          <Box
            component="span"
            sx={{
              // typography: 'body1',
              color: 'text.primary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Date &nbsp; : &nbsp; {formattedDate}
          </Box>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            px: 2,
            py: 1,
            cursor: 'pointer',
            width: 4,
            textAlign: 'center',
            minWidth: 100,
          }}
          onClick={() => navigate('/dashboard/vso-profile')}
        >
          <Box
            component="span"
            sx={{
              // typography: 'body1',
              color: 'text.primary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Profile
          </Box>
        </Typography>
        <Typography
          variant="subtitle1"
          onClick={() => navigate(PATH_DASHBOARD.vso.main)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            px: 2,
            py: 1,
            cursor: 'pointer',
            width: 4,
            textAlign: 'center',
            minWidth: 100,
          }}
        >
          <Box
            component="span"
            sx={{
              // typography: 'body1',
              color: 'text.primary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Visit
          </Box>
        </Typography>
      </Stack>
    </Stack>
  );
}

export default LoggedIn;
