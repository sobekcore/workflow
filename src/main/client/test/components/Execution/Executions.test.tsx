import { mockExecution } from '@test/mocks/execution.ts';
import { mockProcess } from '@test/mocks/process.ts';
import { MockRouterProvider } from '@test/mocks/router.tsx';
import { RenderResult, render } from '@testing-library/react';
import { Execution } from '@/interfaces/execution/execution.ts';
import Executions from '@/components/Execution/Executions.tsx';

const executions: Execution[] = [
  mockExecution(),
  {
    ...mockExecution(),
    id: 'execution-2',
    process: {
      ...mockProcess(),
      name: 'Process 2',
    },
  },
];
let component: RenderResult;

beforeEach(() => {
  component = render(
    <MockRouterProvider>
      <Executions executions={executions} />
    </MockRouterProvider>,
  );
});

test('should render executions names', () => {
  for (const execution of executions) {
    expect(component.getByText(`${execution.process.name} Execution`)).toBeInTheDocument();
  }
});
