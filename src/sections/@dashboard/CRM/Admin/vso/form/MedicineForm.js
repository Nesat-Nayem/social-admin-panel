import { Box, Button, Divider, Grid, MenuItem, Stack, Typography } from '@mui/material';
import Iconify from 'components/iconify';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFSelect, RHFTextField } from '../../../../../../components/hook-form';

// ----------------------------------------------------------------------

MedicineForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  save: PropTypes.func,
  MEDICINE_OPTIONS: PropTypes.array,
  v_id: PropTypes.string,
};

export default function MedicineForm({
  isEdit = false,
  currentUser,
  save,
  MEDICINE_OPTIONS,
  v_id,
}) {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medicines',
  });

  const values = watch();

  const handleAdd = () => {
    append({
      name: '',
      quantity: '',
      // vso_id: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].coupon`);
      resetField(`items[${index}].samplename`);
      resetField(`items[${index}].points`);
    },
    [resetField]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`medicines[${index}].quantity`, Number(event.target.value));
    },
    [setValue]
  );
  const handleChangeVsoId = useCallback(
    (event, index) => {
      console.log('event.target.value', event.target.value);
      setValue(`medicines[${index}].vso_id`, event.target.value);
    },
    [setValue]
  );

  const handleChangeSampleName = useCallback(
    (event, index) => {
      setValue(`medicines[${index}].name`, event.target.value);
      setValue(`medicines[${index}].vso_id`, v_id);
    },
    [setValue, v_id]
  );
  const isAddButtonDisabled = fields.length >= MEDICINE_OPTIONS.length;

  return (
    <>
      {' '}
      <Typography variant="h6" gutterBottom>
        Medicine Details
      </Typography>
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
      <Grid container spacing={3} justifyContent="flex-end">
        <Grid item xs={12} md={8}>
          {!isEdit && (
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="id" label="VS0 ID" />
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="flex-end" mt={1}>
        {fields?.map((item, index) => (
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
              {/* <RHFTextField
                name={`medicines[${index}].vso_id`}
                label="VS0 ID"
                onChange={(event) => handleChangeVsoId(event, index)}
              /> */}
              <RHFSelect
                name={`medicines[${index}].name`}
                label="Medicine Name"
                onChange={(event) => handleChangeSampleName(event, index)}
                //   InputLabelProps={{ shrink: true }}
              >
                {MEDICINE_OPTIONS.map((items) => (
                  <MenuItem key={items.label} value={items.label}>
                    {items.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField
                type="number"
                name={`medicines[${index}].quantity`}
                label="Quantity"
                placeholder="0"
                onChange={(event) => handleChangeQuantity(event, index)}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="eva:trash-2-outline" />}
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            </Box>
            <Divider sx={{ my: 3, borderStyle: 'dashed', color: '#000' }} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
