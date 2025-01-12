import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { renderHook } from '@testing-library/react';
import { useReadProcesses } from '@/hooks/processes/useReadProcesses';

const { readProcesses } = vi.hoisted(() => ({
  readProcesses: vi.fn(() => [mockProcess()]),
}));
vi.mock('@/api/processes/read-processes.ts', () => ({
  readProcesses,
}));

beforeEach(() => {
  renderHook(() => useReadProcesses(), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call readProcesses', () => {
  expect(readProcesses).toHaveBeenCalledOnce();
});
