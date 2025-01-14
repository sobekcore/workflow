import { UseQueryResult } from '@tanstack/react-query';
import { RenderResult } from '@testing-library/react';
import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockQueryClientProvider } from '@test/mocks/query-client.tsx';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { render } from '@test/render.ts';
import { Execution } from '@/interfaces/execution/execution.ts';
import ExecutionsRoute from '@/routes/Exectuions.tsx';

const execution: Execution = mockExecution();
const { useReadExecutions } = vi.hoisted(() => ({
  useReadExecutions: vi.fn(
    (): Partial<UseQueryResult> => ({
      data: [execution],
    }),
  ),
}));
vi.mock('@/hooks/executions/useReadExecutions.ts', () => ({
  useReadExecutions,
}));

const anotherExecution: Execution = {
  ...mockExecution(),
  id: 'execution-2',
  process: {
    ...mockProcess(),
    name: 'Process 2',
  },
};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: () => anotherExecution.id,
  },
});

let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <ExecutionsRoute />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );
});

test('should render create execution button', async () => {
  expect(await component.findByRole('button', { name: 'Create Execution' })).toBeInTheDocument();
});

test('should render execution link and name', async () => {
  expect(await component.findAllByText(`${execution.process.name} Execution`)).toHaveLength(2);
});

test('should render execution step name', async () => {
  expect(await component.findByText(`${execution.processStep?.name}`)).toBeInTheDocument();
});

test('should not render workflow list when empty', () => {
  useReadExecutions.mockImplementation(() => ({
    data: [],
  }));

  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <ExecutionsRoute />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );

  expect(component.queryByTestId('workflow-list')).not.toBeInTheDocument();
});

test('should select execution using localStorage item', async () => {
  useReadExecutions.mockImplementation(() => ({
    data: [execution, anotherExecution],
  }));

  component = render(
    <MockQueryClientProvider>
      <MockRouterProvider>
        <ExecutionsRoute />
      </MockRouterProvider>
    </MockQueryClientProvider>,
  );

  expect(await component.findAllByText(`${anotherExecution.process.name} Execution`)).toHaveLength(2);
});
