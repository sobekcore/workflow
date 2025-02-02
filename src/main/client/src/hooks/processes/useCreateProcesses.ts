import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProcesses } from '@/api/processes/create-processes.ts';
import { QueryKey } from '@/enums/query.ts';
import { UseMutationParams } from '@/interfaces/mutation.ts';
import { Process, ProcessToCreate } from '@/interfaces/process.ts';

export function useCreateProcesses({ onSuccess, onError }: UseMutationParams = {}) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processes: ProcessToCreate[]): Promise<Process[]> {
      return createProcesses(processes);
    },
    onSuccess(createdProcesses: Process[]): void {
      queryClient.setQueryData<Process[]>([QueryKey.READ_PROCESSES], (processes?: Process[]): Process[] => {
        if (!processes) {
          return createdProcesses;
        }

        return [...processes, ...createdProcesses];
      });
      onSuccess?.();
    },
    onError,
  });
}
