import { RenderHookResult, renderHook } from '@testing-library/react';
import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { ConditionStatus } from '@/enums/execution/condition.ts';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { QueryKey } from '@/enums/query.ts';
import { ConditionToComplete } from '@/interfaces/execution/condition.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import { useCompleteConditions } from '@/hooks/executions/useCompleteConditions.ts';

const { completeConditions } = vi.hoisted(() => ({
  completeConditions: vi.fn(),
}));
vi.mock('@/api/executions/complete-conditions.ts', () => ({
  completeConditions,
}));

const execution: Execution = {
  ...mockExecution(),
  conditionStatus: ConditionStatus.IN_PROGRESS,
  processStep: {
    ...mockProcessStep(),
    condition: {
      type: ConditionType.VISIT,
    },
  },
};
const conditionToComplete: ConditionToComplete = {
  executionId: execution.id,
  state: {
    visited: true,
  },
};
let hook: RenderHookResult<ReturnType<typeof useCompleteConditions>, void>;

beforeEach(() => {
  hook = renderHook(() => useCompleteConditions(execution.id), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call completeConditions', async () => {
  await hook.result.current.mutateAsync([conditionToComplete]);

  expect(useCompleteConditions);
});

test('should set query data when condition is completed', async () => {
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([conditionToComplete]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([
    {
      ...execution,
      conditionStatus: ConditionStatus.COMPLETED,
      conditionState: {
        visited: true,
      },
    },
  ]);
});

test('should set query data when condition is not completed', async () => {
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([
    {
      ...conditionToComplete,
      state: {
        visited: false,
      },
    },
  ]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([
    {
      ...execution,
      conditionState: {
        visited: false,
      },
    },
  ]);
});

test('should preserve query data when execution is not found', async () => {
  const execution: Execution = {
    ...mockExecution(),
    id: 'execution-2',
  };
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([conditionToComplete]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([execution]);
});

test('should preserve query data when condition to complete is not found', async () => {
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([
    {
      ...conditionToComplete,
      executionId: 'execution-2',
    },
  ]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([execution]);
});
