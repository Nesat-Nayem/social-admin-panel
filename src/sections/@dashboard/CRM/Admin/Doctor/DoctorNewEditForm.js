import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  Select,
  ListItemText,
  Checkbox,
} from '@mui/material';
import { useDeleteMaster, useGetCity, useGetMaster } from 'services/Master.Services';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { CombinedMultiSelect } from 'components/hook-form/RHFSelect';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from 'components/upload';
import moment from 'moment';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

DoctorNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  save: PropTypes.func,
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Manager', 'VSO'];
export default function DoctorNewEditForm({ isEdit = false, currentUser, save }) {
  const [personName, setPersonName] = useState([]);
  const [handleby, sethandleby] = useState('');
  console.log(handleby);
  useEffect(() => {
    const namesString = personName.join(', ');
    sethandleby(namesString);
  }, [personName]);
  const { data, isLoading } = useGetCity('all-citys');
  console.log(data);
  const _sampleList =
    data?.message?.map((sample) => ({
      id: sample?.id,
      city: sample?.cityname,
    })) || [];
  console.log(_sampleList);
  const handleByChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const [cv, setCv] = useState(null);
  const [adharCard, setAdharCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const NewDoctorSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    id: Yup.string().required('Id is required'),
    dob: Yup.string().required('Date of Birth is required'),
    password: isEdit
      ? Yup.string()
      : Yup.string().required('Password is required').min(6, 'Password Should be atlest 6 digit'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    city_id: Yup.string().required('City is required'),
    // handle_by: Yup.string().required('handle by is required'),
    doctor_type: Yup.string().required('Doctor Type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      name: currentUser?.name || '',
      dob: Date(currentUser?.dob) || '',
      password: currentUser?.password || '',
      image: currentUser?.image || '',
      route: currentUser?.route || '',
      phone: currentUser?.phone || '',
      email: currentUser?.email || '',
      address: currentUser?.address || '',
      qualification: currentUser?.qualification || '',
      pan_card_no: currentUser?.pan_card_no || '',
      adhar_card_no: currentUser?.adhar_card_no || '',
      adhar_card_image: currentUser?.adhar_card_image || '',
      pan_card_image: currentUser?.pan_card_image || '',
      designation: currentUser?.designation || '',
      cv: currentUser?.cv || '',
      account_number: currentUser?.account_number || '',
      account_holder_name: currentUser?.account_holder_name || '',
      bank_name: currentUser?.bank_name || '',
      ifsc_code: currentUser?.ifsc_code || '',
      area: currentUser?.area || '',
      doctor_type: currentUser?.doctor_type || '',
      handle_by: handleby,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, handleby]
  );

  const methods = useForm({
    resolver: yupResolver(NewDoctorSchema),
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

  console.log({ errors, values });

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (formData) => {
    try {
      const { adhar_card_image, pan_card_image, cv: CV, image } = formData;
      if (formData.dob) {
        formData.dob = moment(formData.dob).format('MM/DD/YYYY');
      }
      if (
        typeof adhar_card_image === 'string' ||
        typeof pan_card_image === 'string' ||
        typeof CV === 'string' ||
        typeof image === 'string'
      ) {
        delete formData.adhar_card_image;
        delete formData.pan_card_image;
        delete formData.cv;
        delete formData.image;
      }
  
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      save(formData);
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
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const DOCTOR_TYPES = [
    {
      value: 'doctor',
      label: 'Doctor',
    },
    {
      value: 'special',
      label: 'Special',
    },
    {
      value: 'retaile',
      label: 'Retailer',
    },
  ];
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 50); // 50 years ago
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18); // 18 years ago

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
                  name="image"
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
                <RHFSelect name="doctor_type" label="Client Type">
                  {DOCTOR_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <CombinedMultiSelect
                  name="handle_by"
                  label="Handle By"
                  options={names.map((name) => ({ value: name, label: name }))}
                  value={personName}
                  onChange={handleByChange}
                  MenuProps={MenuProps}
                />

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

                {/* <RHFTextField name="route" label="Route" /> */}
                <RHFSelect name="city_id" label="city">
                  {_sampleList.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.city}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFTextField
                  name="address"
                  label="Address"
                  inputProps={{
                    maxLength: 6,
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Stack>

      <Stack alignItems="center" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting} size="large">
          {!isEdit ? 'Create Doctor' : 'Save Changes'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
