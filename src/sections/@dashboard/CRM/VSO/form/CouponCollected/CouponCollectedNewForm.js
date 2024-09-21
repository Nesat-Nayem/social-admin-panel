import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import { Box, Button, Divider, MenuItem, Stack, Typography } from '@mui/material';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { useGetItemById, useGetMaster } from 'services/Master.Services';
import { RHFSelect, RHFTextField } from '../../../../../../components/hook-form';
import Iconify from '../../../../../../components/iconify';

CouponCollectedNewForm.propTypes = {
  doctor_id: PropTypes.string,
  isSuccess: PropTypes.bool,
};

function CouponCollectedNewForm({ doctor_id, isSuccess }) {
  const { control, setValue, watch, resetField, trigger } = useFormContext();
  const [medicineName, setMedicineName] = useState('');
  const { data: MEDICINE_DATA, isLoading } = useGetMaster('medicin-name');
  const filterSampleDataBYId =
    MEDICINE_DATA && MEDICINE_DATA?.filter((item) => item.name === medicineName);

  const id = filterSampleDataBYId && filterSampleDataBYId[0]?.id;
  const { data: MEDICINE_POINT, isLoading: isMedicineLoading } = useGetItemById('medicin-name', id);
  const MEDICINE_OPTIONS =
    MEDICINE_DATA &&
    MEDICINE_DATA?.map((medicine) => ({
      value: medicine.name,
      label: medicine.name,
    }));

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'copons_collected',
  });

  const values = watch();
  const pointMedicine = MEDICINE_POINT && MEDICINE_POINT?.point;

  const handleAdd = () => {
    append({
      copon_name: '',
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
      setValue(`copons_collected[${index}].quantity`, Number(event.target.value));
      setValue(`copons_collected[${index}].point`, totalPoint);
    },
    [setValue, pointMedicine]
  );

  const handleChangeSampleName = useCallback(
    (event, index) => {
      const totalPoint = Number(pointMedicine);
      setValue(`copons_collected[${index}].copon_name`, event.target.value);
      setMedicineName(event.target.value);
      setValue(`copons_collected[${index}].doctor_id`, doctor_id);
      setValue(`copons_collected[${index}].point`, totalPoint);
      trigger(`copons_collected[${index}].copon_name`);
      // resetField(`copons_collected[${index}].quantity`);
    },
    [setValue, doctor_id, setMedicineName, trigger, pointMedicine]
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
                  name={`copons_collected[${index}].copon_name`}
                  label="Medicine Name"
                  onChange={(event) => handleChangeSampleName(event, index)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                >
                  {MEDICINE_OPTIONS.map((medicine) => (
                    <MenuItem key={medicine.value} value={medicine.value}>
                      {medicine.label}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFTextField
                  size="small"
                  type="number"
                  name={`copons_collected[${index}].quantity`}
                  label="No. of Coupons Collected"
                  placeholder="0"
                  onInput={(event) => handleChangeQuantity(event, index)}
                  InputLabelProps={{ shrink: true }}
                  // sx={{ maxWidth: { md: 96 } }}
                  inputProps={{ maxLength: 4 }}
                />

                <RHFTextField
                  size="small"
                  type="number"
                  name={`copons_collected[${index}].point`}
                  label="Points Per Coupon "
                  // sx={{ maxWidth: { md: 96 } }}
                  placeholder="0"
                  readOnly
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

export default CouponCollectedNewForm;
