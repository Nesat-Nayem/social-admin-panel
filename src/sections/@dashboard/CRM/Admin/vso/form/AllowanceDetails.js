import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { RHFTextField } from 'components/hook-form';
import FormProvider from 'components/hook-form/FormProvider';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

function AllowanceDetails() {
  const defaultValues = useMemo(
    () => ({}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    // resolver: yupResolver(NewVsoSchema),
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

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      // if (isEdit) {
      //   update(data);
      // } else {
      //   create(data);
      // }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ p: 3 }}>
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

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {/* {!isEdit ? 'Create Manager' : 'Save Changes'} */}
                Save
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
}

export default AllowanceDetails;
