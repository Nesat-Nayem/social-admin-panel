import { LoadingButton } from '@mui/lab';
import { Box, Grid, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { RHFSelect } from 'components/hook-form';
import FormProvider from 'components/hook-form/FormProvider';
import { Upload } from 'components/upload';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

function DocumentDetail() {
  const [file, setFile] = useState(null);
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
  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);
  const DOCUMENT_OPTION = [
    { label: 'Adhar', value: 'adhar' },
    { label: 'Pan', value: 'pan' },
  ];
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upload Document
        </Typography>

        <Grid container spacing={3} justifyContent="flex-end">
          <Grid item xs={12} md={8}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <Stack direction="column" spacing={2}>
                <RHFSelect name="role" label="Document Type">
                  {DOCUMENT_OPTION.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <Upload file={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
              </Stack>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Upload CV
              </Typography>
              <Upload file={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
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

export default DocumentDetail;
