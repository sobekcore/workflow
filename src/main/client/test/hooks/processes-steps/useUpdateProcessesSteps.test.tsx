import { RenderHookResult, renderHook } from '@testing-library/react';
import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { ConditionType } from '@/enums/process-step/condition.ts';
import { QueryKey } from '@/enums/query.ts';
import { ProcessStep, ProcessStepToUpdate } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { useUpdateProcessesSteps } from '@/hooks/processes-steps/useUpdateProcessesSteps.ts';

const processStepToUpdate: ProcessStepToUpdate = {
  id: 'process-step',
  name: 'Process To Update',
  condition: {
    type: ConditionType.VISIT,
    data: {
      link: 'https://example.com',
    },
  },
};

const processStep: ProcessStep = {
  ...mockProcessStep(),
  id: processStepToUpdate.id,
  name: processStepToUpdate.name,
  condition: processStepToUpdate.condition,
};
const { updateProcessesSteps } = vi.hoisted(() => ({
  updateProcessesSteps: vi.fn(() => [processStep]),
}));
vi.mock('@/api/processes-steps/update-processes-steps.ts', () => ({
  updateProcessesSteps,
}));

const process: Process = mockProcess();
let hook: RenderHookResult<ReturnType<typeof useUpdateProcessesSteps>, void>;

beforeEach(() => {
  hook = renderHook(() => useUpdateProcessesSteps({ processId: process.id }), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call updateProcesses', async () => {
  await hook.result.current.mutateAsync([processStepToUpdate]);

  expect(updateProcessesSteps).toHaveBeenCalledOnce();
});

test('should set query data', async () => {
  queryClient.setQueryData([QueryKey.READ_PROCESSES], [process]);

  await hook.result.current.mutateAsync([processStepToUpdate]);

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

  await hook.result.current.mutateAsync([processStepToUpdate]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([process]);
});
