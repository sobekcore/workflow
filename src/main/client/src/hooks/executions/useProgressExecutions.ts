import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { progressExecutions } from '@/api/executions/progress-executions.ts';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { QueryKey } from '@/enums/query.ts';
import { Execution, ExecutionToProgress } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';

export function useProgressExecutions(executionId: string) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(processes: ExecutionToProgress[]): Promise<void> {
      return progressExecutions(processes);
    },
    onMutate(): void {
      queryClient.setQueryData<Execution[]>([QueryKey.READ_EXECUTIONS], (executions?: Execution[]): Execution[] => {
        if (!executions) {
          return [];
        }

        const index: number = executions.findIndex((execution: Execution): boolean => execution.id === executionId);
        if (index === -1) {
          return [];
        }

        const processStepIndex: number = executions[index].process.steps.findIndex(
          (processStep: ProcessStep): boolean => processStep.id === executions[index].processStep?.id,
        );
        const processStep: ProcessStep | undefined = executions[index].process.steps[processStepIndex + 1];

        return [
          ...executions.slice(0, index),
          { ...executions[index], conditionCompleted: processStep?.conditionType === ConditionType.NONE, processStep },
          ...executions.slice(index + 1),
        ];
      });
    },
  });
}
