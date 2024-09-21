import { useMutation, useQuery } from '@tanstack/react-query';
import { convertToFormData } from 'utils/convertToFormData';
import { API } from './API';

export function useCollectManagerId() {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryFn: () => API.get(`/api/manager`),
  });
  const ids = [];
  data?.data?.data.forEach((item) => {
    ids.push(item?.id);
  });
  return {
    Manager_id: ids,
    isLoading,
    isError,
    error,
    isSuccess,
    errorMessages: error?.response?.data?.error || {},
  };
}
