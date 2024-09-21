import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import FormProvider from 'components/crm-hook-form/FormProvider';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from 'auth/useAuthContext';
import CRMRadioGroup from 'components/crm-hook-form/CRMRadioGroup';
import CRMTextField from 'components/crm-hook-form/CRMTextField';
import CRMTextFieldSmall from 'components/crm-hook-form/CRMTextFieldSmall';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { PATH_AUTH, PATH_DASHBOARD } from 'routes/paths';
import ManagerDialogbox from '../list/ManagerDialogbox';

VisitReportExpensesGenerationNewEditForm.propTypes = {
  type: PropTypes.string,
};

function VisitReportExpensesGenerationNewEditForm({ type }) {
  const [open, setOpen] = useState(false);
  const VisitReportExpensesSchema = Yup.object().shape({});
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { user, logout } = useAuthContext();

  const defaultValues = useMemo(
    () => ({}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const methods = useForm({
    resolver: yupResolver(VisitReportExpensesSchema),
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
      // if (type === 'start') {
      //   console.log('DATA', type);
      //   navigate(PATH_DASHBOARD.manager.transaction);
      // }

      // pageFor
      //   enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      //   navigate(PATH_DASHBOARD.user.list);
      //   console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };
  const [openPopover, setOpenPopover] = useState(null);

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };
  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <CRMTextFieldSmall name="visiting" label="Enter ID NO. WITH WHOM YOU ARE VISITING" />
            <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {type === 'start' ? (
                <CRMTextField name="start_km" placeholder="START KM" bgColor="#8faadc" />
              ) : (
                <CRMTextField name="end_km" placeholder="END KM" bgColor="#8faadc" />
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
          >
            <Box textAlign="center">
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                DATE: 26-12-2023
              </Typography>
            </Box>
            <Card
              sx={{
                backgroundColor: 'primary.light',
                // width: { xs: '100%', sm: '100%', md: 'fit-content' },
                pl: 2,
              }}
            >
              <CRMRadioGroup
                name="travelType"
                options={[
                  { label: 'VSO CAR', value: 'vso_car' },
                  { label: 'VSO MOTOR CYCLE', value: 'vso_motor_cycle' },
                  { label: 'SELF CAR', value: 'self_car' },
                  { label: 'SELF MOTOR CYCLE', value: 'self_motor_cycle' },
                  { label: 'MISCELLANEOUS', value: 'miscellaneous' },
                ]}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={6}>
            <CRMTextFieldSmall
              name="per_km_car_allowance"
              label="PER KM CAR ALLOWANCE"
              defaultValue={20}
              readOnly="true"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CRMTextFieldSmall
              name="per_km_motor_cycle_allowance"
              label="PER KM MOTOR CYCLE ALLOWANCE"
              defaultValue={10}
              readOnly="true"
            />
          </Grid>
        </Grid>
        <Box mt={2} pl={2} fontSize="13px">
          <ul style={{ marginTop: '20px' }}>
            <li>Manager has to enter km manually as well as take snap of METER DISPLAY </li>
            <li>NO DA for manager </li>
            <li>
              Miscellaneous amount is when field officers are available public transport, hotel, or
              expenditure due to client entertainment.
            </li>
          </ul>
        </Box>

        <Stack justifyContent="center" alignItems="center" mt={2}>
          {type === 'start' ? (
            <Button
              variant="contained"
              sx={{
                width: 'fit-content',
                // mt: '20px',
                mt: type === 'start' ? '4.6rem' : '10px',
                px: '45px',
                py: '6px',
                color: '#000',
                backgroundColor: '#8faadc !important',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => {
                // navigate('/dashboard/end');
                navigate(PATH_DASHBOARD.manager.visitentry);
              }}
            >
              START YOUR DAY
              <Box
                sx={{
                  fontFamily: 'Dancing Script !important',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Good Luck
              </Box>
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                width: 'fit-content',
                // mt: '20px',
                mt: type === 'start' ? '4.6rem' : '10px',
                px: '45px',
                py: '6px',
                color: '#000',
                backgroundColor: '#8faadc !important',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              LET US CALL IT A DAY
              <Box
                sx={{
                  fontFamily: 'Dancing Script !important',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Have a great time
              </Box>
            </Button>
          )}
          <ManagerDialogbox open={open} setOpen={setOpen} />

          {/* {type === 'end' && (
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
              onClick={handleLogout}
            >
              {' '}
              Log Out
            </Button>
          )} */}
        </Stack>
      </FormProvider>
    </div>
  );
}

export default VisitReportExpensesGenerationNewEditForm;
