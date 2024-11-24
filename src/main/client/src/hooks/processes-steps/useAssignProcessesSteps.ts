import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignProcessesSteps } from '@/api/processes-steps/assign-processes-steps.ts';
import { QueryKey } from '@/enums/query.ts';
import { ProcessStep, ProcessStepToAssign } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';

export function useAssignProcessesSteps(processId: string) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processes: ProcessStepToAssign[]): Promise<void> {
      return assignProcessesSteps(processes);
    },
    onMutate(processesToAssign: ProcessStepToAssign[]): void {
      queryClient.setQueryData<Process[]>([QueryKey.READ_PROCESSES], (processes?: Process[]): Process[] => {
        if (!processes) {
          return [];
        }

        const index: number = processes.findIndex((process: Process): boolean => process.id === processId);
        if (index === -1) {
          return processes;
        }

        const processToAssign: ProcessStepToAssign | undefined = processesToAssign.find(
          (process: ProcessStepToAssign): boolean => process.processId === processId,
        );
        if (!processToAssign) {
          return processes;
        }

        const processStepIndex: number = processes[index].steps.findIndex(
          (processStep: ProcessStep): boolean => processStep.id === processToAssign.processStepId,
        );
        if (processStepIndex === -1) {
          return processes;
        }

        const assignProcessStepIndex: number = processes[index].steps.findIndex(
          (processStep: ProcessStep): boolean => processStep.id === processToAssign.assignProcessStepId,
        );
        if (assignProcessStepIndex === -1) {
          return processes;
        }

        return [
          ...processes.slice(0, index),
          {
            ...processes[index],
            steps: [
              ...processes[index].steps.slice(0, processStepIndex),
              {
                ...processes[index].steps[processStepIndex],
                availableFrom: [
                  ...(processes[index].steps[processStepIndex].availableFrom ?? []),
                  processes[index].steps[assignProcessStepIndex],
                ],
              },
              ...processes[index].steps.slice(processStepIndex + 1),
            ],
          },
          ...processes.slice(index + 1),
        ];
      });
    },
  });
}
