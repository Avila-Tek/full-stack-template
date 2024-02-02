// INFO: This file is used to create custom hooks to fetch data from the API REST.
// If this project is connected to a backend by API REST uses the following examples to create a custom hook to fetch data from the API.
// if you dont use API REST, you can remove this file.

// Axios is already configured to use the base URL from the backend, so you can use the relative path to the endpoint.
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axios } from '@/lib/api';

// example of query with filters
export function useGetUserInfo(
  filters?: Partial<any>, // use the type of the filters
  options: Omit<
    UseQueryOptions<any, AxiosError, any, QueryKey>, // Use types <Data, Error, Output, Input>
    'queryKey' | 'queryFn'
  > = {}
) {
  const query = useQuery<any, AxiosError>({
    queryKey: ['user', filters?._id], // queryKey is used to identify the query in the cache
    queryFn: async () => {
      // queryFn is the function that will be called to fetch the data
      const { data } = await axios.get<any>(`/todos/1`, {
        params: { ...filters },
      });
      return data;
    },
    ...options, // you can pass the options to configure the query
  });
  return query;
}

// example of mutation
export function useCreateUser(options?: UseMutationOptions) {
  // Use types                <Input, Error, Output>
  const mutation = useMutation<any, AxiosError, any>({
    mutationFn: async (newUser) => {
      const { data } = await axios.post('/api/users/v1', newUser);
      return data;
    },
    ...options,
  });
  return mutation;
}
