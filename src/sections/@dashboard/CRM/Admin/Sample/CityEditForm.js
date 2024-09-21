import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_DASHBOARD } from 'routes/paths';
import FormProvider, { RHFTextField } from '../../../../../components/hook-form';
import { useSnackbar } from '../../../../../components/snackbar';

// ----------------------------------------------------------------------

CityEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  saveItem: PropTypes.func,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessages: PropTypes.object,
};

export default function CityEditForm({
  isEdit = false,
  currentUser,
  saveItem,
  isSuccess,
  isError,
  errorMessages,
}) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewInventorySchema = Yup.object().shape({
    cityname: Yup.string().required('cityname is required'),
  });
  console.log(currentUser);
  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      cityname: currentUser?.cityname || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewInventorySchema),
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
      navigate(PATH_DASHBOARD.InventoryManagement.root);
      enqueueSnackbar(!isEdit ? 'Sample Create Successfully!' : 'Update success!');
    }
    if (isError) {
      // enqueueSnackbar('Failed to perform the operation', { variant: 'error' });
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        // enqueueSnackbar(`${field}: ${messages}`, { variant: 'error' });
        enqueueSnackbar(`${messages}`, { variant: 'error' });
        console.log(isError);
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, navigate, isEdit, errorMessages]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // API.put(`/api/sample/${data.id}`, data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      saveItem(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

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
              {/* <RHFSelect name="vsoid" label="Vso ID">
                {VSO_OPTIONS?.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </RHFSelect> */}
              <RHFTextField name="cityname" />

              {/* <RHFTextField name="point" label="Point" /> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Sample' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
