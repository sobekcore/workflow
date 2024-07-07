import { useQuery } from '@tanstack/react-query';
import { readProcesses } from '@/api/processes/read-processes.ts';
import { QueryKey } from '@/enums/query.ts';

export function useReadProcesses() {
  return useQuery({ queryKey: [QueryKey.READ_PROCESSES], queryFn: readProcesses });
}
