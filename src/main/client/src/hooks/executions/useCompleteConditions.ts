import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { completeConditions } from '@/api/executions/complete-conditions.ts';
import { QueryKey } from '@/enums/query.ts';
import { Execution, ExecutionToProgress } from '@/interfaces/execution/execution.ts';

export function useCompleteConditions(executionId: string) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(conditions: ExecutionToProgress[]): Promise<void> {
      return completeConditions(conditions);
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

        return [
          ...executions.slice(0, index),
          { ...executions[index], conditionCompleted: true },
          ...executions.slice(index + 1),
        ];
      });
    },
  });
}
