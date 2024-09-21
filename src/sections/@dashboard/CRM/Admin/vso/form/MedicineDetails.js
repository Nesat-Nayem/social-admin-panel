import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper } from '@mui/material';
import FormProvider from 'components/hook-form/FormProvider';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateItem, useGetMaster, useGetUpdateStock } from 'services/Master.Services';
import * as Yup from 'yup';
import MedicineForm from './MedicineForm';

MedicineDetails.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  // create: PropTypes.func,
  // update: PropTypes.func,
};

function MedicineDetails({ currentUser, isEdit }) {
  const { data: Medicine, isLoading } = useGetMaster('medicin-name');
  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('medicine');
  const {
    update,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    errorMessages: isUpdateErrorMessages,
  } = useGetUpdateStock('medicine');
  const { enqueueSnackbar } = useSnackbar();

  const MedicineSchema = Yup.object().shape({
    id: !isEdit && Yup.string().required('VSO Id is required'),
    medicines: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Medicine name is required'),
        quantity: Yup.number().required('Quantity is required').nullable(),
        // vso_id: Yup.string().required('Vso id is required'),
      })
    ),
  });

  useEffect(() => {
    if (isUpdateSuccess) {
      enqueueSnackbar('Medicine Update Successfully!');
    }
    if (isUpdateError) {
      Object.keys(isUpdateErrorMessages).forEach((field) => {
        const messages = isUpdateErrorMessages[field].join(', ');
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isUpdateSuccess, isUpdateError, enqueueSnackbar, isUpdateErrorMessages]);

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Medicine Create Successfully!');
    }
    if (isError) {
      // enqueueSnackbar('Failed to perform the operation', { variant: 'error' });
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        // enqueueSnackbar(`${field}: ${messages}`, { variant: 'error' });
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, errorMessages]);

  const MEDICINE_OPTIONS = Medicine?.map((medicine) => ({
    value: medicine.id,
    label: medicine.name,
  }));

  const defaultValuesMedicine =
    currentUser?.medicines.length > 1 &&
    currentUser?.medicines?.map((medicine) => ({
      name: medicine.name,
      quantity: medicine.quantity,
      vso_id: medicine.vso_id,
      id: medicine.id,
    }));

  console.log('defaultValuesMedicine', defaultValuesMedicine);

  const defaultValues = useMemo(
    () => ({
      id: currentUser ? currentUser?.id : '',
      medicines:
        currentUser?.medicines.length > 1
          ? currentUser?.medicines
          : [
              {
                name: '',
                quantity: '',
              },
            ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser?.id, defaultValuesMedicine]
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(MedicineSchema),
  });
  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const handleCreateAndSend = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (currentUser) {
        await update(data);
      } else {
        await createItem(data);
      }
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
          MEDICINE_OPTIONS={MEDICINE_OPTIONS}
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

export default MedicineDetails;
