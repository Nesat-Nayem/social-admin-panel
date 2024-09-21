import { Box, Button, FormLabel, Grid, Stack, Typography } from '@mui/material';
import FormProvider from 'components/crm-hook-form/FormProvider';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import CRMTextField from 'components/crm-hook-form/CRMTextField';
import { RHFUploadBox } from 'components/hook-form';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearVso } from 'redux/slices/VSO';
import { PATH_DASHBOARD } from 'routes/paths';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import VsoDialogbox from '../list/VsoDialogbox';

VisitExitNewEditForm.propTypes = {
  create: PropTypes.func,
  success: PropTypes.bool,
  isLoading: PropTypes.bool,
};
function VisitExitNewEditForm({ create, success, isLoading }) {
  const VisitReportSchema = Yup.object().shape({
    end_km: Yup.number().required('End Km is required').min(1, 'Minimum 1'),
    end_Km_img: Yup.string().required('Meter Display is required'),
    miscellaneous_amt: Yup.number().required('Miscellaneous Amount is required'),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todayDate = new Date();
  const formattedDate = moment(todayDate).format('DD-MM-YYYY');

  const { vso } = useSelector((state) => state.vso);
  const { start_Km_img, start_Km, visitor_id, car_select, noOfVisitor, manager_id } = vso;

  const [open, setOpen] = useState(false);

  const defaultValues = useMemo(
    () => ({}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const methods = useForm({
    resolver: yupResolver(VisitReportSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const end_Km_img = values && values?.end_Km_img;

  const endKmPreview = JSON.stringify(values?.end_Km_img);

  useEffect(() => {
    if (success) {
      setOpen(true);
      reset();
      dispatch(clearVso());
    }
  }, [success, reset, dispatch]);

  // console.log('startKmPreview', start_Km_img, 'endKmPreview', values?.end_Km_img);

  const onSubmit = async (data) => {
    // const m_id = manager_id ;

    try {
      const payloadData = {
        start_Km_img,
        start_Km,
        end_Km_img,
        noOfVisitor,
        visitor_id,
        car_select,
        miscellaneous_amt: data.miscellaneous_amt,
        end_km: data.end_km,
        manager_id,
      };
      await create(payloadData);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log('PP', typeof manager_id);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('end_Km_img', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <div>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            direction="column"
            px={{ xs: 1, sm: 2, md: 2 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                DATE: {formattedDate}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <FormLabel sx={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>
                  Meter Display
                </FormLabel>
                <RHFUploadBox
                  name="end_Km_img"
                  onDrop={handleDrop}
                  label="Meter Display"
                  file={endKmPreview}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <FormLabel sx={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>
                  End KM
                </FormLabel>
                <CRMTextField name="end_km" placeholder="END KM" bgColor="#8faadc" type="number" />
              </Box>
            </Grid>
            <Grid item xs={12} md={8} minWidth="50%">
              <CRMTextField
                name="miscellaneous_amt"
                placeholder="MISCELLANEOUS AMOUNT"
                bgColor="#dae3f3"
                color="#000"
                type="number"
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="outlined"
              sx={{
                px: '45px',
                py: '18px',
                mt: '20px',
              }}
              onClick={() => navigate(PATH_DASHBOARD.vso.visitentry)}
            >
              {' '}
              Go Back
            </Button>
            <Button
              // onClick={() => {
              //   setOpen(true);
              // }}
              type="submit"
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
            >
              LET US CALL IT A DAY
              <Box
                sx={{
                  fontFamily: 'Dancing Script !important',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Have a great time
              </Box>
            </Button>
          </Stack>
        </FormProvider>
      )}
      <VsoDialogbox open={open} setOpen={setOpen} />
    </div>
  );
}

export default VisitExitNewEditForm;
