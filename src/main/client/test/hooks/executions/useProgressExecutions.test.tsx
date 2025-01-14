import { RenderHookResult, renderHook } from '@testing-library/react';
import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { ConditionStatus } from '@/enums/execution/condition.ts';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { QueryKey } from '@/enums/query.ts';
import { Execution, ExecutionToProgress } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { useProgressExecutions } from '@/hooks/executions/useProgressExecutions.ts';

const { progressExecutions } = vi.hoisted(() => ({
  progressExecutions: vi.fn(),
}));
vi.mock('@/api/executions/progress-executions.ts', () => ({
  progressExecutions,
}));

const processStep: ProcessStep = mockProcessStep();
const anotherProcessStep: ProcessStep = {
  ...mockProcessStep(),
  id: 'process-2',
  prevProcessStep: processStep,
  availableFrom: [processStep],
};
const process: Process = {
  ...mockProcess(),
  steps: [processStep, anotherProcessStep],
};
const execution: Execution = {
  ...mockExecution(),
  process,
  processStep,
};
const executionToProgress: ExecutionToProgress = {
  executionId: execution.id,
};
let hook: RenderHookResult<ReturnType<typeof useProgressExecutions>, void>;

beforeEach(() => {
  hook = renderHook(() => useProgressExecutions(execution.id), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call progressExecutions', async () => {
  await hook.result.current.mutateAsync([executionToProgress]);

  expect(progressExecutions).toHaveBeenCalledOnce();
});

test('should set query data when next step is completed', async () => {
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([executionToProgress]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([
    {
      ...execution,
      processStep: anotherProcessStep,
    },
  ]);
});

test('should set query data when next step is not completed', async () => {
  const anotherProcessStep: ProcessStep = {
    ...mockProcessStep(),
    id: 'process-2',
    condition: {
      type: ConditionType.VISIT,
      data: {
        link: 'https://example.com',
      },
    },
    prevProcessStep: processStep,
    availableFrom: [processStep],
  };
  const execution: Execution = {
    ...mockExecution(),
    process: {
      ...mockProcess(),
      steps: [processStep, anotherProcessStep],
    },
    processStep,
  };
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([{ executionId: execution.id }]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([
    {
      ...execution,
      processStep: anotherProcessStep,
      conditionStatus: ConditionStatus.IN_PROGRESS,
    },
  ]);
});

test('should set query data when cant determine next execution step', async () => {
  const execution: Execution = {
    ...mockExecution(),
    process: {
      ...mockProcess(),
      steps: [
        processStep,
        anotherProcessStep,
        {
          ...mockProcessStep(),
          id: 'process-step-3',
          prevProcessStep: processStep,
          availableFrom: [processStep],
        },
      ],
    },
    processStep,
  };
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([executionToProgress]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([
    {
      ...execution,
      conditionStatus: ConditionStatus.CHOOSE,
    },
  ]);
});

test('should preserve query data when execution is not found', async () => {
  const execution: Execution = {
    ...mockExecution(),
    id: 'execution-2',
  };
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([executionToProgress]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([execution]);
});

test('should preserve query data when execution to progress is not found', async () => {
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [execution]);

  await hook.result.current.mutateAsync([
    {
      ...executionToProgress,
      executionId: 'execution-2',
    },
  ]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([execution]);
});
