import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createExecutions } from '@/api/executions/create-executions.ts';
import { QueryKey } from '@/enums/query.ts';
import { Execution, ExecutionToCreate } from '@/interfaces/execution/execution.ts';
import { UseMutationParams } from '@/interfaces/mutation.ts';

export function useCreateExecutions({ onSuccess, onError }: UseMutationParams = {}) {
  const queryClient: QueryClient = useQueryClient();

  return useMutation({
    mutationFn(executions: ExecutionToCreate[]): Promise<Execution[]> {
      return createExecutions(executions);
    },
    onSuccess(executionsToCreate: Execution[]): void {
      queryClient.setQueryData<Execution[]>([QueryKey.READ_EXECUTIONS], (executions?: Execution[]): Execution[] => {
        if (!executions) {
          return executionsToCreate;
        }

        return [...executions, ...executionsToCreate];
      });
      onSuccess?.();
    },
    onError,
  });
}
