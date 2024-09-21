import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
// form
import CRMTextField from 'components/crm-hook-form/CRMTextField';
import FormProvider from 'components/crm-hook-form/FormProvider';
import { RHFCheckbox } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { setVsoDoctorVisit, setVsoStep } from 'redux/slices/VSO';
import { dispatch } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { useGetMaster } from 'services/Master.Services';
import VsoTable from '../list/VsoTable';

VisitReportEntryNewEditForm.propTypes = {};
function VisitReportEntryNewEditForm() {
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const methods = useForm({
    defaultValues,
  });
  const AREA_OPTION = [
    { label: 'Pune', value: 'pune' },
    { label: 'Mumbai', value: 'mumbai' },
  ];

  const ROUTE_OPTION_PUNE = [
    { label: 'Kharadi', value: 'kharadi' },
    { label: 'Vimannagar', value: 'vimannagar' },
    { label: 'Hadapsar', value: 'hadapsar' },
    { label: 'Wagholi', value: 'wagholi' },
    { label: 'Yarwada', value: 'yarwada' },
    { label: 'Vishrantwadi', value: 'vishrantwadi' },
    { label: 'Band Garden', value: 'bandgarden' },
    { label: 'Pune station', value: 'punestation' },
    { label: 'Pimpri', value: 'pimpri' },
    { label: 'Pimpri Chinchwad', value: 'pimprichinchwad' },
    { label: 'Wakad', value: 'wakad' },
    { label: 'Hinjewadi', value: 'hinjewadi' },
    { label: 'Kothrud', value: 'kothrud' },
    { label: 'Kalewadi', value: 'kalewadi' },
    { label: 'Sinhagad', value: 'sinhagad' },
    { label: 'Katraj', value: 'katraj' },
    { label: 'Swargate', value: 'swargate' },
  ];

  const ROUTE_OPTION_MUMBAI = [
    { label: 'Andheri', value: 'andheri' },
    { label: 'Bandra', value: 'bandra' },
    { label: 'Borivali', value: 'borivali' },
    { label: 'Chembur', value: 'chembur' },
    { label: 'Colaba', value: 'colaba' },
    { label: 'Dadar', value: 'dadar' },
    { label: 'Dharavi', value: 'dharavi' },
    { label: 'Goregaon', value: 'goregaon' },
    { label: 'Juhu', value: 'juhu' },
    { label: 'Kurla', value: 'kurla' },
    { label: 'Malad', value: 'malad' },
    { label: 'Matunga', value: 'matunga' },
    { label: 'Powai', value: 'powai' },
    { label: 'Santacruz', value: 'santacruz' },
    { label: 'Sion', value: 'sion' },
    { label: 'Vashi', value: 'vashi' },
    { label: 'Versova', value: 'versova' },
    { label: 'Worli', value: 'worli' },
  ];

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  // console.log('values', values);
  const id = values && values?.doc_id && values?.doc_id;

  const { data: DOCTOR_DATA, isLoading } = useGetMaster('doctor');

  const filteredData = DOCTOR_DATA && DOCTOR_DATA?.filter((item) => item?.id === id);

  const ROUTE_OPTION = values.area === 'pune' ? ROUTE_OPTION_PUNE : ROUTE_OPTION_MUMBAI;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate('/dashboard/visit-exit');
      dispatch(setVsoDoctorVisit(true));
      dispatch(setVsoStep(2));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const AREA = filteredData?.length > 0 && filteredData[0]?.area;
  const ROUTE = filteredData?.length > 0 && filteredData[0]?.route;

  const DOCTOR = values?.doc_id;

  // console.log('DOOR', !!id, DOCTOR, ROUTE, AREA);
  // console.log('doctor data', filteredData);

  useEffect(() => {
    if (!!id && (AREA || ROUTE)) {
      setValue('area', AREA);
      setValue('route', ROUTE);
    } else {
      // Reset the area and route values if id is not present
      setValue('area', '');
      setValue('route', '');
    }
  }, [id, AREA, ROUTE, setValue]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} px={{ xs: 2, sm: 2, md: 2 }} mt={2}>
          <Grid item xs={12} md={6}>
            <CRMTextField
              name="doc_id"
              placeholder="Doctor ID"
              bgColor="#2f5597"
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CRMTextField
              name="area"
              placeholder="Taluka"
              bgColor="#2f5597"
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {/* <Grid item xs={6} md={6}>
          <CRMSelect name="area" placeholder="Enter Area" bgColor="#dae3f3">
            {AREA_OPTION.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </CRMSelect>
        </Grid> */}
          <Grid item xs={12} md={6}>
            <CRMTextField
              name="route"
              placeholder="place"
              bgColor="#b4c7e7"
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* <Grid item xs={6} md={6}>
          <CRMSelect name="route" placeholder="Enter Route" bgColor="#dae3f3">
            {ROUTE_OPTION.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </CRMSelect>
        </Grid> */}
          {/* <Grid item xs={6} md={6}>
          <CRMTextField name="doc_name" placeholder="Doctor Name" bgColor="#b4c7e7" />
        </Grid> */}

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                backgroundColor: 'primary.dark',
              }}
            >
              <RHFCheckbox
                name="previous_report"
                label="Previous Report"
                sx={{
                  p: 0,
                  m: 0,
                }}
              />
              <RHFCheckbox
                name="current_report"
                label="Current Report"
                sx={{
                  p: 0,
                  m: 0,
                }}
              />
            </Card>
          </Grid>
        </Grid>
        {/* <Grid
        container
        spacing={1.5}
        direction="row"
        mt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={5}>
          <CRMTextFieldSmall name="doctor_list" label="Doctor List" defaultValue="All" />
        </Grid>
        <Grid item xs={12} md={3}>
          <CRMTextField name="code" placeholder="Enter Code" bgColor="#fff" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: 'primary.light',
            }}
          >
            <RHFCheckbox
              name="previous_report"
              label="Previous Report"
              sx={{
                p: 0,
                m: 0,
              }}
            />
            <RHFCheckbox
              name="current_report"
              label="Current Report"
              sx={{
                p: 0,
                m: 0,
              }}
            />
          </Card>
        </Grid>
      </Grid> */}
        <Stack>
          <VsoTable filteredData={filteredData && filteredData} />
        </Stack>
        {/* <ul style={{ marginTop: '20px', paddingLeft: '20px', fontSize: '13px' }}>
          <li>Birthday shall highlighted if current month or immediate next month</li>
          <li>VSO has to select the MANAGER ID whether he is present in this call or not.</li>
          <li>
            VSO will click on the doctor code and he will directed to the DOCTOR TRANSACTION PAGE
          </li>
          <li>End of the day he will submit the report</li>
        </ul>{' '} */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Button
            variant="outlined"
            sx={{
              px: '45px',
              py: '18px',
              mt: '20px',
            }}
            onClick={() => navigate(PATH_DASHBOARD.vso.visit)}
          >
            {' '}
            Go Back
          </Button>

          <Button
            variant="contained"
            sx={{
              width: 'fit-content',
              mt: '20px',
              px: '45px',
              py: '6px',
              color: '#000',
              backgroundColor: '#8faadc !important',
              display: 'flex',
              flexDirection: 'column',
            }}
            type="submit"
            // onClick={() => navigate('/dashboard/visit-exit')}
          >
            SUBMIT THE DAY
            <Box
              sx={{
                fontFamily: 'Dancing Script !important',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              Your effort is appreciated
            </Box>
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}

export default VisitReportEntryNewEditForm;
