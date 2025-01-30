import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProcessesSteps } from '@/api/processes-steps/update-processes-steps.ts';
import { QueryKey } from '@/enums/query.ts';
import { UseMutationParams } from '@/interfaces/mutation.ts';
import { ProcessStep, ProcessStepToUpdate } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';

interface UseUpdateProcessesStepsParams extends UseMutationParams {
  processId: string;
}

export function useUpdateProcessesSteps({ processId, onSuccess, onError }: UseUpdateProcessesStepsParams) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processesSteps: ProcessStepToUpdate[]): Promise<ProcessStep[]> {
      return updateProcessesSteps(processesSteps);
    },
    onSuccess(processesStepsToUpdate: ProcessStep[]): void {
      queryClient.setQueryData<Process[]>([QueryKey.READ_PROCESSES], (processes?: Process[]): Process[] => {
        if (!processes) {
          return [];
        }

        const index: number = processes.findIndex((process: Process): boolean => process.id === processId);
        if (index === -1) {
          return processes;
        }

        const processesStepsIds: string[] = processesStepsToUpdate.map(
          (processStepToUpdate: ProcessStep): string => processStepToUpdate.id,
        );

        return [
          ...processes.slice(0, index),
          {
            ...processes[index],
            steps: [
              ...processes[index].steps.filter(
                (processStep: ProcessStep): boolean => !processesStepsIds.includes(processStep.id),
              ),
              ...processesStepsToUpdate,
            ],
          },
          ...processes.slice(index + 1),
        ];
      });
      onSuccess?.();
    },
    onError,
  });
}
