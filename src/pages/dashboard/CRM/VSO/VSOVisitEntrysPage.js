import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
// components

import { useNavigate } from 'react-router';
import VistReportEntryNewEditForm from 'sections/@dashboard/CRM/VSO/form/VistReportEntryNewEditForm';
import { useSettingsContext } from '../../../../components/settings';

function VSOVisitEntrysPage() {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
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

              <VistReportEntryNewEditForm />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default VSOVisitEntrysPage;
