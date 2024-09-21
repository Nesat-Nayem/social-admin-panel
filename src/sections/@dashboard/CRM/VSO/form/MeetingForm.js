import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Typography } from '@mui/material';
import CRMTextField from 'components/crm-hook-form/CRMTextField';
import FormProvider from 'components/crm-hook-form/FormProvider';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { useCreateItem } from 'services/Master.Services';
import * as Yup from 'yup';

MeetingForm.propTypes = {
  key: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  vso_id: PropTypes.string,
  isLoading: PropTypes.bool,
};
const NewMeetingSchema = Yup.object().shape({
  allowance: Yup.string().required('Special Allowance is required'),
});

function MeetingForm({ key, id, date, time, description, title, vso_id, isLoading }) {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(NewMeetingSchema),
  });
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const { enqueueSnackbar } = useSnackbar();

  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('meeting-submit');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(`Special Allowance Submit  Successfully!`);
      reset({
        allowance: '',
      });
      setTimeout(() => {
        navigate(PATH_DASHBOARD.vso.vso);
      }, 2000);
    }
    if (isError) {
      // enqueueSnackbar('Failed to perform the operation', { variant: 'error' });
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        // enqueueSnackbar(`${field}: ${messages}`, { variant: 'error' });
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, errorMessages, title, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        vso_id,
        title,
      };
      createItem(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
              DATE: {date}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              TIME: {time}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              TITLE: {title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} minWidth="50%">
            <CRMTextField
              name="allowance"
              placeholder="Special Allowance"
              bgColor="#dae3f3"
              color="#000"
            />
          </Grid>
        </Grid>{' '}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            size="large"
            sx={{
              width: 'fit-content',
              mt: '20px',
              px: '45px',
              py: '6px',
              color: '#000',
              backgroundColor: '#8faadc !important',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Dancing Script !important',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            Submit
          </LoadingButton>
        </Stack>
      </FormProvider>
    </div>
  );
}

export default MeetingForm;
