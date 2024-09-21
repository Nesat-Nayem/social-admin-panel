import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from 'components/hook-form/FormProvider';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useCreateItem } from 'services/Master.Services';
import * as Yup from 'yup';
import CouponSettledNewForm from './CouponSettledNewForm';

CouponSettledForm.propTypes = {
  doctor_id: PropTypes.string,
  setOpen: PropTypes.func,
};

const CouponSettledSchema = Yup.object().shape({
  copons_settled: Yup.array().of(
    Yup.object().shape({
      copon_name: Yup.string().required('Coupon name is required'),
      quantity: Yup.string().required('Quantity is required').nullable(),
      point: Yup.string(),
    })
  ),
});

function CouponSettledForm({ doctor_id, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();

  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('settle-copons');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Coupon Settled Successfully!');
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
      copons_settled: [{ copon_name: '', quantity: '', point: '' }],
    },
    resolver: yupResolver(CouponSettledSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = async (data) => {
    try {
      createItem(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <CouponSettledNewForm doctor_id={doctor_id} isSuccess={isSuccess} />
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
export default CouponSettledForm;
