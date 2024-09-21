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
import useSWR from 'swr';
import RHFDatePicker from 'components/hook-form/RHFDatePicker';
import { CombinedMultiSelect } from 'components/hook-form/RHFSelect';
import PropTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Upload } from 'components/upload';
import moment from 'moment';
import { API } from 'services/API';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

City.propTypes = {
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
export default function City({ isEdit = false, currentUser, save }) {
  const [cityname, setCityname] = useState('');

  // console.log(data);

  const [personName, setPersonName] = useState([]);

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
    qualification: Yup.string().required('Qualification is required'),
    adhar_card_no: Yup.string().required('Adhar Card No is required'),
    pan_card_no: Yup.string().required('Pan Card No is required'),
    adhar_card_image: Yup.mixed().required('Adhar Card is required'),
    designation: Yup.string().required('Designation is required'),
    route: Yup.string().required('Route is required'),
    cv: Yup.mixed().required('CV is required'),
    account_number: Yup.string().required('Account Number is required'),
    account_holder_name: Yup.string().required('Account Holder Name is required'),
    bank_name: Yup.string().required('Bank Name is required'),
    ifsc_code: Yup.string().required('IFCS Code is required'),
    area: Yup.string().required('Area is required'),
    doctor_type: Yup.string().required('Doctor Type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      name: currentUser?.name || '',
      dob: currentUser?.dob || '',
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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
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
      // Construct formData object
      const formDatas = {
        cityname,
      };

      await API.post('api/citys', formDatas)
        .then((responce) => {
          console.log(responce);
        })
        .catch((error) => {
          // if (error.response.data.error.sample_id) {
          //   setShowError(true);
          //   setTimeout(() => {
          //     setShowError(false);
          //   }, 5000);
          // } else {
          console.log('error: ', error);
          // }
        });
    } catch (submitError) {
      console.error(submitError);
    }
  };

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 50); // 50 years ago
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18); // 18 years ago

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack direction="column" gap={3}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create Distric
          </Typography>

          <Grid container spacing={3}>
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
                  name="cityname"
                  label="District name"
                  onInput={(e) => setCityname(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Stack>

      <Stack alignItems="center" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting} size="large">
          {!isEdit ? 'Create city' : 'Save Changes'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
