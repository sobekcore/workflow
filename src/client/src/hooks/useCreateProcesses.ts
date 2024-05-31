import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProcesses } from '@/api/processes/create-processes.ts';
import { QueryKey } from '@/enums/query.ts';
import { Process, ProcessToAdd } from '@/interfaces/process.ts';

export function useCreateProcesses() {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processes: ProcessToAdd[]): Promise<Process[]> {
      return createProcesses(processes);
    },
    onSuccess(processesToAdd: Process[]): void {
      queryClient.setQueryData<Process[]>([QueryKey.READ_PROCESSES], (processes?: Process[]): Process[] => {
        if (!processes) {
          return processesToAdd;
        }

        return [...processes, ...processesToAdd];
      });
    },
  });
}
