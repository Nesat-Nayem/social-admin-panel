import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import * as Yup from 'yup';
// utils
// routes
// assets
// components
import RHFDatePicker from 'components/hook-form/RHFDatePicker';

import RHFTimePicker from 'components/hook-form/RHFTimePicker';
import moment from 'moment';
import { useGetMaster } from 'services/Master.Services';
import FormProvider, { RHFMultiSelect, RHFTextField } from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

MeetingNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  saveItem: PropTypes.func,
};

export default function MeetingNewEditForm({ isEdit = false, currentUser, saveItem }) {
  const { data: VSO, isLoading } = useGetMaster('vso');
  const { data: MANAGER, isLoading: isManagerLoading } = useGetMaster('manager');

  const NewMeetingSchema = Yup.object().shape({
    vso_id: Yup.array().required('VSO Id is required'),
    title: Yup.string().required('Meeting Name is required'),
    date: Yup.string().required('Meeting Date is required'),
    time: Yup.string().required('Meeting Time is required'),
    desc: Yup.string().required('Meeting Description is required'),
  });

  console.log('currentUser', currentUser?.vso_id);

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      title: currentUser?.title || '',
      date: currentUser?.date || '',
      time: (currentUser?.time && new Date(`1970-01-01T${currentUser.time}`)) || '',
      desc: currentUser?.desc || '',
      vso_id: currentUser?.vso_id || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewMeetingSchema),
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

  const onSubmit = async (data) => {
    try {
      if (data.time || data.date) {
        data.time = moment(values.time).format('HH:mm:ss');
        data.date = moment(values.date).format('YYYY-MM-DD');
      }
      saveItem(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || isManagerLoading) {
    return <div>Loading...</div>;
  }
  const VSO_OPTIONS = VSO?.map((item) => ({
    value: item.id,
    label: `${item.id} - ${item.name}`,
  }));

  const MANAGER_OPTIONS = MANAGER?.map((item) => ({
    value: item.id,
    label: `${item.id} - ${item.name}`,
  }));

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
              <RHFMultiSelect chip checkbox name="vso_id" label="VSO Id" options={VSO_OPTIONS} />
              <RHFMultiSelect
                chip
                checkbox
                name="vso_id"
                label="Manager Id"
                options={MANAGER_OPTIONS}
              />
              <RHFTextField name="title" label="Meeting Name" />
              <RHFDatePicker
                name="date"
                label="Meeting Date"
                control={control}
                // defaultValue={null}
                minDate={new Date()}
              />
              <RHFTimePicker
                name="time"
                label="Meeting Time"
                control={control}
                // defaultValues={currentUser?.time || ''}
                defaultValues={currentUser?.time ? new Date(currentUser.time) : null}
                disablePast
              />

              <RHFTextField name="desc" label="Meeting Description" />

              {/* <RHFTextField name="vehical_name" label="Vehical Name" /> */}
              {/* <RHFSelect name="vehicle" label="Vehicle Type">
                {VEHICAL_OPTIONS.map((vehicle) => (
                  <MenuItem key={vehicle.code} value={vehicle.value}>
                    {vehicle.label}
                  </MenuItem>
                ))}
              </RHFSelect> */}

              {/* <RHFTextField name="per_km" label="Per Km" />
              <RHFTextField name="price" label="Price" /> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Meeting' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
