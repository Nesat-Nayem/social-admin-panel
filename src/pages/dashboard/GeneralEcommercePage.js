import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button, Card, Stack, Divider } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';
import { AppWelcome } from '../../sections/@dashboard/general/app';
// assets
import { MotivationIllustration } from '../../assets/illustrations';
import Scrollbar from '../../components/scrollbar';
import InvoiceAnalytic from '../../sections/@dashboard/invoice/InvoiceAnalytic';

// ----------------------------------------------------------------------

export default function GeneralEcommercePage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> General: E-commerce | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Card sx={{ mb: 5 }}>
              <Scrollbar>
                <Stack
                  direction="row"
                  divider={
                    <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                  }
                  sx={{ py: 2 }}
                >
                  <InvoiceAnalytic
                    title_one="David Smith"
                    title_two="ID No &nbsp;:"
                    title_two_value="133"
                    title_three="Joining Date &nbsp; :"
                    title_three_value="12/12/2021"
                    // total={tableData.length}
                    // percent={100}
                    // price={sumBy(tableData, 'totalPrice')}
                    icon="ic:round-receipt"
                    color={theme.palette.info.main}
                  />

                  <InvoiceAnalytic
                    title_one="Head Office &nbsp;:"
                    title_two="Reporting Manager &nbsp;:"
                    title_one_value="Pune"
                    title_two_value="Ganesh Kumar"
                    title_three="DOB &nbsp;:"
                    title_three_value="12/12/2021"
                    // total={getLengthByStatus('unpaid')}
                    // percent={getPercentByStatus('unpaid')}
                    // price={getTotalPriceByStatus('unpaid')}
                    icon="eva:clock-fill"
                    color={theme.palette.warning.main}
                  />

                  <InvoiceAnalytic
                    title_one="Date &nbsp;:"
                    title_two="Advance &nbsp;:"
                    title_one_value="12/12/2021"
                    title_two_value="4000"
                    title_three="Alloance Pending &nbsp;:"
                    title_three_value="Rs.1486"
                    // total={getLengthByStatus('paid')}
                    // percent={getPercentByStatus('paid')}
                    // price={getTotalPriceByStatus('paid')}
                    icon="eva:checkmark-circle-2-fill"
                    color={theme.palette.success.main}
                  />

                  {/* <InvoiceAnalytic
                    title="Overdue"
                    // total={getLengthByStatus('overdue')}
                    // percent={getPercentByStatus('overdue')}
                    // price={getTotalPriceByStatus('overdue')}
                    icon="eva:bell-fill"
                    color={theme.palette.error.main}
                  /> */}

                  {/* <InvoiceAnalytic
                    title="Draft"
                    // total={getLengthByStatus('draft')}
                    // percent={getPercentByStatus('draft')}
                    // price={getTotalPriceByStatus('draft')}
                    icon="eva:file-fill"
                    color={theme.palette.text.secondary}
                  /> */}
                </Stack>
              </Scrollbar>
            </Card>
          </Grid>
          {/* <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Congratulations! \n ${user?.displayName}`}
              description="Best seller of the month You have done 57.6% more sales today."
              img={
                <MotivationIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained">Go Now</Button>}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={4}>
            <EcommerceNewProducts list={_ecommerceNewProducts} />
          </Grid> */}

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Visit"
              percent={2.6}
              total={765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Current Month Visit"
              percent={-0.1}
              total={18765}
              chart={{
                colors: [theme.palette.info.main],
                series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Total Stock"
              percent={0.6}
              total={4876}
              chart={{
                colors: [theme.palette.warning.main],
                series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <EcommerceBestSalesman
              title="VSO Profile"
              tableData={_ecommerceBestSalesman}
              // tableData={[
              //   {
              //     doc_id: '123456789',
              //     dob: '12/12/2021',
              //     IDs_Attend: 'Yes',
              //     coupon_received: 'Yes',
              //     sample_given: 'Yes',
              //     coupon_settled: 'Yes',
              //     special_gift: 'Yes',
              //     last_two_month_visit: 'Yes',
              //     total_point_pending: '1000',
              //   },

              //   {
              //     doc_id: '123456789',
              //     dob: '12/12/2021',
              //     IDs_Attend: 'Yes',
              //     coupon_received: 'Yes',
              //     sample_given: 'Yes',
              //     coupon_settled: 'Yes',
              //     special_gift: 'Yes',
              //     last_two_month_visit: 'Yes',
              //     total_point_pending: '1000',
              //   },
              // ]}
              tableLabels={[
                // { id: 'seller', label: 'Seller' },
                // { id: 'product', label: 'Product' },
                // { id: 'country', label: 'Country', align: 'center' },
                // { id: 'total', label: 'Total' },
                // { id: 'rank', label: 'Rank', align: 'right' },
                { id: 'doc_id', label: 'Doc Id' },
                { id: 'dob', label: 'DOB' },
                { id: 'IDs Attend', label: 'IDs Attend', align: 'center' },
                { id: 'coupon_received', label: 'Coupon Received' },
                { id: 'sample_given', label: 'Sample Given', align: 'center' },
                { id: 'coupon_settled', label: 'Coupon Settled', align: 'center' },
                { id: 'special_gift', label: 'Special Gift', align: 'center' },
                { id: 'last_two_month_visit', label: 'Last Two Month Visit', align: 'center' },
                { id: 'total_point_pending', label: 'Total_point_pending', align: 'center' },
                { id: '' },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <EcommerceLatestProducts title="Sample Stock" list={_ecommerceLatestProducts} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender
              title="Sale By Gender"
              total={2324}
              chart={{
                series: [
                  { label: 'Mens', value: 44 },
                  { label: 'Womens', value: 75 },
                ],
              }}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              title="Yearly Sales"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '2019',
                    data: [
                      { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                      { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: '2020',
                    data: [
                      { name: 'Total Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                ],
              }}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceSalesOverview title="VSO Overview" data={_ecommerceSalesOverview} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance
              title="Total Points Pending"
              currentBalance={187650}
              sentAmount={25500}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
