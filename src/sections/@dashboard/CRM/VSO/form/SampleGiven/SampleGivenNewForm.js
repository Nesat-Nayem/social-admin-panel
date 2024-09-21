import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Divider, MenuItem, Stack, Typography } from '@mui/material';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { useGetItemById, useGetMaster } from 'services/Master.Services';
import { RHFSelect, RHFTextField } from '../../../../../../components/hook-form';
import Iconify from '../../../../../../components/iconify';

SampleGivenNewForm.propTypes = {
  doctor_id: PropTypes.string,
};

function SampleGivenNewForm({ doctor_id }) {
  const { control, setValue, watch, resetField, trigger } = useFormContext();
  const [medicineName, setMedicineName] = useState('');
  const [vso_id, setvsoid] = useState('');
  const [sample_id, setsampleid] = useState('');
  const { data: MEDICINE_DATA, isLoading } = useGetMaster('sample-name');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setvsoid(user?.id);
  }, [user?.id]);

  const filterSampleDataBYId =
    MEDICINE_DATA && MEDICINE_DATA?.filter((item) => item.name === medicineName);

  const id = filterSampleDataBYId && filterSampleDataBYId[0]?.id;
  const { data: MEDICINE_POINT, isLoading: isMedicineLoading } = useGetItemById('sample-name', id);
  const MEDICINE_OPTIONS =
    MEDICINE_DATA &&
    MEDICINE_DATA?.map((medicine) => ({
      id: medicine.id,
      value: medicine.name,
      label: medicine.name,
    }));

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sampleGiven',
  });

  const values = watch();
  const pointMedicine = MEDICINE_POINT && MEDICINE_POINT?.point;

  const handleAdd = () => {
    append({
      sample_name: '',
      quantity: '',
      point: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleChangeQuantity = useCallback(
    (event, index) => {
      // const totalPoint = Number(event.target.value * pointMedicine);
      const totalPoint = Number(pointMedicine);
      setValue(`sampleGiven[${index}].quantity`, Number(event.target.value));
      setValue(`sampleGiven[${index}].point`, totalPoint);
    },
    [setValue, pointMedicine]
  );

  const handleChangeSampleName = useCallback(
    (event, index, medicineId) => {
      const totalPoint = Number(pointMedicine);
      setValue(`sampleGiven[${index}].sample_name`, event.target.value);
      setValue(`sampleGiven[${index}].vso_id`, vso_id);
      setValue(`sampleGiven[${index}].sample_id`, String(medicineId));
      setMedicineName(event.target.value);
      setValue(`sampleGiven[${index}].doctor_id`, doctor_id);
      trigger(`sampleGiven[${index}].sample_name`);
      setValue(`sampleGiven[${index}].point`, totalPoint);
      // resetField(`sampleGiven[${index}].quantity`);
    },
    [setValue, doctor_id, setMedicineName, trigger, pointMedicine, vso_id]
  );
  const isAddButtonDisabled = fields.length >= MEDICINE_DATA?.length;
  if (isLoading || isMedicineLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {' '}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
          Details:
        </Typography>

        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          {fields?.map((item, index) => (
            <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                <RHFSelect
                  name={`sampleGiven[${index}].sample_name`}
                  label="Sample Name"
                  onChange={(event) => {
                    const selectedMedicine = MEDICINE_OPTIONS.find(
                      (medicine) => medicine.value === event.target.value
                    );
                    handleChangeSampleName(event, index, selectedMedicine.id);
                  }}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                >
                  {MEDICINE_OPTIONS.map((medicine) => (
                    <MenuItem
                      key={medicine.value}
                      value={medicine.value}
                      onInput={() => setsampleid(medicine.id)}
                    >
                      {medicine.label}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFTextField
                  size="small"
                  type="number"
                  name={`sampleGiven[${index}].quantity`}
                  label="No. of Sample Given"
                  placeholder="0"
                  onInput={(event) => handleChangeQuantity(event, index)}
                  InputLabelProps={{ shrink: true }}
                  // sx={{ maxWidth: { md: 96 } }}
                />

                <RHFTextField
                  size="small"
                  type="number"
                  name={`sampleGiven[${index}].point`}
                  label="Points Per Sample"
                  placeholder="0"
                  readOnly
                  // sx={{ maxWidth: { md: 96 } }}
                />
              </Stack>

              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="eva:trash-2-outline" />}
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAdd}
            sx={{ flexShrink: 0 }}
            disabled={isAddButtonDisabled}
          >
            Add Item
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default SampleGivenNewForm;
