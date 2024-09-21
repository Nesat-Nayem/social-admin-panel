import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material';
// utils
// routes
// assets
// components
import { MobileDatePicker } from '@mui/x-date-pickers';
import FormProvider, { RHFTextField } from 'components/hook-form';
import { useSnackbar } from 'components/snackbar';
import { Upload } from 'components/upload';

// ----------------------------------------------------------------------

VisitReportNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  pageFor: PropTypes.string,
};

export default function VisitReportNewEditForm({
  isEdit = false,
  currentUser = null,
  pageFor = 'START',
}) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const [dateValue, setDateValue] = useState(new Date());

  const VisitReportSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Address is required'),
    // country: Yup.string().required('Country is required'),
    // company: Yup.string().required('Company is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role is required'),
    // avatarUrl: Yup.string().required('Avatar is required').nullable(true),
  });

  const defaultValues = useMemo(
    () => ({
      // name: currentUser?.name || '',
      // email: currentUser?.email || '',
      // phoneNumber: currentUser?.phoneNumber || '',
      // address: currentUser?.address || '',
      // country: currentUser?.country || '',
      // state: currentUser?.state || '',
      // city: currentUser?.city || '',
      // zipCode: currentUser?.zipCode || '',
      // avatarUrl: currentUser?.avatarUrl || null,
      // isVerified: currentUser?.isVerified || true,
      // status: currentUser?.status,
      // company: currentUser?.company || '',
      // role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
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
  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('avatarUrl', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );
  const TRAVEL_OPTIONS = [
    { label: 'VSO Car', value: 'Car' },
    { label: 'VSO Motor Cycle', value: 'Motorcycle' },
    { label: 'VSO Self Car', value: 'Selfcar' },
    { label: 'VSO Self Motor Cycle', value: 'Selfmotorcycle' },
    { label: 'Misllenious', value: 'Misllenious' },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Label
              color={values.status === 'active' ? 'success' : 'error'}
              sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
            >
              Upload Meter Image
            </Label>

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                // onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
            <Stack spacing={1}>
              <Typography variant="subtitle1"> Travel </Typography>
              <RHFMultiCheckbox name="travel" options={TRAVEL_OPTIONS} sx={{ width: 1 }} />
            </Stack>
          </Card> */}
          <Card>
            <CardHeader title="Upload Single File" />
            <CardContent>
              <Upload file={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Enter Id No With Whome You Are Visiting" />
              <MobileDatePicker
                orientation="portrait"
                label="Date"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />

              {pageFor === 'START' ? (
                <RHFTextField name="email" label="Start Km " />
              ) : (
                <RHFTextField name="email" label="End Km " />
              )}

              <RHFTextField name="state" label="Per KM Car Allowance" />
              <RHFTextField name="city" label="Per KM Motor Cycle Allowance" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Start You Day Good Luck
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
