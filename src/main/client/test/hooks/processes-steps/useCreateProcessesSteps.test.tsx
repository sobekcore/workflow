import { RenderHookResult, renderHook } from '@testing-library/react';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { QueryKey } from '@/enums/query.ts';
import { ProcessStep, ProcessStepToCreate } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { useCreateProcessesSteps } from '@/hooks/processes-steps/useCreateProcessesSteps.ts';

const process: Process = {
  ...mockProcess(),
  steps: [],
};
const processStepToCreate: ProcessStepToCreate = {
  name: 'Process Step To Create',
  description: 'Description',
  condition: {
    type: ConditionType.VISIT,
    data: {
      link: 'https://example.com',
    },
  },
  processId: process.id,
};

const processStep: ProcessStep = {
  ...mockProcessStep(),
  name: processStepToCreate.name,
  description: processStepToCreate.description,
  condition: processStepToCreate.condition,
};
const { createProcessesSteps } = vi.hoisted(() => ({
  createProcessesSteps: vi.fn(() => [processStep]),
}));
vi.mock('@/api/processes-steps/create-processes-steps.ts', () => ({
  createProcessesSteps,
}));

let hook: RenderHookResult<ReturnType<typeof useCreateProcessesSteps>, void>;

beforeEach(() => {
  hook = renderHook(() => useCreateProcessesSteps({ processId: process.id }), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call createProcessesSteps', async () => {
  await hook.result.current.mutateAsync([processStepToCreate]);

  expect(createProcessesSteps).toHaveBeenCalledOnce();
});

test('should set query data', async () => {
  queryClient.setQueryData([QueryKey.READ_PROCESSES], () => [process]);

  await hook.result.current.mutateAsync([processStepToCreate]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([
    {
      ...process,
      steps: [processStep],
    },
  ]);
});

test('should preserve query data when process is not found', async () => {
  const process: Process = {
    ...mockProcess(),
    id: 'process-2',
  };
  queryClient.setQueryData([QueryKey.READ_PROCESSES], () => [process]);

  await hook.result.current.mutateAsync([processStepToCreate]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([process]);
});
