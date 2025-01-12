import { mockProcessStep } from '@test/mocks/process-step.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { RenderHookResult, renderHook } from '@testing-library/react';
import { QueryKey } from '@/enums/query.ts';
import { ProcessStep, ProcessStepToAssign } from '@/interfaces/process-step/process-step.ts';
import { Process } from '@/interfaces/process.ts';
import { useAssignProcessesSteps } from '@/hooks/processes-steps/useAssignProcessesSteps.ts';

const assignProcessStep: ProcessStep = {
  ...mockProcessStep(),
  id: 'process-step-2',
};
const processStepToAssign: ProcessStepToAssign = {
  processStepId: 'process-step',
  assignProcessStepId: assignProcessStep.id,
};

const processStep: ProcessStep = {
  ...mockProcessStep(),
  id: processStepToAssign.processStepId,
};
const { assignProcessesSteps } = vi.hoisted(() => ({
  assignProcessesSteps: vi.fn(() => [processStep]),
}));
vi.mock('@/api/processes-steps/assign-processes-steps.ts', () => ({
  assignProcessesSteps,
}));

const process: Process = {
  ...mockProcess(),
  steps: [processStep, assignProcessStep],
};
let hook: RenderHookResult<ReturnType<typeof useAssignProcessesSteps>, void>;

beforeEach(() => {
  hook = renderHook(() => useAssignProcessesSteps(process.id), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call assignProcessesSteps', async () => {
  await hook.result.current.mutateAsync([processStepToAssign]);

  expect(assignProcessesSteps).toHaveBeenCalledOnce();
});

test('should set query data', async () => {
  queryClient.setQueryData([QueryKey.READ_PROCESSES], () => [process]);

  await hook.result.current.mutateAsync([processStepToAssign]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([
    {
      ...process,
      steps: [
        {
          ...processStep,
          availableFrom: [assignProcessStep],
        },
        assignProcessStep,
      ],
    },
  ]);
});

test('should preserve query data when process is not found', async () => {
  const process: Process = {
    ...mockProcess(),
    id: 'process-2',
  };
  queryClient.setQueryData([QueryKey.READ_PROCESSES], () => [process]);

  await hook.result.current.mutateAsync([processStepToAssign]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([process]);
});

test('should preserve query data when process step to assign is not found', async () => {
  const process: Process = {
    ...mockProcess(),
    steps: [],
  };
  queryClient.setQueryData([QueryKey.READ_PROCESSES], () => [process]);

  await hook.result.current.mutateAsync([processStepToAssign]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([process]);
});

test('should preserve query data when assign process step is not found', async () => {
  const process: Process = {
    ...mockProcess(),
    steps: [processStep],
  };
  queryClient.setQueryData([QueryKey.READ_PROCESSES], () => [process]);

  await hook.result.current.mutateAsync([processStepToAssign]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([process]);
});
