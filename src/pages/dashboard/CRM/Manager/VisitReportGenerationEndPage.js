import { Card, Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import VisitReportExpensesGenerationNewEditForm from 'sections/@dashboard/CRM/Manager/form/VisitReportExpensesGenerationNewEditForm';
import { useSettingsContext } from '../../../../components/settings';

function VisitReportGenerationEndPage() {
  const { themeStretch } = useSettingsContext();
  return (
    <div>
      <Helmet>
        <title> MANGER: Report Generation Start</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} justifyContent="center" alignItems="center" s>
          <Grid item xs={12} md={10}>
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
                Visit Report and Expenses Generation
              </Typography>
              <VisitReportExpensesGenerationNewEditForm type="end" />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default VisitReportGenerationEndPage;
