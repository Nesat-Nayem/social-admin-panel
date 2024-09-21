import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Card, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// auth
import moment from 'moment';
import ProfileData from 'sections/@dashboard/CRM/VSO/list/ProfileData';
import SampleStock from 'sections/@dashboard/CRM/VSO/list/SampleStock';
import VsoTable from 'sections/@dashboard/CRM/VSO/list/VsoTable';
import { useGetVSOById } from 'services/VSO.Services';
import { useAuthContext } from '../../../../auth/useAuthContext';
// _mock_
// components
import { useSettingsContext } from '../../../../components/settings';
// sections
// assets
import Scrollbar from '../../../../components/scrollbar';

function VSOProfilePage() {
  const { user } = useAuthContext();
  const { name, headoffice, advance, allowancepending, dob, id, reportingmanager } = user;
  const { data } = useGetVSOById('vso', id);
  const todayDate = new Date();
  const formattedDate = moment(todayDate).format('DD-MM-YYYY');

  const SAMPLE_STOCK = data && data?.samples;
  const MEDICINE_STOCK = data && data?.medicines;

  console.log('VSOProfilePage', data && data?.samples);

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> VSO: Profile | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={3}>
            <Card sx={{ mb: 5, backgroundColor: 'primary.dark' }}>
              <Scrollbar>
                <Stack
                  direction="column"
                  divider={
                    <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                  }
                  sx={{ py: 2 }}
                >
                  {' '}
                  <LoggedIn />
                </Stack>
              </Scrollbar>
            </Card>{' '}
          </Grid> */}
          <Grid item xs={12} md={12}>
            <Card
              sx={{
                backgroundColor: 'primary.light',
                p: {
                  xs: 0.5,
                  md: 1.5,
                },
              }}
            >
              <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                VSO PROFILE
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Scrollbar>
                  <Stack
                    direction="row"
                    divider={
                      <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                    }
                    sx={{ py: 2 }}
                  >
                    <ProfileData
                      title_one={data && data?.name}
                      title_two="ID No &nbsp;:"
                      title_two_value={data && data?.id}
                      title_three="Joining Date &nbsp; :"
                      title_three_value={moment(data && data?.created_at).format('DD-MM-YYYY')}
                      icon="ic:round-receipt"
                      color={theme.palette.info.main}
                    />

                    <ProfileData
                      title_one="Head Office &nbsp;:"
                      title_two="Reporting Manager &nbsp;:"
                      title_one_value={data && data?.headoffice}
                      title_two_value={data && data?.reportingmanager}
                      title_three="DOB &nbsp;:"
                      title_three_value={moment(data && data?.dob).format('DD-MM-YYYY')}
                      icon="eva:clock-fill"
                      color={theme.palette.warning.main}
                    />

                    <ProfileData
                      title_one="Date &nbsp;:"
                      title_two="Advance &nbsp;:"
                      title_one_value={formattedDate}
                      title_two_value={`Rs.${data && data?.advance}`}
                      title_three="Allowance Pending &nbsp;:"
                      title_three_value={`Rs.${data && data?.allowancepending}`}
                      icon="eva:checkmark-circle-2-fill"
                      color={theme.palette.success.main}
                    />
                  </Stack>
                </Scrollbar>
              </Box>
              <Card sx={{ mb: 3, backgroundColor: 'primary.lighter' }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    py: 0.5,
                    fontWeight: 'bold',
                  }}
                  variant="subtitle1"
                >
                  Sample Stock with you
                </Typography>
                <Scrollbar>
                  <Stack direction="row" sx={{ py: 2 }} spacing={0}>
                    {SAMPLE_STOCK?.map((stock, index) => (
                      <SampleStock
                        title={stock?.samplename}
                        total_stock={stock?.samplequantity}
                        key={index}
                        stock={SAMPLE_STOCK}
                        stockLength={SAMPLE_STOCK?.length}
                      />
                    ))}

                    {SAMPLE_STOCK?.length < 1 && (
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: 'center',
                          width: '100%',
                        }}
                      >
                        Your Sample Stock is empty
                      </Typography>
                    )}
                  </Stack>
                </Scrollbar>
              </Card>

              {/* <Card sx={{ mb: 3, backgroundColor: 'primary.lighter' }}>
                <Typography
                  sx={{
                    textAlign: 'center',
                    py: 0.5,
                    fontWeight: 'bold',
                  }}
                  variant="subtitle1"
                >
                  Medicine Stock with you
                </Typography>
                <Scrollbar>
                  <Stack direction="row" sx={{ py: 2 }} spacing={0}>
                    {MEDICINE_STOCK?.map((stock, index) => (
                      <SampleStock
                        title={stock?.name}
                        total_stock={stock?.quantity}
                        key={index}
                        stock={SAMPLE_STOCK}
                        stockLength={MEDICINE_STOCK?.length}
                      />
                    ))}
                    {MEDICINE_STOCK?.length < 1 && (
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: 'center',
                          width: '100%',
                        }}
                      >
                        Your Medicine Stock is empty
                      </Typography>
                    )}
                  </Stack>
                </Scrollbar>
              </Card> */}
              <VsoTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default VSOProfilePage;
