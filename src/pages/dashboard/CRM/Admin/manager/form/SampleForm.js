import React, { useEffect } from 'react';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { RHFTextField } from 'components/hook-form';
import Iconify from 'components/iconify';
import PropTypes from 'prop-types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetMasterById } from 'services/Master.Services';

SampleForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  save: PropTypes.func,
  MEDICINE_OPTIONS: PropTypes.array,
  v_id: PropTypes.string,
};

export default function SampleForm({ isEdit = false, currentUser, save, MEDICINE_OPTIONS, v_id }) {
  const { control, setValue, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'samples',
  });

  const { id } = useParams();
  const { data } = useGetMasterById('vso', id);

  useEffect(() => {
    if (data && data.samples) {
      reset({
        samples: data.samples.map((sample) => ({
          id: sample.id, // Include id
          vsoid: sample.vsoid, // Include vsoid
          samplename: sample.samplename,
          samplequantity: sample.samplequantity,
        })),
      });
    }
  }, [data, reset]);

  const handleAdd = () => {
    append({
      samplename: '',
      samplequantity: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleChangeQuantity = (event, index) => {
    setValue(`samples[${index}].samplequantity`, Number(event.target.value));
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sample Details
      </Typography>
      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        {/* <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button> */}
      </Stack>

      <Grid container spacing={3} justifyContent="flex-end" mt={1}>
        {fields.map((item, index) => (
          <Grid item xs={12} md={8} key={item.id}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {/* Hidden fields for id and vsoid */}
              <input
                type="hidden"
                {...control.register(`samples[${index}].id`)}
                defaultValue={item.id} // Set the default value for id
              />
              <input
                type="hidden"
                {...control.register(`samples[${index}].vsoid`)}
                defaultValue={item.vsoid} // Set the default value for vsoid
              />
              <RHFTextField
                name={`samples[${index}].samplename`}
                label="Medicine Name"
                defaultValue={item.samplename}
                InputProps={{
                  readOnly: true,
                }}
              />
              <RHFTextField
                type="number"
                name={`samples[${index}].samplequantity`}
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
