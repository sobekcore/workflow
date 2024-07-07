import { useQuery } from '@tanstack/react-query';
import { readExecutions } from '@/api/executions/read-executions.ts';
import { QueryKey } from '@/enums/query.ts';

export function useReadExecutions() {
  return useQuery({ queryKey: [QueryKey.READ_EXECUTIONS], queryFn: readExecutions });
}
