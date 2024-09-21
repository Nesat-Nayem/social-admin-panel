/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import CRMTextField from 'components/crm-hook-form/CRMTextField';
import React, { useCallback, useEffect, useMemo, useState, forwardRef, useImperativeHandle } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useCollectManagerId } from 'services/Manager.Services';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

// ManagerIdForm.propTypes = {};
ManagerIdForm.propTypes = {
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  onIdChange: PropTypes.func.isRequired,
};
export default function ManagerIdForm({ selectedIds, onIdChange }) {
  const { control, watch, resetField } = useFormContext();
  // const [selectedIds, setSelectedIds] = useState([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'manager_id',
  });
  const manager_id = useCollectManagerId();
  const values = watch();

  const noOFManger = values && values.noOfVisitor;
  // console.log('dkjfkdjfk', values.manager_id);

  const managerLength = values?.manager_id?.length;

  const handleAppend = () => {
    return append();
  };

  useEffect(() => {
    if (managerLength < noOFManger) {
      const diff = noOFManger - managerLength;

      Array.from({ length: noOFManger }).forEach(() => {
        append({ ele: '' });
      });
    } else if (managerLength > noOFManger) {
      const diff = managerLength - noOFManger;
      for (let i = 0; i < diff; i += 1) {
        remove(managerLength - 1); // Remove fields from the end of the array
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noOFManger, managerLength, handleAppend, append]);
  const handleIdChange = (e, fieldIndex) => {
    const selectedId = e.target.value;
    const newSelectedIds = [...selectedIds]; // Create a copy of the selectedIds array
    newSelectedIds[fieldIndex] = selectedId; // Update the value at the specified index
    onIdChange(newSelectedIds); // Call the onIdChange function with the updated array
  };
  return (
    <>
      {fields?.map((item, fieldIndex) => {
        return (
          <select
            key={fields.id}
            name={`manager_id.${fieldIndex}.ele`}
            style={{
              backgroundColor: '#2f5597',
              color: 'white',
              borderRadius: '5px',
              height: '0.3in',
            }}
            onChange={(e) => {
              handleIdChange(e, fieldIndex)
              // handleChangeQuantity(selectedIds, fieldIndex);
            }}
          >
            <option value="">Select Manager Id</option>
            {manager_id?.Manager_id.map((id, index) => {
              if (!selectedIds.includes(id) || selectedIds[fieldIndex] === id) {
                return (
                  <option key={index} value={id}>
                    {id}
                  </option>
                );
              }
              return null;
            })}
            {/* Add more options as needed */}
          </select>
        );
      })}
    </>
  );
}
