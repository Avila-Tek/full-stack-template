import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getUsers } from './queries';

export function useUsers(
  filters?: Partial<any>, // FIXME: Replace with the correct type
  options?: UseQueryOptions<any, any, any, any> //<TQueryFnData, TError, TData, TQueryKey>
) {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    ...options,
  });
}
