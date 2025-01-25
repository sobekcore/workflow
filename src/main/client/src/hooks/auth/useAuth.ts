import { queryOptions, useQuery } from '@tanstack/react-query';
import { readUser } from '@/api/auth/read-user.ts';
import { QueryKey } from '@/enums/query.ts';

export function authQuery() {
  return queryOptions({
    queryKey: [QueryKey.AUTH],
    queryFn: readUser,
    staleTime: Infinity,
  });
}

export function useAuth() {
  return useQuery(authQuery());
}
