/* eslint-disable no-unused-vars */
import { Box, Button, Card, FormLabel, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from 'auth/useAuthContext';
import CRMRadioGroup from 'components/crm-hook-form/CRMRadioGroup';
import CRMTextField from 'components/crm-hook-form/CRMTextField';
import CRMTextFieldSmall from 'components/crm-hook-form/CRMTextFieldSmall';
import FormProvider from 'components/crm-hook-form/FormProvider';
import { RHFUploadBox } from 'components/hook-form';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setVsoStartVisit, setVsoStep, setVsoVisit } from 'redux/slices/VSO';
import ManagerIdForm from './ManagerIdForm';

VisitReportExpensesNewEditFrom.propTypes = {
  allowanceData: PropTypes.array,
  isLoading: PropTypes.bool,
};
function VisitReportExpensesNewEditFrom({ allowanceData, isLoading }) {
  const [selectedIds, setSelectedIds] = useState([]);

  // Handler function to update selected IDs
  const handleIdChange = (newSelectedIds) => {
    setSelectedIds(newSelectedIds);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectCar, setSelectedCar] = useState('');
  const [CarKm, setCarKM] = useState(1);
  const [checked, setChecked] = useState(false);
  console.log(selectedOption);

  const todayDate = new Date();
  const formattedDate = moment(todayDate).format('DD-MM-YYYY');
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [managerVisitingCount, setManagerVisitingCount] = useState(1);
  const { vso, isVsoStartVisit } = useSelector((state) => state?.vso);

  const matchVsoId = vso?.visitor_id === user?.id && isVsoStartVisit;
  console.log("allowance data",{ allowanceData });

  const CarAllowance = allowanceData?.filter((item) => item?.category === 'SELF CAR');
  const MotorCycleAllowance = allowanceData?.filter((item) => item?.category === 'SELF MOTOR CYCLE');

  const car = parseInt(CarAllowance?.[0]?.allowance, 10);
  const motorCycle = parseInt(MotorCycleAllowance?.[0]?.allowance, 10);

  // console.log({ KKK: vso, isVsoStartVisit });
  const navigate = useNavigate();
  const VisitReportSchema = Yup.object().shape({
    noOfVisitor: Yup.number()
      .max(3, 'Minimum 3')
      .typeError('Number of visitors must be a valid number')
      .nullable(),
    start_Km: Yup.string().when('car_select', {
      is: (car_select) =>
        car_select !== 'mgr_car' &&
        car_select !== 'mgr_motor_cycle' &&
        car_select !== 'miscellaneous',
      then: Yup.string().required('Start Km is required').min(1, 'Minimum 1'),
    }),
    start_Km_img: Yup.string().when('car_select', {
      is: (car_select) =>
        car_select !== 'mgr_car' &&
        car_select !== 'mgr_motor_cycle' &&
        car_select !== 'miscellaneous',
      then: Yup.string().required('Meter Display is required'),
    }),
    car_select: Yup.string().required('Car Select is required'),
    manager_id: Yup.array().of(
      Yup.object().shape({
        ele: Yup.string().required('Manager id is required'),
      })
    ),
  });
  const handleManagerVisitingChange = (event) => {
    setManagerVisitingCount(event.target.value);
  };
  const defaultValues = useMemo(
    () => ({
      noOfVisitor: matchVsoId ? vso?.noOfVisitor : 1,
      start_Km: matchVsoId ? vso?.start_Km : '',
      start_Km_img: matchVsoId ? vso?.start_Km_img : '',
      // visitor_id_1: matchVsoId ? vso?.visitor_id_1 : '',
      car_select: matchVsoId ? vso?.car_select : '',
      manager_id: matchVsoId ? vso?.manager_id : [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchVsoId, vso]
  );
  const methods = useForm({
    resolver: yupResolver(VisitReportSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
    trigger,
  } = methods;

  const values = watch();
  const isManagerVehicle =
    values?.car_select === 'mgr_car' || values?.car_select === 'mgr_motor_cycle';

  // console.log({ values, errors });
  const START_KM_IMG = values && values?.start_Km_img;
  // const preview = (values?.start_Km_img && values?.start_Km_img.path) || vso?.start_Km_img;
  const startKmPreview = JSON.stringify(values?.start_Km_img || (matchVsoId && vso?.start_Km_img));

  // console.log({ startKmPreview: vso?.start_Km_img });

  const onSubmit = async (data) => {
    try {
      const noOfVisitor = values?.noOfVisitor;
      const formData = {
        // ...data,
        noOfVisitor,
        car_select: selectCar,
        start_Km: CarKm,
        manager_id: Array.isArray(selectedIds) ? selectedIds : [],
        start_Km_img: START_KM_IMG,
        visitor_id: user?.id,
      };
      new Promise((resolve) => {
        localStorage.setItem('vso', JSON.stringify(formData));
        resolve();
      })
        .then(() => {
          console.log('data submited');
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
      dispatch(setVsoVisit(formData));
      localStorage.setItem('vso', JSON.stringify(formData));
      // reset();
      navigate('/dashboard/vso-visit-entry');
      dispatch(setVsoStartVisit(true));
      dispatch(setVsoStep(1));
      // dispatch(clearVso());
    } catch (error) {
      console.error('this is onsubmit error', error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) {
        setValue('start_Km_img', null);
        return;
      }

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('start_Km_img', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    setValue('visitor_id', user?.id);
  }, [setValue, user]);

  useEffect(() => {
    if (!errors) {
      navigate('/dashboard/vso-visit-entry');
      dispatch(setVsoStartVisit(true));
    }
  }, [errors, navigate, vso, dispatch]);

  // const handleOptionSelect = (event) => {
  //   setSelectedOption(event.target.value);
  //   let selectedValue = event.target.value;

  //   // If 'mgr_car' is selected, combine it with 'miscellaneous'
  //   if (selectedValue === 'mgr_car') {
  //     selectedValue += ',miscellaneous';
  //     setChecked(true);
  //   }
  //   setSelectedCar(selectedValue);
  // };

  const [selectedAllowances, setSelectedAllowances] = useState({ car: 0, motorCycle: 0 });

const handleOptionSelect = (event) => {
  const selectedValue = event.target.value;
  setSelectedOption(selectedValue);
  setSelectedCar(selectedValue);

  // Update allowances based on selection
  if (selectedValue === 'self_car' || selectedValue === 'self_motor_cycle') {
    setSelectedAllowances({
      car: CarAllowance[0]?.allowance || 0,
      motorCycle: MotorCycleAllowance[0]?.allowance || 0
    });
  } else {
    // For manager options, you might want to set different allowances or keep them at 0
    setSelectedAllowances({
      car: allowanceData.find(item => item.category === 'MGR CAR')?.allowance || 0,
      motorCycle: allowanceData.find(item => item.category === 'MGR MOTOR CYCLE')?.allowance || 0
    });
  }
};

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleCarKmChange = (event) => {
    setCarKM(event.target.value);
  };

  console.log(selectedIds);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <CRMTextFieldSmall
            name="noOfVisitor"
            label="No of Manager Visiting"
            onInput={(e) => {
              trigger('noOfVisitor');
            }}
          />
          <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <ManagerIdForm selectedIds={selectedIds} onIdChange={handleIdChange} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" flex="1" flexDirection="column">
                {selectedOption !== 'mgr_car' && (
                  <>
                    <FormLabel sx={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>
                      Meter Display
                    </FormLabel>

                    <RHFUploadBox
                      name="start_Km_img"
                      onDrop={handleDrop}
                      label="Meter Display"
                      file={startKmPreview}
                      // file={preview || 'No file selected'}
                    />
                  </>
                )}
              </Box>
              <Box display="flex" flex="1" flexDirection="column">
                <FormLabel sx={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}>
                  Start Km
                </FormLabel>
                <CRMTextField
                  name="start_Km"
                  onInput={handleCarKmChange}
                  placeholder="Start Km"
                  bgColor="#8faadc"
                  type="number"
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        >
          <Box textAlign="center" mt={2}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              DATE: {formattedDate}
            </Typography>
          </Box>
          <Card
            sx={{
              backgroundColor: 'primary.light',
              // width: { xs: '100%', sm: '100%', md: 'fit-content' },
              pl: 2,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <CRMRadioGroup
              onChange={(event) => handleOptionSelect(event)}
              name="car_select"
              value={selectedOption}
              options={[
                { label: 'MGR CAR', value: 'mgr_car' },
                { label: 'MGR MOTOR CYCLE', value: 'mgr_motor_cycle' },
                { label: 'SELF CAR', value: 'self_car' },
                { label: 'SELF MOTOR CYCLE', value: 'self_motor_cycle' },
                // { label: 'MISCELLANEOUS', value: 'miscellaneous' },
              ]}
            />

            <label
              htmlFor="miscellaneous"
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                name="miscellaneous"
                id="miscellaneous"
                label="MISCELLANEOUS"
                style={{
                  width: '16px',
                  height: '16px',
                  border: '1px solid #000',
                  borderRadius: '50%',
                  backgroundColor: checked ? '#000' : '#fff',
                  marginLeft: '-4px',
                }}
              />
              MISCELLANEOUS
            </label>
          </Card>
        </Grid>
      </Grid>

      {/* <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            gap={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
              PER KM CAR ALLOWANCE
            </Typography>
            <Box
              sx={{
                padding: '5px 40px',
                boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',
              }}
            >
              {car && car}
            </Box>
          </Stack>
    
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            gap={2}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
              PER KM MOTOR CYCLE ALLOWANCE 
            </Typography>
            <Box
              sx={{
                padding: '5px 40px',
                boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',
              }}
            >
              {motorCycle && motorCycle}
            </Box>
          </Stack>

        </Grid>
      </Grid> */}

<Grid container spacing={3} mt={2}>
  <Grid item xs={12} md={6}>
    <Stack
      direction="row"
      gap={2}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
        PER KM CAR ALLOWANCE
      </Typography>
      <Box
        sx={{
          padding: '5px 40px',
          boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
          borderRadius: '5px',
        }}
      >
        {selectedAllowances.car}
      </Box>
    </Stack>
  </Grid>
  <Grid item xs={12} md={6}>
    <Stack
      direction="row"
      gap={2}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '15px' }}>
        PER KM MOTOR CYCLE ALLOWANCE 
      </Typography>
      <Box
        sx={{
          padding: '5px 40px',
          boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
          borderRadius: '5px',
        }}
      >
        {selectedAllowances.motorCycle}
      </Box>
    </Stack>
  </Grid>
</Grid>


      {/* <Box>
        <ManagerIdForm />
      </Box> */}

      {/* <Box mt={2} pl={2} fontSize="13px">
        <ul style={{ marginTop: '20px' }}>
          <li>VSO has to enter km manually as well as take snap of METER DISPLAY </li>
          <li>If VSO going with manager vehicle he does not have to enter the Start Km </li>
          <li>
            VSO is visiting for 4, 6, and 8 calls he will subsequently get Rs.100, Rs.200, and
            Rs.400 as daily allowance. It will be automatically added to your expense report{' '}
          </li>
          <li>If going to manager`&apos;`s vehicle then VSO shall only get DA.</li>
        </ul>
      </Box> */}

      <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
        <Button
          type="submit"
          // onClick={() => navigate('/dashboard/vso-visit-entry')}
          variant="contained"
          sx={{
            px: '45px',
            py: '6px',
            color: '#000',
            backgroundColor: '#8faadc !important',
            display: 'flex',
            flexDirection: 'column',
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
      </Stack>
    </FormProvider>
  );
}

export default VisitReportExpensesNewEditFrom;
