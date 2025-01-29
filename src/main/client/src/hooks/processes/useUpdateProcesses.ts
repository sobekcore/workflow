import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProcesses } from '@/api/processes/update-processes.ts';
import { QueryKey } from '@/enums/query.ts';
import { UseMutationParams } from '@/interfaces/mutation.ts';
import { Process, ProcessToUpdate } from '@/interfaces/process.ts';

export function useUpdateProcesses({ onSuccess, onError }: UseMutationParams = {}) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processes: ProcessToUpdate[]): Promise<Process[]> {
      return updateProcesses(processes);
    },
    onSuccess(processesToUpdate: Process[]): void {
      queryClient.setQueryData<Process[]>([QueryKey.READ_PROCESSES], (processes?: Process[]): Process[] => {
        if (!processes) {
          return [];
        }

        const processesIds: string[] = processesToUpdate.map((processToUpdate: Process): string => processToUpdate.id);

        return [
          ...processes.filter((process: Process): boolean => !processesIds.includes(process.id)),
          ...processesToUpdate,
        ];
      });
      onSuccess?.();
    },
    onError,
  });
}
