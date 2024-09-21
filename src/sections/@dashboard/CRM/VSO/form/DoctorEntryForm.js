import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import FormProvider from 'components/crm-hook-form/FormProvider';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import CouponCard from 'CrmCard/CouponCard';
import CRMTextField from 'components/crm-hook-form/CRMTextField';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useGetItemById } from 'services/Master.Services';
import CouponDialogbox from '../list/CouponDialogbox';

DoctorEntryForm.propTypes = {
  cardData: PropTypes.string,
  setCardData: PropTypes.func,
  doctorData: PropTypes.object,
};
function DoctorEntryForm({ cardData, setCardData, doctorData }) {
  const DoctorEntrySchema = Yup.object().shape({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { name } = useParams();
  const doctor_id = name;
  const {
    data: doctordata,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetItemById('doctor', doctor_id);

  console.log('loading check', isLoading, isError, error, isSuccess);

  // const COUPON_COLLECTED = doctorData && doctorData?.coupon_collected;
  // const SAMPLE_GIVEN = doctorData && doctorData?.sample_given;
  // const COUPON_SETTLED = doctorData && doctorData?.coupon_settled;
  // const SPECIAL_GIFT = doctorData && doctorData?.special_gift;
  // const TOTAL_POINT = doctorData && doctorData?.total_point;
  const COUPON_COLLECTED = doctordata && doctordata?.coupon_collected;
  const SAMPLE_GIVEN = doctordata && doctordata?.sample_given;
  const COUPON_SETTLED = doctordata && doctordata?.coupon_settled;
  const SPECIAL_GIFT = doctordata && doctordata?.special_gift;
  const TOTAL_POINT = doctordata && doctordata?.total_point;

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
  const todayDate = new Date();
  const formattedDate = moment(todayDate).format('DD-MM-YYYY');

  useEffect(() => {
    if (!open) {
      // If the modal is closed, refetch the doctor data
      refetch({ force: true }).then((newData) => {
        // After refetching, log the new data
        console.log('Refetched', newData.data);
      });
    }
  }, [open, refetch]);

  const onSubmit = async (data) => {
    console.log('data', data);
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
          px={{ xs: 1, sm: 2, md: 2 }}
          justifyContent="center"
          alignItems="center"
          mt={1}
        >
          <Grid item xs={12} md={12}>
            <CRMTextField
              name="doc_id"
              placeholder={doctorData && doctorData?.id}
              bgColor="#2f5597"
              readOnly
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CRMTextField
              name="name"
              placeholder={doctorData && doctorData?.name}
              bgColor="#8faadc"
              readOnly
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CRMTextField
              name="area"
              placeholder={(doctorData && doctorData?.area) || 'Area'}
              bgColor="#b4c7e7"
              readOnly
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CRMTextField
              name="route"
              placeholder={doctorData && doctorData?.route}
              bgColor="#dae3f3"
              readOnly
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          px={{ xs: 1, sm: 2, md: 2 }}
          justifyContent="center"
          alignItems="center"
          mt={1}
        >
          <Grid item xs={12} md={6}>
            <CouponCard
              title="COUPON COLLECTED"
              count={COUPON_COLLECTED}
              bgColor="#2f5597"
              onClick={() => {
                setCardData('Coupon Collected');
                setOpen(true);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CouponCard
              title="SAMPLE GIVEN"
              count={SAMPLE_GIVEN}
              bgColor="#8faadc"
              onClick={() => {
                setCardData('Sample Given');
                setOpen(true);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CouponCard
              title="COUPON SETTLED"
              count={COUPON_SETTLED}
              bgColor="#b4c7e7"
              onClick={() => {
                setCardData('Coupon Settled');
                setOpen(true);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CouponCard
              title="SPECIAL GIFT"
              count={SPECIAL_GIFT}
              bgColor="#dae3f3"
              color="#000"
              onClick={() => {
                setCardData('Special Gift');
                setOpen(true);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            {/* <CRMTextFieldSmall name="total_point" label="TOTAL POINT" readOnly defaultValue="0" /> */}
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
        </Grid>
        <CouponDialogbox open={open} setOpen={setOpen} cardData={cardData} />
        <Stack direction="row" justifyContent="center" alignItems="center">
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
            }}
            onClick={() => {
              navigate('/dashboard/manager-visit-entry');
            }}
          >
            ENTER
          </Button>
        </Stack>
      </FormProvider>
    </div>
  );
}

export default DoctorEntryForm;
