import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { RenderHookResult, renderHook } from '@testing-library/react';
import { QueryKey } from '@/enums/query.ts';
import { Execution, ExecutionToCreate } from '@/interfaces/execution/execution.ts';
import { ProcessStep } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { useCreateExecutions } from '@/hooks/executions/useCreateExecutions.ts';

const process: Process = mockProcess();
const processStep: ProcessStep = mockProcessStep();
const executionToCreate: ExecutionToCreate = {
  processId: process.id,
  processStepId: processStep.id,
};

const execution: Execution = {
  ...mockExecution(),
  process,
  processStep,
};
const { createExecutions } = vi.hoisted(() => ({
  createExecutions: vi.fn(() => [execution]),
}));
vi.mock('@/api/executions/create-executions.ts', () => ({
  createExecutions,
}));

let hook: RenderHookResult<ReturnType<typeof useCreateExecutions>, void>;

beforeEach(() => {
  hook = renderHook(() => useCreateExecutions(), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call createExecutions', async () => {
  await hook.result.current.mutateAsync([executionToCreate]);

  expect(createExecutions).toHaveBeenCalledOnce();
});

test('should set query data', async () => {
  await hook.result.current.mutateAsync([executionToCreate]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([execution]);
});

test('should initialize query data when executions are empty', async () => {
  const anotherExecution: Execution = {
    ...mockExecution(),
    id: 'execution-2',
  };
  queryClient.setQueryData([QueryKey.READ_EXECUTIONS], () => [anotherExecution]);

  await hook.result.current.mutateAsync([executionToCreate]);

  expect(queryClient.getQueryData([QueryKey.READ_EXECUTIONS])).toEqual([anotherExecution, execution]);
});
