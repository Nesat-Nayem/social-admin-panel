import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'components/hook-form/FormProvider';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useCreateItem } from 'services/Master.Services';
import * as Yup from 'yup';
import SpecialGiftNewForm from './SpecialGiftNewForm';

SpecialGiftForm.propTypes = {
  doctor_id: PropTypes.string,
  setOpen: PropTypes.func,
};

const SpecialGiftSchema = Yup.object().shape({
  gift: Yup.array().of(
    Yup.object().shape({
      gift_name: Yup.string().required('Coupon name is required'),
      quantity: Yup.string().required('Quantity is required').nullable(),
      point: Yup.string(),
    })
  ),
});

function SpecialGiftForm({ doctor_id, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();

  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('spcial-gift');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Special Gift Successfully!');
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
      gift: [{ gift_name: '', quantity: '', point: '' }],
    },
    resolver: yupResolver(SpecialGiftSchema),
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
      <SpecialGiftNewForm doctor_id={doctor_id} isSuccess={isSuccess} />
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
export default SpecialGiftForm;
