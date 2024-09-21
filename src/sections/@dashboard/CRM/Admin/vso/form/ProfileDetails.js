import { LoadingButton } from '@mui/lab';
import { Grid, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { RHFTextField, RHFUploadAvatar } from 'components/hook-form';
import FormProvider from 'components/hook-form/FormProvider';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

function ProfileDetail() {
  // const { isSuccess, isError, errorMessages } = useCreateMaster('vso');
  // const {
  //   update,
  //   isSuccess: updateSuccess,
  //   isError: updateError,
  //   errorMessages: updateErrorMessages,
  // } = useUpdateMaster('vso');

  const { enqueueSnackbar } = useSnackbar();

  // const NewVsoSchema = Yup.object().shape({});
  const defaultValues = useMemo(
    () => ({}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    // resolver: yupResolver(NewVsoSchema),
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

  const onSubmit = async (data) => {
    try {
      if (data.dob) {
        data.dob = moment(values.dob).format('MM/DD/YYYY');
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      // if (isEdit) {
      //   update(data);
      // } else {
      //   create(data);
      // }
    } catch (error) {
      console.error(error);
    }
  };
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 50); // 50 years ago
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18); // 18 years ago
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
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
              />
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFDatePicker
                name="dob"
                label="Date of Birth"
                control={control}
                defaultValue={null}
              />
              <RHFTextField name="password" label="Password" />
              <RHFTextField name="zipCode" label="Zip/Code" />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="reportingmanager" label="Manager Name" />
              <RHFTextField name="headoffice" label="Head Office" />
              <RHFTextField name="addharCardNo" label="Adhar Card No" />
              <RHFTextField name="panCardNo" label="Pan Card No" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {/* {!isEdit ? 'Create Manager' : 'Save Changes'} */}
                Save
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
}

export default ProfileDetail;
