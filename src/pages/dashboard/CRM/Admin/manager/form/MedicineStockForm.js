import { Box, Button, Paper } from '@mui/material';
import FormProvider from 'components/hook-form/FormProvider';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateStock } from 'services/Master.Services';
import MedicineForm from './MedicineForm';

MedicineStockForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

function MedicineStockForm({ currentUser, isEdit }) {
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
  } = useUpdateStock('medicine');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Medicine Update Successfully!');
    }
    if (isError) {
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, errorMessages]);

  const handleCreateAndSend = async (data) => {
    // console.log('data medicine', data);
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
        <MedicineForm
          //   MEDICINE_OPTIONS={MEDICINE_OPTIONS}
          currentUser={currentUser}
          v_id={v_id}
          isEdit={isEdit}
        />
        <Box width="100%" sx={{ mt: 3 }} textAlign="center">
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
    </Paper>
  );
}

export default MedicineStockForm;
