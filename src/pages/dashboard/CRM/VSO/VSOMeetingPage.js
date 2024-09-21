import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { useAuthContext } from 'auth/useAuthContext';
import { useSettingsContext } from 'components/settings';
import { Helmet } from 'react-helmet-async';
import MeetingForm from 'sections/@dashboard/CRM/VSO/form/MeetingForm';
import { useGetMaster } from 'services/Master.Services';

function VSOMeetingPage() {
  const { themeStretch } = useSettingsContext();
  const { user } = useAuthContext();
  console.log('user', user?.id);
  const vso_id = user?.id;
  const { data, isLoading } = useGetMaster('meeting-create');
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  const filteredData =
    data &&
    data?.filter((item) => {
      return item.date === todayDate; // Compare the date field with today's date
    });
  const filteredDataVSO =
    filteredData &&
    filteredData?.filter((item) => {
      return item.vso_id.includes(user?.id);
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {' '}
      <Helmet>
        <title> VSO: Visit Entry</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={8}>
            {filteredDataVSO.length < 1 && (
              <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
                No Meeting Scheduled for Today
              </Typography>
            )}

            {filteredDataVSO &&
              filteredDataVSO.length > 0 &&
              filteredDataVSO.map((item) => (
                <Card
                  sx={{
                    borderRadius: '3rem',
                    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                    border: '1px solid primary.main',
                    my: 2,
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                      m: { xs: 1, md: 2 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        flex: '1', // This allows the text to grow and take available space
                        textAlign: 'center',
                        textTransform: 'uppercase',
                      }}
                    >
                      Meeting
                    </Typography>
                  </Box>

                  <MeetingForm
                    key={item.id}
                    date={item.date}
                    time={item.time}
                    id={item.id}
                    description={item.desc}
                    title={item.title}
                    vso_id={vso_id}
                    isLoading={isLoading}
                  />
                </Card>
              ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default VSOMeetingPage;
