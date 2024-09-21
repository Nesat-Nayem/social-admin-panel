import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { Upload } from 'components/upload';

import { useGetMaster, usePatchMaster } from 'services/Master.Services';
import FormProvider, {
  RHFAutocomplete,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../../components/hook-form';

// const TAGS_OPTION = [
//   'Toy Story 3',
//   'Logan',
//   'Full Metal Jacket',
//   'Dangal',
//   'The Sting',
//   '2001: A Space Odyssey',
//   "Singin' in the Rain",
//   'Toy Story',
//   'Bicycle Thieves',
//   'The Kid',
//   'Inglourious Basterds',
//   'Snatch',
//   '3 Idiots',
// ];

// ----------------------------------------------------------------------

ManagerNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  save: PropTypes.func,
};

export default function ManagerNewEditForm({ isEdit = false, currentUser, save }) {
  const NewUserSchema = Yup.object().shape({
    id: Yup.string().required('ID is required'),
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
  });

  console.log('vso ids', currentUser?.manage_vso);

  const { patchMaster, error: patcherror } = usePatchMaster(`manager/${currentUser?.id}`);

  console.log('patch error', patcherror);

  const [cv, setCv] = useState(null);
  const [adharCard, setAdharCard] = useState(null);

  const { data: masterData, isLoading } = useGetMaster('vso');

  const ids = masterData?.map((item) => item.id);

  // console.log("vso test",ids)

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      name: currentUser?.name || '',
      password: currentUser?.password || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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

  const handleButtonClick = () => {
    const metaKeywordsValue = watch('metaKeywords');

    const formattedData = {
      manage_vso: metaKeywordsValue,
    };

    patchMaster(formattedData, {
      onSuccess: () => {
        // Refresh the page on successful update
        window.location.reload();
      },
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={3}>
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
                {/* <RHFTextField name="address" label="Address" /> */}
                {/* <RHFTextField name="reportingmanager" label="Manager Name" /> */}
                {/* <RHFTextField name="qualification" label="Qualification" />
                <RHFTextField name="headoffice" label="Head Office" />
                <RHFTextField name="adhar_card_no" label="Adhar Card No" />
                <RHFTextField name="pan_card_no" label="Pan Card No" /> */}
              </Box>
            </Grid>
          </Grid>
        </Paper>
        {/* <Paper elevation={3} sx={{ p: 3 }}>
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
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
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
          {!isEdit ? 'Create Manager' : 'Save Changes'}
        </LoadingButton>
      </Stack>

      {currentUser?.manage_vso && currentUser?.manage_vso.length > 0 && (
        <Stack sx={{ mt: 3 }}>
          <Paper>
            <Grid>
              <Box>
                <RHFAutocomplete
                  name="metaKeywords"
                  label="VSO ID"
                  multiple
                  freeSolo
                  options={ids?.map((option) => option)}
                  ChipProps={{ size: 'small' }}
                  defaultValue={currentUser?.manage_vso}
                />

                {/* Button to trigger the action */}
                <LoadingButton
                  sx={{ mt: 2 }}
                  onClick={handleButtonClick}
                  variant="contained"
                  size="large"
                >
                  Update
                </LoadingButton>
              </Box>
            </Grid>
          </Paper>
        </Stack>
      )}
    </FormProvider>
  );
}
