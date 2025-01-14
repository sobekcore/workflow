import { RenderHookResult, renderHook } from '@testing-library/react';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider, queryClient } from '@test/mocks/query-client.tsx';
import { QueryKey } from '@/enums/query.ts';
import { Process, ProcessToCreate } from '@/interfaces/process.ts';
import { useCreateProcesses } from '@/hooks/processes/useCreateProcesses.ts';

const processToCreate: ProcessToCreate = {
  name: 'Process To Create',
};

const process: Process = {
  ...mockProcess(),
  name: processToCreate.name,
};
const { createProcesses } = vi.hoisted(() => ({
  createProcesses: vi.fn(() => [process]),
}));
vi.mock('@/api/processes/create-processes.ts', () => ({
  createProcesses,
}));

let hook: RenderHookResult<ReturnType<typeof useCreateProcesses>, void>;

beforeEach(() => {
  hook = renderHook(() => useCreateProcesses(), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call createProcesses', async () => {
  await hook.result.current.mutateAsync([processToCreate]);

  expect(createProcesses).toHaveBeenCalledOnce();
});

test('should set query data', async () => {
  const anotherProcess: Process = {
    ...mockProcess(),
    id: 'process-2',
  };
  queryClient.setQueryData([QueryKey.READ_PROCESSES], [anotherProcess]);

  await hook.result.current.mutateAsync([processToCreate]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([anotherProcess, process]);
});

test('should initialize query data when processes are empty', async () => {
  await hook.result.current.mutateAsync([processToCreate]);

  expect(queryClient.getQueryData([QueryKey.READ_PROCESSES])).toEqual([process]);
});
