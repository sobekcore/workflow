import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { progressExecutions } from '@/api/executions/progress-executions.ts';
import { ConditionStatus } from '@/enums/execution/condition.ts';
import { QueryKey } from '@/enums/query.ts';
import { ExecutionCantDetermineNextProcessStepException } from '@/exceptions/execution.ts';
import { ConditionToComplete } from '@/interfaces/execution/condition.ts';
import { Execution, ExecutionToProgress } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { getConditionConfig } from '@/configs/condition.tsx';
import { findNextProcessStep } from '@/utils/executions.ts';

export function useProgressExecutions(executionId: string) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(executions: ExecutionToProgress[]): Promise<void> {
      return progressExecutions(executions);
    },
    onMutate(executionsToProgress: ExecutionToProgress[]): void {
      queryClient.setQueryData<Execution[]>([QueryKey.READ_EXECUTIONS], (executions?: Execution[]): Execution[] => {
        if (!executions) {
          return [];
        }

        const index: number = executions.findIndex((execution: Execution): boolean => execution.id === executionId);
        if (index === -1) {
          return executions;
        }

        const executionToProgress: ExecutionToProgress | undefined = executionsToProgress.find(
          (condition: ConditionToComplete): boolean => condition.executionId === executionId,
        );
        if (!executionToProgress) {
          return executions;
        }

        let processStep: ProcessStep | undefined;

        try {
          processStep = findNextProcessStep(executions[index], executionToProgress?.chooseProcessStepId);
        } catch (exception) {
          if (exception instanceof ExecutionCantDetermineNextProcessStepException) {
            return [
              ...executions.slice(0, index),
              {
                ...executions[index],
                conditionStatus: ConditionStatus.CHOOSE,
              },
              ...executions.slice(index + 1),
            ];
          }
          throw exception;
        }

        return [
          ...executions.slice(0, index),
          {
            ...executions[index],
            conditionStatus: getConditionConfig(processStep?.condition.type)?.isConditionReady()
              ? ConditionStatus.COMPLETED
              : ConditionStatus.IN_PROGRESS,
            conditionState: {},
            processStep,
          },
          ...executions.slice(index + 1),
        ];
      });
    },
  });
}
