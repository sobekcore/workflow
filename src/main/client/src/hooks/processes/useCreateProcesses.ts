import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProcesses } from '@/api/processes/create-processes.ts';
import { QueryKey } from '@/enums/query.ts';
import { Process, ProcessToCreate } from '@/interfaces/process.ts';

export function useCreateProcesses() {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processes: ProcessToCreate[]): Promise<Process[]> {
      return createProcesses(processes);
    },
    onSuccess(processesToCreate: Process[]): void {
      queryClient.setQueryData<Process[]>([QueryKey.READ_PROCESSES], (processes?: Process[]): Process[] => {
        if (!processes) {
          return processesToCreate;
        }

        return [...processes, ...processesToCreate];
      });
    },
  });
}
