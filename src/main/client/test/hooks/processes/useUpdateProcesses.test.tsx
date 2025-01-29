import { RenderHookResult, renderHook } from '@testing-library/react';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { QueryKey } from '@/enums/query.ts';
import { Process, ProcessToUpdate } from '@/interfaces/process.ts';
import { useUpdateProcesses } from '@/hooks/processes/useUpdateProcesses.ts';

const processToUpdate: ProcessToUpdate = {
  id: 'process',
  name: 'Process To Update',
};

const process: Process = {
  ...mockProcess(),
  id: processToUpdate.id,
  name: processToUpdate.name,
};
const { updateProcesses } = vi.hoisted(() => ({
  updateProcesses: vi.fn(() => [process]),
}));
vi.mock('@/api/processes/update-processes.ts', () => ({
  updateProcesses,
}));

let hook: RenderHookResult<ReturnType<typeof useUpdateProcesses>, void>;

beforeEach(() => {
  hook = renderHook(() => useUpdateProcesses(), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call updateProcesses', async () => {
  await hook.result.current.mutateAsync([processToUpdate]);

  expect(updateProcesses).toHaveBeenCalledOnce();
});

test('should set query data', async () => {
  const existingProcess: Process = {
    ...mockProcess(),
    id: processToUpdate.id,
  };
  const existingAnotherProcess: Process = {
    ...mockProcess(),
    id: 'process-2',
  };
  queryClient.setQueryData([QueryKey.READ_PROCESSES], [existingProcess, existingAnotherProcess]);

  await hook.result.current.mutateAsync([processToUpdate]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([
    existingAnotherProcess,
    {
      ...existingProcess,
      name: processToUpdate.name,
    },
  ]);
});
