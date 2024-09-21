import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';
import { API } from 'services/API';
import { convertToFormData } from 'utils/convertToFormData';

export const usePatchMaster = (master_name) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation({
    // Define the mutation function for PATCH request
    mutationFn: (formData) => API.patch(`/api/${master_name}`, formData),
    // Optional: onSuccess callback
    onSuccess: () => {
      // Invalidate and refetch queries related to the master_name to update the UI with the latest data
      queryClient.invalidateQueries([master_name]);
      // Show a success message using notistack
      enqueueSnackbar('Update success!', { variant: 'success' });
    },
    // Optional: onError callback
    onError: (err) => {
      // Handle error case, e.g., showing an error message
      enqueueSnackbar('Update failed!', { variant: 'error' });
    },
  });

  return {
    patchMaster: mutate, // Expose the mutate function to trigger the PATCH request
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
};

export function useCreateMaster(master_name) {
  const {
    mutate: create,
    isLoading,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: (formData) => {
      return API.post(`/api/${master_name}-register`, convertToFormData(formData));
    },
  });

  return {
    create,
    isLoading,
    isSuccess,
    isError,
    data: data?.data,
    success: data?.data?.success,
    errorMessages: error?.response?.data?.errors || {},
  };
}

export const useGetMaster = (master_name) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [master_name],
    queryFn: () => API.get(`/api/${master_name}`),
  });
  // console.log();
  return {
    data: data?.data?.data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export const useGetCity = (master_name) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [master_name],
    queryFn: () => API.get(`/api/${master_name}`),
  });
  // console.log();
  return {
    data: data?.data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
export const useGetMastersample = (master_name) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [master_name],
    queryFn: () => API.get(`/api/${master_name}`),
  });

  return {
    data: data?.data?.samples,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export const useDeleteMaster = (master_name) => {
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation({
    mutationFn: (id) => API.delete(`/api/${master_name}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(master_name); // Invalidate and refetch the query
      enqueueSnackbar('Delete success!', { variant: 'success' });
    },
  });

  return {
    deleteUser: mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
};

export function useCreateItem(master_name) {
  const {
    mutate: createItem,
    isLoading,
    isSuccess,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: (formData) => {
      return API.post(`/api/${master_name}`, formData);
    },
  });

  return {
    createItem,
    isLoading,
    isSuccess,
    isError,
    data: data?.data,
    success: data?.data?.success,
    errorMessages: error?.response?.data?.error || error?.response?.data?.errors || {},
  };
}

export const useUpdateMaster = (master_name) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation({
    mutationFn: (formData) =>
      API.post(`/api/${master_name}/${formData.id}`, convertToFormData(formData)),
    onSuccess: () => {
      queryClient.invalidateQueries(master_name);
    },
  });

  return {
    update: mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    errorMessages: error?.response?.data?.errors || error?.response?.data?.error || {},
  };
};
export const useUpdateMasterSample = (master_name) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation({
    mutationFn: (formData) => API.put(`/api/${master_name}/${formData.id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(master_name);
    },
  });
  console.log(data);
  return {
    update: mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    errorMessages: error?.response?.data?.errors || error?.response?.data?.error || {},
  };
};

export const useGetMasterById = (master_name, id) => {
  const { name } = useParams();
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [master_name, id],
    queryFn: () => API.get(`/api/${master_name}/${name || id}`),
  });
  return {
    data: data?.data?.data,
    isLoading,
    isError,
    error,
    isSuccess,
    errorMessages: error?.response?.data?.errors || {},
  };
};
export const useGetCityById = (master_name, id) => {
  const { name } = useParams();
  const number = Number(name);
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [master_name, id],
    queryFn: () => API.get(`/api/${master_name}/${number}`),
  });
  console.log();
  return {
    data: data?.data?.data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
export const useGetItemById = (master_name, id) => {
  const { data, isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: [master_name, id],
    queryFn: () => API.get(`/api/${master_name}/${id}`),
  });
  // console.log(data);
  return {
    data: data?.data?.data,
    isLoading,
    isError,
    error,
    isSuccess,
    errorMessages: error?.response?.data?.errors || {},
    refetch,
  };
};

export const useUpdateItem = (master_name) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation({
    mutationFn: (formData) => API.put(`/api/${master_name}/${formData.id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(master_name);
    },
  });

  return {
    update: mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    errorMessages: error?.response?.data?.errors || error?.response?.data?.error || {},
  };
};
export const useUpdateStock = (master_name) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation({
    mutationFn: (formData) => API.put(`/api/${master_name}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(master_name);
    },
  });

  return {
    update: mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    errorMessages: error?.response?.data?.errors || error?.response?.data?.error || {},
  };
};

export const useGetUpdateStock = (master_name) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation({
    mutationFn: (formData) => API.put(`/api/${master_name}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(master_name);
    },
  });

  return {
    update: mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    errorMessages: error?.response?.data?.errors || error?.response?.data?.error || {},
  };
};

// export const useGetBussinessReport = (master_name, { fromDate, toDate }) => {
//   const { data, isLoading, isError, error, isSuccess } = useQuery({
//     queryKey: [master_name, fromDate, toDate], // Include fromDate and toDate in queryKey
//     queryFn: () => API.get(`/api/${master_name}?from=${fromDate}&to=${toDate}`), // Fix string interpolation
//   });

//   return {
//     data: data?.data?.data,
//     isLoading,
//     isError,
//     error,
//     isSuccess,
//   };
// };

export const useGetBussinessReport = (master_name, { fromDate, toDate }) => {
  const queryKey = [master_name];
  let apiUrl = `/api/${master_name}`;
  if (fromDate && toDate) {
    queryKey.push(fromDate, toDate);
    apiUrl += `?from=${fromDate}&to=${toDate}`;
  }

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey,
    queryFn: () => API.get(apiUrl),
  });

  return {
    data: data?.data?.data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
