import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProcessesSteps } from '@/api/processes-steps/create-processes-steps.ts';
import { QueryKey } from '@/enums/query.ts';
import { ProcessStep, ProcessStepToAdd } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';

export function useCreateProcessesSteps(processId: string) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processesSteps: ProcessStepToAdd[]): Promise<ProcessStep[]> {
      return createProcessesSteps(processesSteps);
    },
    onSuccess(processesStepsToAdd: ProcessStep[]): void {
      queryClient.setQueryData<Process[]>([QueryKey.READ_PROCESSES], (processes?: Process[]): Process[] => {
        if (!processes) {
          return [];
        }

        const index: number = processes.findIndex((process: Process): boolean => process.id === processId);
        if (index === -1) {
          return [];
        }

        return [
          ...processes.slice(0, index),
          { ...processes[index], steps: [...processes[index].steps, ...processesStepsToAdd] },
          ...processes.slice(index + 1),
        ];
      });
    },
  });
}
