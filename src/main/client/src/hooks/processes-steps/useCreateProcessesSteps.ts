import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProcessesSteps } from '@/api/processes-steps/create-processes-steps.ts';
import { QueryKey } from '@/enums/query.ts';
import { UseMutationParams } from '@/interfaces/mutation.ts';
import { ProcessStep, ProcessStepToCreate } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';

interface UseCreateProcessesStepsParams extends UseMutationParams {
  processId: string;
}

export function useCreateProcessesSteps({ processId, onSuccess, onError }: UseCreateProcessesStepsParams) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processesSteps: ProcessStepToCreate[]): Promise<ProcessStep[]> {
      return createProcessesSteps(processesSteps);
    },
    onSuccess(processesStepsToCreate: ProcessStep[]): void {
      queryClient.setQueryData<Process[]>([QueryKey.READ_PROCESSES], (processes?: Process[]): Process[] => {
        if (!processes) {
          return [];
        }

        const index: number = processes.findIndex((process: Process): boolean => process.id === processId);
        if (index === -1) {
          return processes;
        }

        return [
          ...processes.slice(0, index),
          { ...processes[index], steps: [...processes[index].steps, ...processesStepsToCreate] },
          ...processes.slice(index + 1),
        ];
      });
      onSuccess?.();
    },
    onError,
  });
}
