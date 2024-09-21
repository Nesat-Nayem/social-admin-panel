import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import VisitExitNewEditForm from 'sections/@dashboard/CRM/VSO/form/VisitExitNewEditForm';
import { useCreateVsoVisit } from 'services/VSO.Services';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useSettingsContext } from '../../../../components/settings';

function VSOVisitExitPage() {
  const { themeStretch } = useSettingsContext();

  const { create, success, successMessage, isError, isLoading, errorMessages } =
    useCreateVsoVisit();
  const { enqueueSnackbar } = useSnackbar();

  console.log('loading check', success, successMessage, isError, isLoading);

  useEffect(() => {
    // if(){
    //   return <LoadingScreen />;
    // }

    if (success) {
      enqueueSnackbar('Vso Visit Created Successfully!');
    }
    if (isError) {
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        // enqueueSnackbar(`${field}: ${messages}`, { variant: 'error' });
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [success, successMessage, enqueueSnackbar, isError, isLoading, errorMessages]);

  // if(isLoading){
  //   return <LoadingScreen />;
  // }

  return (
    <>
      {' '}
      <Helmet>
        <title> VSO: Visit Entry</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={10}>
            <Card
              sx={{
                borderRadius: '3rem',
                boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                border: '1px solid primary.main',
                // p: { xs: 0.5, md: 1.5 },
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
                {/* Back Arrow */}
                {/* <Box
                  sx={{
                    flex: '0 0 auto', // This ensures the box doesn't grow and shrink
                    textAlign: 'left',
                    ml: 1,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                </Box> */}

                {/* Text */}
                <Typography
                  variant="h6"
                  sx={{
                    flex: '1', // This allows the text to grow and take available space
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  Visit Report Entry
                </Typography>
              </Box>
              {/* <Box>
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
                  Visit Report Submission
                </Typography>
              </Box> */}
              <VisitExitNewEditForm isLoading={isLoading} create={create} success={success} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default VSOVisitExitPage;
