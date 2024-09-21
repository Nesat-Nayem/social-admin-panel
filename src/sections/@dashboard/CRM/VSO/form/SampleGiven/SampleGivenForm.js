import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'components/hook-form/FormProvider';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useCreateItem } from 'services/Master.Services';
import * as Yup from 'yup';
import SampleGivenNewForm from './SampleGivenNewForm';

SampleGivenForm.propTypes = {
  doctor_id: PropTypes.string,
  setOpen: PropTypes.func,
};

const SampleSchema = Yup.object().shape({
  sampleGiven: Yup.array().of(
    Yup.object().shape({
      sample_name: Yup.string().required('Coupon name is required'),
      quantity: Yup.string().required('Quantity is required').nullable(),
      point: Yup.string(),
    })
  ),
});

function SampleGivenForm({ doctor_id, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();

  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('sample-given');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Sample Given Successfully!');
      setOpen(false);
    }
    if (isError) {
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, errorMessages, setOpen]);

  const methods = useForm({
    defaultValues: {
      sampleGiven: [{ sample_name: '', quantity: '', point: '' }],
    },
    resolver: yupResolver(SampleSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('STEPDATA', JSON.stringify(data, null, 2));
      createItem(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <SampleGivenNewForm doctor_id={doctor_id} />
      <Box display="flex" justifyContent="flex-end" m={2}>
        <Button
          size="large"
          loading={isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </FormProvider>
  );
}
export default SampleGivenForm;
