import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import DoctorEntryForm from 'sections/@dashboard/CRM/Doctor/form/DoctorEntryForm';

import { useAuthContext } from 'auth/useAuthContext';
import { useGetMasterById } from 'services/Master.Services';
import { useSettingsContext } from '../../../../components/settings';

function DoctorTransactionPage() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  const { name, id, route } = user;
  const { data } = useGetMasterById('doctor', id);
  console.log('doctorData', data);

  return (
    <>
      {' '}
      <Helmet>
        <title> DOCTOR: Transaction</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={10}>
            <Card
              sx={{
                borderRadius: '3rem',
                boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                p: { xs: 2, md: 1.5 },
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                    m: { xs: 1, md: 2 },
                  }}
                >
                  Doctor Entry
                </Typography>
                <DoctorEntryForm
                  doctor_id={id}
                  doctor_name={name}
                  route={route}
                  doctorData={data}
                />
              </Box>
            </Card>
          </Grid>
          {/* <Grid item xs={12} md={6.5}>
            <Card
              sx={{
                borderRadius: '3rem',
                boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                p: { xs: 0.5, md: 1.5 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                  m: { xs: 1, md: 2 },
                }}
              >
                Coupon Collected
              </Typography>
              <CouponCollectedForm />
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

export default DoctorTransactionPage;
