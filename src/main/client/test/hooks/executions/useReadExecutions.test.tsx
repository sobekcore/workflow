import { mockExecution } from '@test/mocks/execution.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { renderHook } from '@testing-library/react';
import { useReadExecutions } from '@/hooks/executions/useReadExecutions.ts';

const { readExecutions } = vi.hoisted(() => ({
  readExecutions: vi.fn(() => [mockExecution()]),
}));
vi.mock('@/api/executions/read-executions.ts', () => ({
  readExecutions,
}));

beforeEach(() => {
  renderHook(() => useReadExecutions(), {
    wrapper: ({ children }) => <MockQueryClientProvider>{children}</MockQueryClientProvider>,
  });
});

test('should call readExecutions', () => {
  expect(readExecutions).toHaveBeenCalledOnce();
});
