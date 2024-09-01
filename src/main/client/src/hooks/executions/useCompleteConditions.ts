import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { completeConditions } from '@/api/executions/complete-conditions.ts';
import { QueryKey } from '@/enums/query.ts';
import { ConditionToComplete } from '@/interfaces/execution/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { getConditionConfig } from '@/configs/condition.tsx';

export function useCompleteConditions(executionId: string) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(conditions: ConditionToComplete[]): Promise<void> {
      return completeConditions(conditions);
    },
    onMutate(conditions: ConditionToComplete[]): void {
      queryClient.setQueryData<Execution[]>([QueryKey.READ_EXECUTIONS], (executions?: Execution[]): Execution[] => {
        if (!executions) {
          return [];
        }

        const index: number = executions.findIndex((execution: Execution): boolean => execution.id === executionId);
        if (index === -1) {
          return [];
        }

        const condition: ConditionToComplete | undefined = conditions.find(
          (condition: ConditionToComplete): boolean => condition.executionId === executionId,
        );

        return [
          ...executions.slice(0, index),
          {
            ...executions[index],
            conditionCompleted:
              getConditionConfig(executions[index].processStep?.condition.type)?.isConditionReady(condition?.state) ??
              false,
            conditionState: condition?.state,
          },
          ...executions.slice(index + 1),
        ];
      });
    },
  });
}
