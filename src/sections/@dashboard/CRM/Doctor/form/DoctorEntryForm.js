import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import FormProvider from 'components/crm-hook-form/FormProvider';
import propTypes from 'prop-types';
import { useMemo } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import CouponCard from 'CrmCard/CouponCard';
import CRMTextField from 'components/crm-hook-form/CRMTextField';
import moment from 'moment';
import { useForm } from 'react-hook-form';

DoctorEntryForm.propTypes = {
  doctor_id: propTypes.string,
  doctor_name: propTypes.string,
  route: propTypes.string,
  doctorData: propTypes.object,
};

function DoctorEntryForm({ doctor_id, doctor_name, route, doctorData }) {
  const DoctorEntrySchema = Yup.object().shape({});
  const todayDate = new Date();
  const formattedDate = moment(todayDate).format('DD-MM-YYYY');

  const defaultValues = useMemo(
    () => ({}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const methods = useForm({
    resolver: yupResolver(DoctorEntrySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const COUPON_COLLECTED = doctorData && doctorData?.coupon_collected;
  const SAMPLE_GIVEN = doctorData && doctorData?.sample_given;
  const COUPON_SETTLED = doctorData && doctorData?.coupon_settled;
  const SPECIAL_GIFT = doctorData && doctorData?.special_gift;
  const TOTAL_POINT = doctorData && doctorData?.total_point;

  console.log('COUPON_COLLECTED', COUPON_COLLECTED);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();

      // pageFor
      //   enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      //   navigate(PATH_DASHBOARD.user.list);
      //   console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }} textAlign="center">
          DATE: {formattedDate}
        </Typography>
        <Grid
          container
          spacing={0}
          px={{ xs: 1, sm: 2, md: 10 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={12}>
            <CRMTextField
              name="doc_id"
              placeholder={(doctorData && doctorData?.id) || 'Doctor ID'}
              bgColor="#2f5597"
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CRMTextField
              name="name"
              placeholder={(doctorData && doctorData?.name) || 'Name'}
              bgColor="#8faadc"
              readOnly="true"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CRMTextField
              name="area"
              placeholder={(doctorData && doctorData?.area) || 'Area'}
              bgColor="#b4c7e7"
              readOnly="true"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CRMTextField
              name="route"
              placeholder={(doctorData && doctorData?.route) || 'Route'}
              bgColor="#dae3f3"
              readOnly="true"
            />
          </Grid>
        </Grid>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          m={2}
        >
          <Grid
            container
            spacing={3}
            // px={{ xs: 1, sm: 2, md: 10 }}
            justifyContent="center"
            alignItems="center"
            // mt={1}
          >
            <Grid item xs={12} md={12}>
              {' '}
              <Typography variant="body1" sx={{ fontWeight: 'bold' }} textAlign="center">
                Last Report{' '}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CouponCard title="COUPON COLLECTED" bgColor="#2f5597" count={COUPON_COLLECTED} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CouponCard title="SAMPLE GIVEN" bgColor="#8faadc" count={SAMPLE_GIVEN} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CouponCard title="COUPON SETTLED" bgColor="#b4c7e7" count={COUPON_SETTLED} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CouponCard
                title="SPECIAL GIFT"
                bgColor="#dae3f3"
                color="#000"
                count={SPECIAL_GIFT}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              {/* <CRMTextFieldSmall
                name="total_point"
                label="TOTAL POINT"
                defaultValue="0"
                readOnly="true"
              /> */}
              <Stack
                direction="row"
                gap={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                  TOTAL POINT
                </Typography>
                <Box
                  sx={{
                    padding: '5px 40px',
                    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                    borderRadius: '5px',
                  }}
                >
                  {TOTAL_POINT}
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  width: 'fit-content',
                  mt: '20px',
                  px: '45px',
                  py: '6px',
                  color: '#000',
                  backgroundColor: '#8faadc !important',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                EXIT
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" mt={1}>
            <Grid
              item
              xs={12}
              md={9}
              sx={{
                backgroundColor: 'primary.dark',
                borderRadius: '3rem',
                p: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: 'yellow',
                  color: '#000',
                  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                  // width: 'fit-content',
                  px: 1.8,
                  py: 0.6,
                  m: 2,
                  borderRadius: '8px',
                }}
                textAlign="center"
              >
                Newsletter
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 5 }} textAlign="center">
                COMMON NEWS FOR AALL DOCTORS LETTER ISSUED BY THE ADMIN
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </FormProvider>
    </div>
  );
}

export default DoctorEntryForm;
