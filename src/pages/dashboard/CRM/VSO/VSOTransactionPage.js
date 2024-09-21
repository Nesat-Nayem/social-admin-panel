import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { useSettingsContext } from 'components/settings';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DoctorEntryForm from 'sections/@dashboard/CRM/VSO/form/DoctorEntryForm';
import { useGetMasterById } from 'services/Master.Services';

function VSOTransactionPage() {
  const { themeStretch } = useSettingsContext();
  const [cardData, setCardData] = useState('coupon collected');
  console.log('cardData', cardData);
  const { data, isLoading, refetch } = useGetMasterById('doctor');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {' '}
      <Helmet>
        <title> VSO: Visit Entry</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={5.5}>
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
                  Visit Report and Expenses Generation
                </Typography>
                <DoctorEntryForm cardData={cardData} setCardData={setCardData} doctorData={data} />
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
              <CouponCollectedTable COUPONS_DATA={COUPONS_DATA} isLoading={isLoading} />
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

export default VSOTransactionPage;
