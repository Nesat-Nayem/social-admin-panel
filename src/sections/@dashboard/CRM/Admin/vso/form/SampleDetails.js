import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper } from '@mui/material';
import FormProvider from 'components/hook-form/FormProvider';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateItem, useGetMaster, useGetUpdateStock } from 'services/Master.Services';
import * as Yup from 'yup';
import SampleForm from './SampleForm';

SampleDetails.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  // create: PropTypes.func,
  // update: PropTypes.func,
};

function SampleDetails({ currentUser, isEdit }) {
  const { data: Sample, isLoading } = useGetMaster('sample-name');
  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('sample');
  const {
    update,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    errorMessages: isUpdateErrorMessages,
  } = useGetUpdateStock('sample');

  const { enqueueSnackbar } = useSnackbar();

  const SampleSchema = Yup.object().shape({
    id: !isEdit && Yup.string().required('VSO Id is required'),
    samples: Yup.array().of(
      Yup.object().shape({
        samplename: Yup.string().required('Sample name is required'),
        samplequantity: Yup.number().required('Quantity is required').nullable(),
        vsoid: Yup.string(),
      })
    ),
  });

  useEffect(() => {
    if (isUpdateSuccess) {
      enqueueSnackbar('Sample Update Successfully!');
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
      enqueueSnackbar('Sample Create Successfully!');
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

  const SAMPLE_OPTIONS = Sample?.map((sample) => ({
    value: sample.id,
    label: sample.name,
  }));

  const defaultValuesSAMPLE =
    currentUser?.samples?.map((sample) => ({
      samplename: sample.samplename,
      samplequantity: sample.samplequantity,
      vsoid: sample.vsoid,
      id: sample.id,
    })) || [];

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      samples: defaultValuesSAMPLE,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(SampleSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const v_id = watch('id');
  const handleCreateAndSend = async (data) => {
    console.log('data tt', data);
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   if (currentUser) {
    //     await update(data);
    //   } else {
    //     await createItem(data);
    //   }

    //   reset();
    //   console.log('STEPDATA', JSON.stringify(data, null, 2));
    //   // console.log('STEPDATA', JSON.stringify(data));
    // } catch (error) {
    //   console.error(error);
    // }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <FormProvider methods={methods}>
        <SampleForm
          MEDICINE_OPTIONS={SAMPLE_OPTIONS}
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

export default SampleDetails;
