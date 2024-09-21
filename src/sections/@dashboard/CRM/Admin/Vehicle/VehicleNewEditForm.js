import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, MenuItem, Stack } from '@mui/material';
// utils
// routes
// assets
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_DASHBOARD } from 'routes/paths';
import FormProvider, { RHFSelect, RHFTextField } from '../../../../../components/hook-form';
import { useSnackbar } from '../../../../../components/snackbar';

// ----------------------------------------------------------------------

VehicleNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  saveItem: PropTypes.func,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessages: PropTypes.object,
};

export default function VehicleNewEditForm({
  isEdit = false,
  currentUser,
  saveItem,
  isSuccess,
  isError,
  errorMessages,
}) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewVehicleSchema = Yup.object().shape({
    category: Yup.string().required('Vehicle Type is required'),
    allowance: Yup.number().required('Rs/Km is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      category: currentUser?.category || '',
      allowance: currentUser?.allowance || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewVehicleSchema),
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

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(!isEdit ? 'Vehicle Create Successfully!' : 'Vehicle Update success!');
      navigate(PATH_DASHBOARD.vehiclemaster.list);
    }
    if (isError) {
      // enqueueSnackbar('Failed to perform the operation', { variant: 'error' });
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        // enqueueSnackbar(`${field}: ${messages}`, { variant: 'error' });
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, navigate, isEdit, errorMessages]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      saveItem(data);
      // enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // navigate(PATH_DASHBOARD.user.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const options = [
    { value: 'MGR CAR', label: 'MGR CAR' },
    { value: 'MGR MOTOR CYCLE', label: 'MGR MOTOR CYCLE' },
    { value: 'SELF CAR', label: 'SELF CAR' },
    { value: 'SELF MOTOR CYCLE', label: 'SELF MOTOR CYCLE' },
  ];
  

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              {/* <RHFTextField name="category" label="Vehicle Type" /> */}

              <RHFSelect name="category" label="Vehicle Type" native={false}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </RHFSelect>

              <RHFTextField name="allowance" label="Rs/Km" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Vehicle' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
