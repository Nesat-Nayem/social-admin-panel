import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper } from '@mui/material';
import FormProvider from 'components/hook-form/FormProvider';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  useCreateItem,
  useGetMaster,
  useGetUpdateStock,
  useUpdateStock,
} from 'services/Master.Services';
import * as Yup from 'yup';
import MedicineForm from './MedicineForm';
import SampleForm from './SampleForm';

SampleStockForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

function SampleStockForm({ currentUser, isEdit }) {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    // defaultValues,
    // resolver: yupResolver(MedicineSchema),
  });
  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const {
    update,
    isLoading,
    isSuccess,
    isError,
    error: updateError,
    errorMessages,
  } = useUpdateStock('sample');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Samples Update Successfully!');
    }
    if (isError) {
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, errorMessages]);

  const handleSampleUpdate = async (data) => {
    // console.log('data samples', data);
    try {
      await update(data);
      reset();
      console.log('STEPDATA', JSON.stringify(data, null, 2));
      // console.log('STEPDATA', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const v_id = watch('id');

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <FormProvider methods={methods}>
        <SampleForm
          //   MEDICINE_OPTIONS={MEDICINE_OPTIONS}
          currentUser={currentUser}
          v_id={v_id}
          isEdit={isEdit}
        />
        <Box width="100%" sx={{ mt: 3 }} textAlign="center">
          <Button
            size="large"
            loading={isSubmitting}
            onClick={handleSubmit(handleSampleUpdate)}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </FormProvider>
    </Paper>
  );
}

export default SampleStockForm;
