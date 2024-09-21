import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import VisitReportExpensesNewEditFrom from 'sections/@dashboard/CRM/VSO/form/VisitReportExpensesNewEditFrom';
import { useGetMaster } from 'services/Master.Services';
import { useSettingsContext } from '../../../../components/settings';

function VSOVisitPage() {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const { data: allowanceData, isLoading } = useGetMaster('car-allowance');

  return (
    <>
      <Helmet>
        <title> VSO: Visit Page | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={10}>
            <Card
              sx={{
                borderRadius: '3rem',
                boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
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

              <VisitReportExpensesNewEditFrom allowanceData={allowanceData} isLoading={isLoading} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default VSOVisitPage;
