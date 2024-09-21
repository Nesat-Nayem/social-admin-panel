import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
// @mui
// utils
// routes
// assets
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { Upload } from 'components/upload';
import moment from 'moment';
import FormProvider, { RHFTextField, RHFUploadAvatar } from '../../../../../components/hook-form';
import { useSnackbar } from '../../../../../components/snackbar';
import MedicineDetails from './form/MedicineDetails';
import SampleDetails from './form/SampleDetails';

// ----------------------------------------------------------------------

VsoNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  save: PropTypes.func,
};

export default function VsoNewEditForm({ isEdit = false, currentUser, save }) {
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [adharCard, setAdharCard] = useState(null);

  // const { isSuccess, isError, errorMessages } = useCreateMaster('vso');
  // const {
  //   update,
  //   isSuccess: updateSuccess,
  //   isError: updateError,
  //   errorMessages: updateErrorMessages,
  // } = useUpdateMaster('vso');

  const { enqueueSnackbar } = useSnackbar();

  console.log('current user', currentUser);

  const NewVsoSchema = Yup.object().shape({
    id: Yup.string().required('Id is required'),
    name: Yup.string().required('Full Name is required'),
    dob: Yup.string().required('Date of Birth is required'),
    // reportingmanager: Yup.string().required('Reporting Manager is required'),
    // headoffice: Yup.string().required('Branch is required'),

    password: isEdit
      ? Yup.string()
      : Yup.string().required('Password is required').min(6, 'Password Should be atlest 6 digit'),
    allowancepending: Yup.string().required('Allowance Pending is required'),
    advance: Yup.string().required('Advance is required'),
    // pan_card_no: Yup.string().required('Pan Card No is required'),
    // adhar_card_no: Yup.string().required('Adhar Card No is required'),
    // qualification: Yup.string().required('Qualification is required'),
    // account_holder_name: Yup.string().required('Account Holder Name is required'),
    // account_number: Yup.string().required('Account Number is required'),
    // ifsc_code: Yup.string().required('IFCS Code is required'),
    // bank_name: Yup.string().required('Bank Name is required'),
    // cv: Yup.mixed().required('CV is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      name: currentUser?.name || '',
      dob: currentUser?.dob || '',
      reportingmanager: currentUser?.reportingmanager || '',
      headoffice: currentUser?.headoffice || '',
      password: currentUser?.password || '',
      phone: currentUser?.phone || '',
      email: currentUser?.email || '',
      address: currentUser?.address || '',
      qualification: currentUser?.qualification || '',
      allowancepending: currentUser?.allowancepending || '',
      advance: currentUser?.advance || '',
      pan_card_no: currentUser?.pan_card_no || '',
      adhar_card_no: currentUser?.adhar_card_no || '',
      account_holder_name: currentUser?.account_holder_name || '',
      account_number: currentUser?.account_number || '',
      ifsc_code: currentUser?.ifsc_code || '',
      bank_name: currentUser?.bank_name || '',
      // profile_image: currentUser?.profile_image || null,
      profile_image: null,
      // cv: currentUser?.cv || null,
      // adhar_card_image: currentUser?.adhar_card_image || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewVsoSchema),
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
    console.log({ data });
    try {
      const { adhar_card_image, pan_card_image, cv: CV, profile_image } = data;
      if (data.dob) {
        data.dob = moment(values.dob).format('MM/DD/YYYY');
      }
      if (
        typeof adhar_card_image === 'string' ||
        typeof pan_card_image === 'string' ||
        typeof CV === 'string' ||
        typeof profile_image === 'string'
      ) {
        delete data.adhar_card_image;
        delete data.pan_card_image;
        delete data.cv;
        delete data.profile_image;
      }
      console.log();
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();

      save(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('profile_image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropSingleFileCV = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setCv(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
        setValue('cv', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const handleDropSingleFileAdharCard = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setAdharCard(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
        setValue('adhar_card_image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDropSingleFilePanCard = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setPanCard(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
        setValue('pan_card_image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 50); // 50 years ago
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18); // 18 years ago

  console.log('values', errors);

  return (
    <Stack gap={3}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" gap={3}>
          {/* <ProfileDetail />
        <AllowanceDetails />
        <StockDetails />
        <BankDetails />
        <DocumentDetail /> */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 5 }}>
                  <RHFUploadAvatar
                    name="profile_image"
                    maxSize={3145728}
                    onDrop={handleDrop}
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
                      </Typography>
                    }
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField
                    name="id"
                    label="ID"
                    inputProps={{
                      maxLength: 6,
                    }}
                    onInput={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                    }}
                  />
                  <RHFTextField name="name" label="Full Name" />
                  <RHFTextField name="email" label="Email Address" />
                  <RHFTextField name="phone" label="Phone Number" />

                  <RHFDatePicker
                    name="dob"
                    label="Date of Birth"
                    control={control}
                    defaultValue={null}
                  />
                  <RHFTextField name="password" label="Password" />
                  {/* <RHFTextField name="address" label="Address" />
                  <RHFTextField name="reportingmanager" label="Manager Name" />
                  <RHFTextField name="qualification" label="Qualification" />
                  <RHFTextField name="headoffice" label="Head Office" />
                  <RHFTextField name="adhar_card_no" label="Adhar Card No" />
                  <RHFTextField name="pan_card_no" label="Pan Card No" /> */}
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Allowance Details
            </Typography>

            <Grid container spacing={3} justifyContent="flex-end">
              <Grid item xs={12} md={8}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="advance" label="Advance" />
                  <RHFTextField name="allowancepending" label="Allowance Pending" />
                </Box>

                {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    
                    Save
                  </LoadingButton>
                </Stack> */}
              </Grid>
            </Grid>
          </Paper>
          {/* <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bank Details
            </Typography>

            <Grid container spacing={3} justifyContent="flex-end">
              <Grid item xs={12} md={8}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="bank_name" label="Bank Name" />
                  <RHFTextField name="account_holder_name" label="Account Holder Name" />
                  <RHFTextField name="account_number" label="Account Number" />
                  <RHFTextField name="ifsc_code" label="IFCS Code" />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upload Document
            </Typography>

            <Grid container spacing={3} justifyContent="flex-end">
              <Grid item xs={12} md={8}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                  }}
                >
                  <Stack direction="column" spacing={2}>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Upload Adhar Card
                    </Typography>
                    <Upload
                      file={adharCard || currentUser?.adhar_card_image}
                      onDrop={handleDropSingleFileAdharCard}
                      onDelete={() => setAdharCard(null)}
                    />
                  </Stack>
                  <Stack direction="column" spacing={2}>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      Upload Pan Card
                    </Typography>
                    <Upload
                      file={panCard || currentUser?.pan_card_image}
                      onDrop={handleDropSingleFilePanCard}
                      onDelete={() => setPanCard(null)}
                    />
                  </Stack>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Upload CV
                  </Typography>
                  <Upload
                    file={cv || currentUser?.cv}
                    onDrop={handleDropSingleFileCV}
                    onDelete={() => setCv(null)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper> */}
        </Stack>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} size="large">
            {!isEdit ? 'Create VSO' : 'Save Changes'}
          </LoadingButton>
        </Stack>

        {/* <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
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
              <RHFTextField
                name="id"
                label="Id"
                inputProps={{
                  maxLength: 6,
                }}
              />
              <RHFTextField name="name" label="Full Name" />

              <RHFDatePicker
                name="dob"
                label="Date of Birth"
                control={control}
                defaultValue={null}
                disableFuture
                minDate={minDate}
                maxDate={maxDate}
                format="dd/MM/yyyy"
              />

              <RHFTextField name="reportingmanager" label="Manager Name" />
              <RHFTextField name="headoffice" label="Branch" />
              <RHFTextField name="password" label="Password" />

              <RHFTextField name="allowancepending" label="Allowance Pending" />
              <RHFTextField name="advance" label="Advance" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create VSO' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid> */}
      </FormProvider>
      {/* <MedicineDetails currentUser={currentUser} isEdit={isEdit} />
      <SampleDetails currentUser={currentUser} isEdit={isEdit} /> */}
    </Stack>
  );
}
