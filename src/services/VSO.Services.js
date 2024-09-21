import { useMutation, useQuery } from '@tanstack/react-query';
import { convertToFormData } from 'utils/convertToFormData';
import { API } from './API';

export function useCreateVsoVisit() {
  const {
    mutate: create,
    isLoading,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: (formData) => {
      return API.post(`/api/vso-visit`, convertToFormData(formData));
    },
  });

  return {
    create,
    isLoading,
    isSuccess,
    isError,
    data: data?.data,
    success: data?.data?.success,
    successMessage: data?.data?.message,
    errorMessages: error?.response?.data?.error || {},
  };
}

export const useGetVSOById = (master_name, id) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [master_name, id],
    queryFn: () => API.get(`/api/${master_name}/${id}`),
  });
  // console.log('OOOO', error?.response?.data);
  return {
    data: data?.data?.data,
    isLoading,
    isError,
    error,
    isSuccess,
    errorMessages: error?.response?.data?.errors || {},
  };
};

export const useGetVSOCountById = (master_name, id) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [master_name, id],
    queryFn: () => API.get(`/api/${master_name}/${id}`),
  });
  let count = 0;
  const currentMonth = new Date().getMonth();
  data?.data?.data?.forEach((item) => {
    // use forEach instead of map
    const createdAtDate = new Date(item?.created_at);
    if (createdAtDate.getMonth() === currentMonth) {
      count += 1;
    }
  });
  return {
    conutn: count,
    isLoading,
    isError,
    error,
    isSuccess,
    errorMessages: error?.response?.data?.errors || {},
  };
};
